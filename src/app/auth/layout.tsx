import { Metadata, Viewport } from "next";
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

export async function generateViewport(): Promise<Viewport> {
    return {
        initialScale: 1.0,
        width: 'device-width',
    };
};

export default function Layout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-auto h-auto p-4">
                {children}
            </div>
        </div>
    );
}