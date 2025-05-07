"use client";
import React from "react";
import { Input } from "@/components/ui/form-input";
import type { SocialiteProvider } from "@/types/AuthType";
import { Airplay, Linkedin } from 'lucide-react';
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

const RegisterFormSchema = z.object({
  email: z.string().email().min(1, { message: "Email wajib diisi." }),
  username: z.string().min(1, { message: "Username wajib diisi." }),
  password: z.string().min(1, { message: "Password wajib diisi." }),
  confirmPassword: z.string().min(1, { message: "Confirm Password wajib diisi." }),
  "toc-accept": z
    .boolean()
    .refine((val) => val, {
      message: "Anda harus menyetujui syarat penggunaan Vemer.",
    }),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
});

const sso: {
  label: string;
  provider: SocialiteProvider;
}[] = [
  {
    label: "Google",
    provider: "google",
  },
  {
    label: "LinkedIn",
    provider: "linkedin-openid",
  },
];

type RegisterPayload = Omit<z.infer<typeof RegisterFormSchema>, "toc-accept">;

export function SignupForm() {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [isTocAcceptDialogOpen, setIsTocAcceptDialogOpen] = useState<boolean>(false);
  const [ssoProvider, setSsoProvider] = useState<SocialiteProvider>();

  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      "toc-accept": false,
    },
  });

  useEffect(() => {
    if (!ssoProvider) return;

    const ssoLogin = async () => {
      try {
        const resp = await AuthAPI.loginSSO(ssoProvider, "", "");
      } catch (err) {
        if (err instanceof AxiosError) {
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
      const payload: RegisterPayload = omit(data, "toc_accept");

      const resp = await AuthAPI.register(payload);

      const respData = resp.data as UserType;

      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(respData));

      router.push("/auth/profile-completion");
    } catch (err) {
      toast("Terjadi kesalahan saat registrasi.");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="shadow-input mx-auto w-full max-w-md rounded-2xl bg-white px-10 pt-10 pb-4 dark:bg-black">
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

        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to Vemer
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Login to Vemer if you can because we don&apos;t have a login flow
          yet
        </p>

        <form className="my-8" onSubmit={form.handleSubmit(handleSubmit)}>
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
                        onClick={() => setIsPasswordShown((prev) => !prev)}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={isSubmitLoading}
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative h-auto">
                      <Input
                        type={isConfirmPasswordShown ? "text" : "password"}
                        placeholder="Confirm Password"
                        {...field}
                        disabled={isSubmitLoading}
                      />
                      <LucideIcon
                        icon={isConfirmPasswordShown ? "EyeOff" : "Eye"}
                        className="absolute right-4 top-[.9rem] cursor-pointer w-4 h-4"
                        onClick={() => setIsConfirmPasswordShown((prev) => !prev)}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormLabel className="!mt-0" htmlFor="toc_accept">
            Saya menyetujui{" "}
            <span
              onClick={() => setIsTocAcceptDialogOpen(true)}
              className="text-blue-600 hover:text-blue-900"
            >
              syarat penggunaan Vemer
            </span>
            .
          </FormLabel>
          <button
            className="group/btn relative block mt-5 h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="flex flex-row justify-center items-center gap-5">
            {sso.map((_sso, idx) => (
              <button
                className="group/btn relative block text-sm h-10 w-full rounded-md flex justify-center items-center bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                key={idx}
                onClick={() => setSsoProvider(_sso.provider)}
                type="button"
              >
                <div className="flex flex-row items-center justify-content gap-4">
                  {idx === 0 ? <Airplay size={18} /> : <Linkedin size={18} />}
                  {_sso.label}
                </div>
                <BottomGradient />
              </button>
            ))}
          </div>
        </form>
      </div>
    </Form>
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
