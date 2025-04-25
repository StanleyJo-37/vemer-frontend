"use client"

import type React from "react"

import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import AuthAPI from "@/api/AuthAPI"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { SocialiteProvider } from "@/types/AuthType"
import { icons } from "lucide-react";
import { AxiosError } from "axios"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import AnimatedButton from "@/components/animated-button"

const RegisterFormSchema = z.object({
  email: z.string().email().min(1, { message: "Email wajib diisi." }),
  username: z.string().min(1, { message: "Username wajib diisi." }),
  password: z.string().min(1, { message: "Password wajib diisi." }),
  "toc-accept": z.boolean().refine((val) => val, { message: "Anda harus menyetujui syarat penggunaan Vemer." }),
})

const sso: { label: string; provider: SocialiteProvider; icon: keyof typeof icons }[] = [
  {
    label: "Google",
    provider: "google",
    icon: "Airplay",
  },
  {
    label: "LinkedIn",
    provider: "linkedin-openid",
    icon: "Linkedin",
  },
]

export default function RegisterForm() {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false)
  const [isTocAcceptDialogOpen, setIsTocAcceptDialogOpen] = useState<boolean>(false)
  const [ssoProvider, setSsoProvider] = useState<SocialiteProvider>()

  const router = useRouter()

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      "toc-accept": false,
    },
  })

  useEffect(() => {
    if (!ssoProvider) return

    const ssoLogin = async () => {
      try {
        const resp = await AuthAPI.loginSSO(ssoProvider, "", "")
      } catch (err) {
        if (err instanceof AxiosError) {
        }
      } finally {
        setSsoProvider(undefined)
      }
    }

    ssoLogin()
  }, [ssoProvider])

  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    setIsSubmitLoading(true)
    AuthAPI.register(data.email, data.password, data.username)
      .then((res) => {
        router.push("/")
      })
      .catch((err) => {
        toast("Terjadi kesalahan saat registrasi.")
      })
      .finally(() => {
        setIsSubmitLoading(false)
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

      <div className="rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-800">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              Daftar Sekarang
          </h2>
        </div>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="Tyler" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Durden" type="text" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="twitterpassword">Your twitter password</Label>
            <Input id="twitterpassword" placeholder="••••••••" type="twitterpassword" />
          </LabelInputContainer>

          <div className="mb-4">
            <FormField
              disabled={isSubmitLoading}
              control={form.control}
              name="toc-accept"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-center p-2 space-x-4">
                  <Checkbox disabled={isSubmitLoading} checked={field.value} onCheckedChange={field.onChange} />
                  <FormLabel className="!mt-0" htmlFor="toc-accept">
                    Saya menyetujui{" "}
                    <span onClick={() => setIsTocAcceptDialogOpen(true)} className="text-blue-600 hover:text-blue-900">
                      syarat penggunaan Vemer
                    </span>
                    .
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="flex flex-col space-y-4">
            {sso.map((_sso, idx) => (
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
            ))}
          </div>
        </form>
      </div>
    </Form>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
}
