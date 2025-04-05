import { Hero } from "../../components/home/hero";
import { Features } from "../../components/home/features";
import { Testimonials } from "../../components/home/comments";
import { WhatIsAthenify } from "../../components/home/whatis";
import type { Route } from "../+types/home";

import { Button } from "~/components/ui/button"; // Make sure you have this shadcn button component

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Core Features Summary" },
    { name: "description", content: "Track your courses, manage deadlines, and monitor your progress" },
  ];
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <WhatIsAthenify />
      <Features />
      <Testimonials />
    </main>
  );
}