"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangeEvent, useState } from "react";
import { createPost, uploadPostImage } from '@/service/BlogService';
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {storage} from '@/config/fireBaseConfig';
import PageTitle from "@/components/PageTitle";
import JoditEditor from 'jodit-react';
import { Button } from "@/components/ui/button";

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
    // banner: z.string().url({
    //     message: "Invalid banner URL"
    // }),
    des: z.string().min(2, {
        message: "Description must be at least 15 characters.",
    }),
    content: z.string().optional(),
    // banner: z.string()
})

export default function PostBlogPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            // banner: "",
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        const postData = {
            title: values.title,
            // banner: values.banner,
            des: values.des,
            content: texteditor.content,
            banner: image ? image.name :''
        };

        

        createPost(postData)
            .then(data => {
                // uploadPostImage(image, data.postId).then(data => {
                //     toast.success("Image Uploaded !!")
                // }).catch(error => {
                //     toast.error("Error in uploading image!")
                //     console.log(error)
                // })

                // if (image) {
                //     uploadPostImage(image, data.postId).then(data => {
                //         toast.success("Image Uploaded !!")
                //     }).catch(error => {
                //         toast.error("Error in uploading image!")
                //         console.log(error)
                //     })
                // }

                toast.success("Post Created Susscessfull !!!")
                form.reset({
                    title: "",
                    // banner: "",
                    des: "",
                    content: ""
                });
            })
            .catch((error) => {
                toast.error("Post not created due to some error !!")
                console.error("Error creating post:", error);
            });
    }

    // Xử lý sự kiện khi người dùng chọn tệp ảnh
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]); // Lưu tệp ảnh vào state
        }
    }

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
                    {/* <div className="mt-3">
                        <FormLabel >Banner</FormLabel>
                        <Input id="image" type="file" onChange={handleFileChange} />
                    </div> */}
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

