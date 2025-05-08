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
        <div className="flex flex-col justify-center items-center !bg-white">
            <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
                <SignupForm />
            </div>
        </div>
    );
}