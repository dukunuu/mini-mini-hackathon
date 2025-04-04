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
import { Link, useNavigate } from "react-router";
import { PublicRoute } from "~/components/auth/PublicRoute";
import { useAuthStore } from "~/stores/auth.store";

const formSchema = z.object({
  email: z.string().email({
    message: "Зөв и-мэйл хаяг оруулна уу",
  }),
  password: z.string().min(6, {
    message: "Нууц үг багадаа 8 оронтой байх ёстой",
  }),
});

export default function SignInPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      login(userCredential.user);

      toast.success("Амжилттай нэвтэрлээ!");
      navigate("/dashboard");
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
    <PublicRoute>
      <main className="container mx-auto p-4 pt-20 flex flex-col items-center">
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
              <Link to="/sign-up" className="text-blue-600 hover:underline">
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
      </main>
    </PublicRoute>
  );
}
