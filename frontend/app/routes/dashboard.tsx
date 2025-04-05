import { ProtectedRoute } from "~/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="container mx-auto p-4 pt-20">
        <h1 className="text-2xl font-bold">Protected Dashboard</h1>
        <p>If you can see this, you are authenticated!</p>
      </main>
    </ProtectedRoute>
  );
} 