"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangeEvent, useState } from "react";
import { createTour } from '@/service/TourService';
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
import { Input } from "@/components/ui/input"



const formSchema = z.object({
    nameTour: z.string().min(5, {
        message: "Tour name be at least 5 characters.",
    }),
    banner: z.string().optional(),
    rate: z.coerce.number().min(1, {
        message: "Rate must min is 1"
    }),
    price: z.coerce.number().min(50000, {
        message: "Price must min is 50000"
    }),
    totalTime: z.string(),
    maxCustomer: z.string(),
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
            price: 0,
            totalTime: "",
            maxCustomer: "",
            content: "",
            note: "",
            timeLine: "",
        },
    })



    const [texteditor, setTexteditor] = useState({
        title: '',
        content: '',
        categoryId: ''
    })
    const [textnote, setTextnote] = useState({
        title: '',
        note: '',
        categoryId: ''
    })
    const [texttimeLine, setTimeLine] = useState({
        title: '',
        timeLine: '',
        categoryId: ''
    })

    const [image, setImage] = useState<File | null>(null)
    const UPLOAD_ENDPOINT = "localhost:8080/files/upload";

    function onSubmit(values: z.infer<typeof formSchema>) {
        const postData = {
            nameTour: values.nameTour,
            banner: image ? image.name : '',
            rate: values.rate,
            price: values.price,
            totalTime: values.totalTime,
            maxCustomer: values.maxCustomer,
            content: texteditor.content,
            note: textnote.note,
            timeLine: texttimeLine.timeLine,
        };



        createTour(postData)
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


                toast.success("Post Tours  Successful !!!")
                form.reset({
                    nameTour: "",
                    banner: "",
                    rate: 0,
                    price: 0,
                    totalTime: "",
                    maxCustomer: "",
                    content: "",
                    note: "",
                    timeLine: "",
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
                        <Input id="image" type="file" onChange={(e) => handleOnChange(e)} />
                    </div>
                    <FormField
                        control={form.control}
                        name="rate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rate</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                    <Input {...field} />
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
                                    <Input {...field} />
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
                    {/* <div className="my-3">
                        <FormLabel>Post Note</FormLabel>
                        <JoditEditor
                            value={textnote.note}
                            onChange={(newNote) => setTextnote({ ...textnote, note: newNote })}
                        />
                    </div>
                    <div className="my-3">
                        <FormLabel>Post TimeLine</FormLabel>
                        <JoditEditor
                            value={texttimeLine.timeLine}
                            onChange={(newtimeLine) => setTimeLine({ ...texttimeLine, timeLine: newtimeLine })}
                        />
                    </div> */}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
