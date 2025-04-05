import { Link } from "react-router";
import type { Route } from "../+types/home";

import { Button } from "~/components/ui/button"; // Make sure you have this shadcn button component

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Welcome to My App</h1>
      <Button asChild>
        <Link to="/sign-up">
          Sign In
        </Link>
      </Button>
    </div>
  );
}