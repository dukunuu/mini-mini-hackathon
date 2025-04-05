"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/lib/firebase";
import { Link } from "react-router";

const formSchema = z.object({
  email: z.string().email({
    message: "Зөв и-мэйл хаяг оруулна уу",
  }),
  password: z.string().min(6, {
    message: "Нууц үг багадаа 8 оронтой байх ёстой",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Нууц үг таарахгүй байна",
  path: ["confirmPassword"],
});

export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      console.log(userCredential)

      toast.success("Амжилттай бүртгүүллээ!");
    } catch (error: any) {
      let errorMessage = "Бүртгүүлэхэд алдаа гарлаа";
      
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Энэ и-мэйл хаяг аль хэдийн бүртгэгдсэн байна";
          break;
        case "auth/weak-password":
          errorMessage = "Нууц үг хэтэрхий сул байна";
          break;
        case "auth/invalid-email":
          errorMessage = "И-мэйл хаяг буруу байна";
          break;
      }
      
      toast.error(errorMessage);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Шинэ бүртгэл үүсгэх
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>И-мэйл</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="жишээ@email.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нууц үг</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нууц үг давтах</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Бүртгүүлэх
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Бүртгэлтэй юу?{" "}
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              Нэвтрэх
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
