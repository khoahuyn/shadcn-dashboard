"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import JoditEditor from 'jodit-react';
import { useState, useEffect, useRef, useMemo } from 'react';

import { Button } from "@/components/ui/button"
import PageTitle from "@/components/PageTitle";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"



const formSchema = z.object({
    nameTour: z.string().min(5, {
        message: "Tour name be at least 5 characters.",
    }),
    banner: z.string().optional(),
    rate: z.number().min(0, {
        message: "Rate be at least 0.",
    }),
    price: z.number().min(300000, {
        message: "Price be at least 300000.",
    }),
    totalTime: z.number().min(8, {
        message: "Total time be at least 8 hours.",
    }),
    maxCustomer: z.number().min(1, {
        message: "Numer customer be at least 1 people.",
    }),
    content: z.string().optional(),
    note: z.string().optional(),
    timeLine: z.string().optional(),
})

export default function PostBlogPage() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nameTour: "",
            banner: "",
            rate: 0,
            price: 10000,
            totalTime: 8,
            maxCustomer: 1,
            content: "",
            note: "",
            timeLine: "",
        },
    })


    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    })

    const [image, setImage] = useState(null)

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }


    const handleFileChange = (event: any) => {
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }


    const fieldChanged = (event: any) => {
        // console.log(event)
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    const contentFieldChanaged = (data: any) => {

        setPost({ ...post, 'content': data })


    }


    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="Post New Tour" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="nameTour"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tour Name</FormLabel>
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
                    </div>
                    <FormField
                        control={form.control}
                        name="rate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rate</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="totalTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total time</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="maxCustomer"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number Customer</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="my-3">
                        <FormLabel>Post Content</FormLabel>
                        <JoditEditor
                            ref={editor}
                            value={post.content}

                            onChange={(newContent) => contentFieldChanaged(newContent)}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
