"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangeEvent, useState } from "react";
import { createPost } from '@/service/BlogService';
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from "@/components/PageTitle";
import JoditEditor from 'jodit-react';
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    des: z.string().min(2, {
        message: "Description must be at least 15 characters.",
    }),
    content: z.string().optional(),
    banner: z.string().optional()
})

export default function PostBlogPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            banner: "",
            des: "",
            content: "",
        },
    })

    const [texteditor, setTexteditor] = useState({
        title: '',
        content: '',
        categoryId: ''
    })

    const [image, setImage] = useState<File | null>(null)
    const UPLOAD_ENDPOINT = "localhost:8080/files/upload";

    function onSubmit(values: z.infer<typeof formSchema>) {
        const postData = {
            title: values.title,
            des: values.des,
            content: texteditor.content,
            banner: image ? image.name : ''
        };



        createPost(postData)
            .then(data => {
                const formData = new FormData();
                formData.append("myfile", image, image.name);
                axios.post(UPLOAD_ENDPOINT, formData, {
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                }).then(data => {
                    debugger
                    console.log(data.data);
                });


                toast.success("Post Created Successful !!!")
                form.reset({
                    title: "",
                    banner: "",
                    des: "",
                    content: ""
                });
            })
            .catch((error) => {
                toast.error("Post not created due to some error !!")
                console.error("Error creating post:", error);
            });
    }

    const handleOnChange = e => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    };

    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="Post New Blog" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-3">
                        <FormLabel >Banner</FormLabel>
                        <Input id="image" type="file" onChange={(e) => handleOnChange(e)} />
                    </div>
                    <FormField
                        control={form.control}
                        name="des"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="my-3">
                        <FormLabel>Post Content</FormLabel>
                        <JoditEditor
                            value={texteditor.content}
                            onChange={(newContent) => setTexteditor({ ...texteditor, content: newContent })}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            <ToastContainer />
        </div>
    )
}

