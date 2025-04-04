"use server";

import Navbar from "@/components/navbar";
import React from "react";

export default async function Layout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <div className="flex flex-col">
            <Navbar />
            {children}
        </div>
    );
}