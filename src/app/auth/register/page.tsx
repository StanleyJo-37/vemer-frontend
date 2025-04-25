"use server";

import RegisterForm from "./register-form";

export default async function Page() {
    
    return (
        <div className="flex flex-col justify-center items-center !bg-white">
            <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
                <RegisterForm />
            </div>
        </div>
    );
}