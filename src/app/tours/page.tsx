/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import Link from "next/link";
type Props = {};
type ToursPage = {
    nameTour: string;
    banner: string;
    nameTypeTour: string;
    maxCustomer: string;
    totalTime: string;
};

const columns: ColumnDef<ToursPage>[] = [
    {
        accessorKey: "nameTour",
        header: "Tour Name"
    },
    {
        accessorKey: "banner",
        header: "Banner",
        cell: ({ row }) => {
            return (
                <img src={row.getValue("banner")} alt={"Loi file"} className="w-20 h-auto" />
            );
        }
    },
    {
        accessorKey: "maxCustomer",
        header: "Number Customer"
    },
    {
        accessorKey: "nameTypeTour",
        header: "TypeTour",
        cell: ({ row }) => {
            return (
                <div
                    className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
                        "bg-red-200": row.getValue("nameTypeTour") === "Private tours",
                        "bg-orange-200": row.getValue("nameTypeTour") === "Group tours",
                        "bg-green-200": row.getValue("nameTypeTour") === "Multi-Day Tours"
                    })}
                >
                    {row.getValue("nameTypeTour")}
                </div>
            );
        }
    },
    {
        accessorKey: "totalTime",
        header: "Total Time"
    },
];

const data: ToursPage[] = [
    {
        nameTour: "ORD001",
        banner: "Paybai",
        nameTypeTour: "Private tours",
        maxCustomer: "2-people",
        totalTime: "16-hours"
    },
    {
        nameTour: "ORD002",
        banner: "PayPal",
        nameTypeTour: "Group tours",
        maxCustomer: "8-people",
        totalTime: "24-hours"
    },
    {
        nameTour: "ORD003",
        banner: "Stripe",
        nameTypeTour: "Multi-Day Tours",
        maxCustomer: "10-people",
        totalTime: "48-hours"
    },
    {
        nameTour: "ORD004",
        banner: "Venmo",
        nameTypeTour: "Private tours",
        maxCustomer: "3-people",
        totalTime: "24-hours"
    },
    {
        nameTour: "ORD005",
        banner: "Bank Transfer",
        nameTypeTour: "Multi-Day Tours",
        maxCustomer: "20-people",
        totalTime: "32-hours"
    },
    {
        nameTour: "ORD006",
        banner: "Apple Pay",
        nameTypeTour: "Group tours",
        maxCustomer: "4-people",
        totalTime: "48-hours"
    },
    {
        nameTour: "ORD007",
        banner: "Google Pay",
        nameTypeTour: "Multi-Day Tours",
        maxCustomer: "12-people",
        totalTime: "72-hours"
    },
    {
        nameTour: "ORD008",
        banner: "Cryptocurrency",
        nameTypeTour: "Private tours",
        maxCustomer: "1-people",
        totalTime: "10-hours"
    },
    {
        nameTour: "ORD009",
        banner: "Alipay",
        nameTypeTour: "Group tours",
        maxCustomer: "6-people",
        totalTime: "16-hours"
    },
    {
        nameTour: "ORD010",
        banner: "WeChat Pay",
        nameTypeTour: "Multi-Day Tours",
        maxCustomer: "15-people",
        totalTime: "48-hours"
    },
    {
        nameTour: "ORD011",
        banner: "Square Cash",
        nameTypeTour: "Private tours",
        maxCustomer: "2-people",
        totalTime: "12-hours"
    }
];

export default function ToursPage({ }: Props) {
    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="Tours" />
            <div className="flex justify-end mb-5">
                <Link href="/posttour">
                    <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Post Tour
                    </p>
                </Link>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
