import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        openGraph: {
            siteName: "Vemer",
            title: "Register",
            description: "Buat akun baru untuk menggunakan layanan Vemer.",
            type: "website",
            locale: "id_ID",
        },
        title: "Register",
        description: "Buat akun baru untuk menggunakan layanan Vemer.",
        keywords: "Vemer, register vemer, buat akun vemer",
        viewport: "width=device-width, initial-scale=1.0",
        robots: "index, follow",
        other: {
            ["og:site_name"]: "Vemer",
            ["og:title"]: "Register",
            ["og:description"]: "Buat akun baru untuk menggunakan layanan Vemer.",
            ["og:type"]: "website",
            ["og:locale"]: "id_ID",
        }
    };
}

export default function Layout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <div>
            {children}
        </div>
    );
}