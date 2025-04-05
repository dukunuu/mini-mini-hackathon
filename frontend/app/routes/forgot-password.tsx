"use client";
import { Link } from "react-router";
import { PublicRoute } from "~/components/auth/PublicRoute";


export default function SignInPage() {

  return (
    <PublicRoute >
      <div className="flex items-center flex-col justify-center my-40">
        <div className="w-120 h-20 flex justify-center items-center">Уучлаарай одоогоор нууц үг сэргээх боломжгүй байна.</div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center  hover:scale-105 transition-transform duration-300 animate-bounce-subtle w-60 h-20 items-center bg-gray-200 rounded-lg mb-15">
            <Link
                to="/sign-in"
                className="text-gray-600 hover:underline"
              >
                Буцах
              </Link>
          </div>
        </div>
    </PublicRoute>
  );
}
