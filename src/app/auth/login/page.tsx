"use server";

import { Metadata } from "next";
import LoginForm from "./login-form";

export async function generateMetadata(): Promise<Metadata> {
    return {
        openGraph: {
            siteName: "Vemer",
            title: "Login",
            description: "Masuk ke akun Vemer untuk menggunakan layanan Vemer.",
            type: "website",
            locale: "id_ID",
        },
        title: "Login",
        description: "Masuk ke akun Vemer untuk menggunakan layanan Vemer.",
        keywords: "Vemer, register vemer, buat akun vemer",
        robots: "index, follow",
        other: {
            ["og:site_name"]: "Vemer",
            ["og:title"]: "Login",
            ["og:description"]: "Masuk ke akun Vemer untuk menggunakan layanan Vemer.",
            ["og:type"]: "website",
            ["og:locale"]: "id_ID",
        }
    };
}

export default async function Page() {
    
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-center text-3xl my-8">Masuk ke Akun Vemer</h1>
            <LoginForm />
        </div>
    );
}