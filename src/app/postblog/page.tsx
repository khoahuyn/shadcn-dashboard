"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangeEvent, useState } from "react";
import { createPost, uploadPostImage } from '@/service/BlogService';
import { toast } from "react-toastify"
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
    banner: z.string().url({
        message: "Invalid banner URL"
    }),
    des: z.string().min(2, {
        message: "Description must be at least 15 characters.",
    }),
    content: z.string().optional(),
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

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    })

    const [image, setImage] = useState(null)

    function onSubmit(values: z.infer<typeof formSchema>) {
        const postData = {
            title: values.title,
            banner: values.banner,
            des: values.des,
            content: post.content
        };

        console.log({ values, preview })

        createPost(postData)
            .then(data => {
                uploadPostImage(image, data.postId).then(data => {
                    toast.success("Image Uploaded !!")
                }).catch(error => {
                    toast.error("Error in uploading image!")
                    console.log(error)
                })


                toast.success("Post Created !!")
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


    //handling file chagne event
    const handleFileChange = (event: any) => {
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }



    function getImageData(event: ChangeEvent<HTMLInputElement>) {
        // FileList is immutable, so we need to create a new one
        const dataTransfer = new DataTransfer();

        // Add newly uploaded images
        Array.from(event.target.files!).forEach((image) =>
            dataTransfer.items.add(image)
        );

        const files = dataTransfer.files;
        const displayUrl = URL.createObjectURL(event.target.files![0]);

        return { files, displayUrl };
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
                    <div className="mt-3">
                        <FormLabel >Banner</FormLabel>
                        <Input id="image" type="file" onChange={handleFileChange} />
                        {/* <FormField
                            control={form.control}
                            name="banner"
                            render={({ field: { onChange, value, ...rest } }) => (
                                <FormItem>
                                    <FormLabel>Banner</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="file" {...rest}
                                            onChange={(event) => {
                                                const { files, displayUrl} = getImageData(event)
                                                setPreview(displayUrl);
                                                onChange(files);
                                            }}
                                         />
                                    </FormControl>
                                </FormItem>
                            )}
                        /> */}
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
                            value={post.content}
                            onChange={(newContent) => setPost({ ...post, content: newContent })}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

