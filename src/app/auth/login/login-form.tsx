"use client";

import React from "react";
import { Input } from "@/components/ui/form-input";
import type { SocialiteProvider } from "@/types/AuthType";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "sonner";
import AuthAPI from "@/api/AuthAPI";
import { AxiosError } from "axios";
import { UserType } from "@/types/UserType";
import LucideIcon from "@/components/lucide-icon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import sso from "@/constants/sso";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const LoginFormSchema = z.object({
  email: z.string().email().min(1, { message: "Email wajib diisi." }),
  password: z.string().min(1, { message: "Password wajib diisi." }),
  remember_me: z.boolean(),
});

// type LoginPayload = Omit<z.infer<typeof LoginFormSchema>, 'toc-accept'>;

export default function LoginForm() {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [ssoProvider, setSsoProvider] = useState<SocialiteProvider>();

  const router = useRouter();

  const { isAuth, setIsAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      router.back();
    }
  }, []);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  const pathname = usePathname();

  useEffect(() => {
    if (!ssoProvider) return;

    const ssoLogin = async () => {
      try {
        const resp = await AuthAPI.loginSSO(
          ssoProvider,
          pathname,
          "/user-dashboard"
        );

        const popup = window.open(
          resp.data.redirect_url as string,
          "sso-popup",
          "width=500,height=600"
        );

        const listener = (event: MessageEvent) => {
          const { user, targetPath } = event.data;

          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(user as UserType));

          router.push("/auth/is-publisher");

          setIsAuth(true);

          window.removeEventListener("message", listener);

          // router.push(targetPath || "/dashboard");
          popup?.close();
        };

        window.addEventListener("message", listener);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast(err.response?.data.message || err.message);
        }
      } finally {
        setSsoProvider(undefined);
      }
    };

    ssoLogin();
  }, [ssoProvider]);

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    setIsSubmitLoading(true);

    try {
      const resp = await AuthAPI.login(data);

      const respData = resp.data as UserType;

      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(respData));

      if (respData.is_publisher) {
        router.push("/publisher-dashboard");
      } else {
        router.push("/user-dashboard");
      }
      setIsAuth(true);
    } catch (err) {
      toast("Terjadi kesalahan saat login.");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-sky-400 to-sky-500 opacity-30 blur-lg"></div>
      <Card className="relative shadow-xl">
        <CardContent className="shadow-input mx-auto w-full rounded-md max-w-md bg-white px-10 pt-10 pb-4 dark:bg-black">
          <Form {...form}>
            <div>
              <h2 className="text-3xl mb-4 font-bold text-neutral-800 dark:text-neutral-200">
                Welcome Back to Vemer
              </h2>
              <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                Start giving back to the community with Vemer. Don&rsquo;t have
                an account?{" "}
                <Link
                  className="text-blue-600 hover:text-blue-400 underline"
                  href="/auth/register"
                >
                  Create a new account here
                </Link>
              </p>

              <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4 flex flex-col space-y-2 gap-2">
                  <FormField
                    disabled={isSubmitLoading}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            {...field}
                            disabled={isSubmitLoading}
                          />
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
                        <FormLabel htmlFor="password">Password</FormLabel>
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
                              className="absolute right-4 top-[.9rem] cursor-pointer w-4 h-4"
                              onClick={() =>
                                setIsPasswordShown((prev) => !prev)
                              }
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    disabled={isSubmitLoading}
                    control={form.control}
                    name="remember_me"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center py-2 px-1 space-x-4">
                        <Checkbox
                          disabled={isSubmitLoading}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormLabel className="!mt-0" htmlFor="remember_me">
                          Remember Me
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  className="group/btn flex flex-row items-center relative mt-5 h-10 w-full rounded-md bg-gradient-to-br font-medium bg-sky-500 hover:bg-sky-600 text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                  type="submit"
                >
                  <p>Sign In</p>
                  <p>&rarr;</p>
                </Button>

                <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg mb-4">Or continue with:</p>
                  <div className="flex flex-row justify-center items-center gap-5">
                    {sso.map((_ssoProvider, idx) => (
                      <Button
                        variant="outline"
                        className="group/btn relative text-black text-sm h-10 w-full hover:bg-sky-100 rounded-md flex justify-center items-center font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                        key={idx}
                        onClick={() => setSsoProvider(_ssoProvider.provider)}
                        type="button"
                        disabled={_ssoProvider.provider === ssoProvider}
                      >
                        <div className="flex flex-row items-center justify-content gap-4">
                          <LucideIcon icon={_ssoProvider.iconName} size={18} />
                          <p>{_ssoProvider.label}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
