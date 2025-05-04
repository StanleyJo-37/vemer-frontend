"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import LucideIcon from "@/components/lucide-icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AuthAPI from "@/api/AuthAPI";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SocialiteProvider } from "@/types/AuthType";
import AnimatedButton from "@/components/animated-button";
import { icons } from "lucide-react";
import { AxiosError } from "axios";
import { UserType } from "@/types/UserType";

const LoginFormSchema = z.object({
    'email': z.string().email().min(1, {message: "Email wajib diisi."}),
    'password': z.string().min(1, {message: "Password wajib diisi."}),
    'remember_me': z.boolean(),
});

const sso: { label: string; provider: SocialiteProvider, icon: keyof typeof icons }[] = [
    {
        label: 'Google',
        provider: 'google',
        icon: 'Airplay',
    },
    {
        label: 'LinkedIn',
        provider: 'linkedin-openid',
        icon: 'Linkedin',
    }
];

// type LoginPayload = Omit<z.infer<typeof LoginFormSchema>, 'toc-accept'>;

export default function LoginForm() {
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const [ssoProvider, setSsoProvider] = useState<SocialiteProvider>();

    const router = useRouter();
    
    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            'email': "",
            'password': "",
            'remember_me': false,
        },
    });

    useEffect(() => {
        if (!ssoProvider) return;
    
        const ssoLogin = async () => {
            try {
                const resp = await AuthAPI.loginSSO(ssoProvider, '', '');
                
            } catch (err) {
                if (err instanceof AxiosError) {
                    
                }
            } finally {
                setSsoProvider(undefined);
            }
        };
    
        ssoLogin();
    }, [ssoProvider]);

    const onSubmit = async(data: z.infer<typeof LoginFormSchema>) => {
        setIsSubmitLoading(true);

        try {
            const resp = await AuthAPI.login(data);

            const respData = resp.data as UserType;

            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(respData));

            router.push(respData.profile.completion === 1 ? '' : '/auth/profile-completion');
        } catch (err) {
            toast("Terjadi kesalahan saat registrasi.");
        } finally {
            setIsSubmitLoading(false);
        }
    }
    
    return (
        <Form {...form}>
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
                                        className="absolute right-4 top-[.67rem] cursor-pointer w-4 h-4"
                                        onClick={() => setIsPasswordShown(prev => !prev)}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex flex-col space-y-2">
                    <h2>Atau masuk dengan:</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center space-x-4">
                        {
                            sso.map((_sso, idx) => (
                                <AnimatedButton
                                    key={idx}
                                    onClick={() => setSsoProvider(_sso.provider)}
                                    type="button"
                                    icon={_sso.icon}
                                    disabled={ssoProvider === _sso.provider}
                                    loading={ssoProvider === _sso.provider}
                                >
                                    {_sso.label}
                                </AnimatedButton>
                            ))
                        }
                    </div>
                </div>

                <FormField
                    disabled={isSubmitLoading}
                    control={form.control}
                    name="remember_me"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-center p-2 space-x-4">
                            <Checkbox
                                disabled={isSubmitLoading}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            <FormLabel className="!mt-0" htmlFor="remember_me">Ingat Saya</FormLabel>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                >
                    Masuk
                </Button>
            </form>
        </Form>
    );
}