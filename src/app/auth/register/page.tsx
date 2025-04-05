"use server";

import { Button } from "@/components/ui/button";
import RegisterForm from "./register-form";

export default async function Page() {
    
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-center">Daftar Sekarang</h1>
            <RegisterForm />
        </div>
    );
}