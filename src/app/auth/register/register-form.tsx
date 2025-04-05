"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import LucideIcon from "@/components/lucide-icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AuthAPI from "@/api/AuthAPI";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const RegisterFormSchema = z.object({
    'email': z.string().email().min(1, {message: "Email wajib diisi."}),
    'username': z.string().min(1, {message: "Username wajib diisi."}),
    'password': z.string().min(1, {message: "Password wajib diisi."}),
    'toc-accept': z.boolean().refine(val => val, { message: "Anda harus menyetujui syarat penggunaan Vemer."}),
});

export default function RegisterForm() {
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const [isTocAcceptDialogOpen, setIsTocAcceptDialogOpen] = useState<boolean>(false);

    const router = useRouter();
    
    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            'email': "",
            'username': "",
            'password': "",
            'toc-accept': false,
        },
    });

    const onSubmit = async(data: z.infer<typeof RegisterFormSchema>) => {
        setIsSubmitLoading(true);
        AuthAPI.register(data.email, data.password, data.username)
                .then(res => {
                    router.push('/');
                })
                .catch(err => {
                    toast("Terjadi kesalahan saat registrasi.");
                })
                .finally(() => {
                    setIsSubmitLoading(false);
                })
    }
    
    return (
        <Form {...form}>
            <Dialog open={isTocAcceptDialogOpen} onOpenChange={() => setIsTocAcceptDialogOpen(false)}>
                <div className="bg-background">
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Syarat Penggunaan Vemer</DialogTitle>
                        </DialogHeader>

                    </DialogContent>
                </div>
            </Dialog>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center">
                <FormField
                    disabled={isSubmitLoading}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="email">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} disabled={isSubmitLoading} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    disabled={isSubmitLoading}
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="username">
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} disabled={isSubmitLoading} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                
                <FormField
                    disabled={isSubmitLoading}
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="password">
                                Password
                            </FormLabel>
                            <FormControl>
                                <div className="relative h-auto">
                                    <Input
                                        type={isPasswordShown ? "text" : "password"}
                                        placeholder="Password"
                                        {...field}
                                        disabled={isSubmitLoading}
                                    />
                                    <LucideIcon
                                        icon={isPasswordShown ? "EyeOff" : "Eye"}
                                        className="absolute right-2 top-1/3 cursor-pointer w-4 h-4"
                                        onClick={() => setIsPasswordShown(prev => !prev)}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex flex-col space-y-2">
                    <h2>Atau daftar dengan:</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center space-x-4">
                        <Button type="button">Google</Button>
                        <Button type="button"><LucideIcon icon="Linkedin" />Linkedin</Button>
                    </div>
                </div>

                <FormField
                    disabled={isSubmitLoading}
                    control={form.control}
                    name="toc-accept"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-center p-2 space-x-4">
                            <Checkbox
                                disabled={isSubmitLoading}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            <FormLabel className="!mt-0" htmlFor="toc-accept">Saya menyetujui <span onClick={() => setIsTocAcceptDialogOpen(true)} className="text-blue-600 hover:text-blue-900">syarat penggunaan Vemer</span>.</FormLabel>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                >
                    Daftar
                </Button>
            </form>
        </Form>
    );
}