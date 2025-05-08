"use server";

import { Metadata } from "next";
import { SignupForm } from "./register-form";

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

export default async function Page() {
    
    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-sky-50 via-white to-sky-50">
            <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-sky-200 opacity-60 blur-xl" />
            <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-sky-200 opacity-60 blur-xl" />
            <div className="absolute top-1/4 right-1/4 h-16 w-16 rounded-full bg-sky-100 opacity-40 blur-lg" />
            <div className="absolute bottom-1/4 left-1/4 h-24 w-24 rounded-full bg-sky-100 opacity-50 blur-xl" />

            <div className="absolute -top-20 -left-20 h-screen w-64 animate-pulse rounded-full border border-sky-100 bg-transparent" />
            <div className="absolute -right-20 h-screen w-80 animate-pulse rounded-full border border-sky-100 bg-transparent" />

            <div className="pointer-events-none absolute inset-0 opacity-20">
                <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                    "radial-gradient(circle at 25px 25px, rgba(0, 0, 0, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0, 0, 0, 0.1) 2%, transparent 0%)",
                    backgroundSize: "100px 100px",
                }}
                />
            </div>
            <SignupForm />
            <div
                className="absolute top-1/3 left-10 h-3 w-3 animate-bounce rounded-full bg-sky-400"
                style={{ animationDelay: "0.1s" }}
            />
            <div
                className="absolute top-2/3 right-10 h-2 w-2 animate-bounce rounded-full bg-sky-400"
                style={{ animationDelay: "0.3s" }}
            />
            <div
                className="absolute bottom-1/3 left-1/3 h-4 w-4 animate-bounce rounded-full bg-sky-400"
                style={{ animationDelay: "0.5s" }}
            />
        </div>
    );
}