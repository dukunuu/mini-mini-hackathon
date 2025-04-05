"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/lib/firebase";
import { Link } from "react-router";

const formSchema = z.object({
  email: z.string().email({
    message: "Зөв и-мэйл хаяг оруулна уу",
  }),
  password: z.string().min(6, {
    message: "Нууц үг багадаа 8 оронтой байх ёстой",
  }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      console.log(userCredential)
      
      // User successfully logged in
      toast.success("Амжилттай нэвтэрлээ!");
      // router.push("/");
      window.location.href = "/signup"
    } catch (error: any) {
      let errorMessage = "Нэвтрэхэд алдаа гарлаа";
      
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "Хэрэглэгч олдсонгүй";
          break;
        case "auth/wrong-password":
          errorMessage = "Нууц үг буруу байна";
          break;
        case "auth/invalid-email":
          errorMessage = "И-мэйл хаяг буруу байна";
          break;
        case "auth/too-many-requests":
          errorMessage = "Хэт олон оролдлого хийгдсэн. Түр хүлээнэ үү";
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
            Эргэн тавтай морил
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <Button type="submit" className="w-full">
                Нэвтрэх
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Бүртгэлгүй юу?{" "}
            <Link to="/signUp" className="text-blue-600 hover:underline">
              Бүртгүүлэх
            </Link>
          </div>
          <div className="mt-2 text-center text-sm">
            <Link
              to="/forgot-password"
              className="text-gray-600 hover:underline"
            >
              Нууц үг мартсан?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}