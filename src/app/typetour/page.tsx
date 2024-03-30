"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"



const formSchema = z.object({
    typePrices: z.string({
        required_error: "Please select an typePrices to display.",
    }),
    typeDayOfTour: z.string({
        required_error: "Please select an typeDayOfTour to display.",
    }),
    regionOfTour: z.string({
        required_error: "Please select an regionOfTour to display.",
    }),
    privacyOfTour: z.string({
        required_error: "Please select an regionOfTour to display.",
    })
})

export default function PostBlogPage() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            typePrices: "",
            typeDayOfTour:"",
            regionOfTour:"",
            privacyOfTour:"",

        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

    }






    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="Create Type Tour" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="typePrices"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type Prices</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a type price to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Detail">Detail</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="typeDayOfTour"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type Day Of Tour</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a type Day Of Tour to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Daily">Daily</SelectItem>
                                        <SelectItem value="Multiday">Multiday</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="regionOfTour"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Region Of Tour</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a region Of Tour to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="North">North</SelectItem>
                                        <SelectItem value="Center">Center</SelectItem>
                                        <SelectItem value="South">South</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="privacyOfTour"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Privacy Of Tour</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a privacy Of Tour to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Private">Private</SelectItem>
                                        <SelectItem value="Group">Group</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
