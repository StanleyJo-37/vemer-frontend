"use client";

import React from "react";
import { Input } from "@/components/ui/form-input";
import type { SocialiteProvider } from "@/types/AuthType";
import { Airplay, Linkedin } from "lucide-react";
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
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Omit, omit } from "lodash";
import AuthAPI from "@/api/AuthAPI";
import { AxiosError } from "axios";
import { UserType } from "@/types/UserType";
import LucideIcon from "@/components/lucide-icon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sso from "@/constants/sso";
import LoadingSpinner from "@/components/loading-spinner";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import PasswordErrors from "@/components/password-errors";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const RegisterFormSchema = z
  .object({
    email: z.string().email().min(1, { message: "Email wajib diisi." }),
    username: z
      .string()
      .min(8, { message: "Username must contain at least 8 characters." })
      .max(24, { message: "Username must contain at most 24 characters." }),
    name: z
      .string()
      .min(8, { message: "Name must contain at least 8 characters." }),
    password: z.string().superRefine((password, ctx) => {
      let containsNumeric = false;
      let containsUpperAlphabet = false;
      let containsLowerAlphabet = false;
      let containsSymbol = false;

      const issues = [];

      for (let i = 0; i < password.length; ++i) {
        const c = password.charAt(i);
        if (c >= "0" && c <= "9") containsNumeric = true;
        else if (c >= "A" && c <= "Z") containsUpperAlphabet = true;
        else if (c >= "a" && c <= "z") containsLowerAlphabet = true;
        else containsSymbol = true;
      }

      if (password.length < 8) issues.push("at least contains 8 characters.");
      if (!containsNumeric) issues.push("at least one number");
      if (!containsUpperAlphabet) issues.push("at least one uppercase letter");
      if (!containsLowerAlphabet) issues.push("at least one lowercase letter");
      if (!containsSymbol) issues.push("at least one symbol");

      if (issues.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: issues.join("|"),
          path: ["password"],
        });
      }
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "Type in the password again." }),
    "toc-accept": z.boolean().refine((val) => val, {
      message: "You have to agree to our license agreement.",
    }),
    is_publisher: z.boolean().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password does not match",
        path: ["confirmPassword"],
      });
    }
  });

type RegisterPayload = Omit<z.infer<typeof RegisterFormSchema>, "toc-accept">;

export function SignupForm() {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] =
    useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [isTocAcceptDialogOpen, setIsTocAcceptDialogOpen] =
    useState<boolean>(false);
  const [ssoProvider, setSsoProvider] = useState<SocialiteProvider>();

  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
      "toc-accept": false,
      is_publisher: false,
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

          window.removeEventListener("message", listener);

          router.push(targetPath || "/dashboard");
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

  const handleSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    setIsSubmitLoading(true);

    try {
      console.log(data.is_publisher);
      const payload: RegisterPayload = omit(data, "toc-accept");
      console.log(payload);

      const resp = await AuthAPI.register(payload);

      const respData = resp.data as UserType;

      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(respData));

      router.push("/auth/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(err.response?.data.message || err.message);
      }
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
              <Dialog
                open={isTocAcceptDialogOpen}
                onOpenChange={() => setIsTocAcceptDialogOpen(false)}
              >
                <div className="bg-background">
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Syarat Penggunaan Vemer</DialogTitle>
                    </DialogHeader>
                  </DialogContent>
                </div>
              </Dialog>

              <h2 className="text-3xl mb-4 font-bold text-neutral-800 dark:text-neutral-200">
                Welcome to Vemer
              </h2>
              <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                Start giving back to the community with Vemer.
              </p>

              <form className="my-8" onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex flex-row justify-center space-x-4">
                  <div className="mb-4 flex flex-col space-y-0 gap-2">
                    <FormField
                      disabled={isSubmitLoading}
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="username">Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Username"
                              {...field}
                              disabled={isSubmitLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      disabled={isSubmitLoading}
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="name">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Name"
                              {...field}
                              disabled={isSubmitLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-4 flex flex-col space-y-0 gap-2">
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
                          </FormControl>{" "}
                          <PasswordErrors
                            message={form.formState.errors.password?.message}
                          />
                        </FormItem>
                      )}
                    />

                    <FormField
                      disabled={isSubmitLoading}
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="confirmPassword">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative h-auto">
                              <Input
                                type={
                                  isConfirmPasswordShown ? "text" : "password"
                                }
                                placeholder="Confirm Password"
                                {...field}
                                disabled={isSubmitLoading}
                              />
                              <LucideIcon
                                icon={isConfirmPasswordShown ? "EyeOff" : "Eye"}
                                className="absolute right-4 top-[.9rem] cursor-pointer w-4 h-4"
                                onClick={() =>
                                  setIsConfirmPasswordShown((prev) => !prev)
                                }
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  disabled={isSubmitLoading}
                  control={form.control}
                  name="is_publisher"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2 pt-2 mb-5">
                      <Switch
                        id="publisher-mode"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        disabled={field.disabled}
                        name={field.name}
                        ref={field.ref}
                      />
                      <Label
                        htmlFor="publisher-mode"
                        className="cursor-pointer"
                      >
                        Register as a Publisher
                      </Label>
                    </div>
                  )}
                />
                <FormField
                  disabled={isSubmitLoading}
                  control={form.control}
                  name="toc-accept"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <div className="flex flex-row items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              id="toc-accept"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={field.disabled}
                              name={field.name}
                              ref={field.ref}
                            />
                          </FormControl>
                          <FormLabel className="!mt-0" htmlFor="toc-accept">
                            I agree to{" "}
                            <span
                              onClick={() => setIsTocAcceptDialogOpen(true)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Vemer's license and agreement
                            </span>
                            .
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  className="group/btn relative block mt-5 h-10 w-full rounded-md bg-gradient-to-br font-medium bg-sky-500 hover:bg-sky-600 text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                  type="submit"
                >
                  Sign up &rarr;
                </Button>

                <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg mb-4">Or continue with:</p>
                  <div className="flex flex-row justify-center items-center gap-5">
                    {sso.map((_ssoProvider, idx) => (
                      <Button
                        variant="outline"
                        className={cn(
                          "group/btn relative text-sm h-10 w-full hover:bg-sky-100 rounded-md flex justify-center items-center font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]",
                          _ssoProvider.provider !== ssoProvider && "text-black",
                          _ssoProvider.provider === ssoProvider &&
                            "text-gray-500 border-gray-500"
                        )}
                        key={idx}
                        onClick={() => setSsoProvider(_ssoProvider.provider)}
                        type="button"
                        disabled={_ssoProvider.provider === ssoProvider}
                      >
                        {_ssoProvider.provider === ssoProvider && (
                          <LoadingSpinner />
                        )}
                        <div className="flex flex-row items-center justify-content gap-4">
                          {idx === 0 ? (
                            <LucideIcon icon="Mail" size={18} />
                          ) : (
                            <LucideIcon icon="Linkedin" size={18} />
                          )}
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

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
