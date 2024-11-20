import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg    shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input type="email" placeholder="Enter your email" className="mt-1 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <Input type="password" placeholder="Enter your password" className="mt-1" />
          </div>
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account? <a href="/signup" className="text-blue-600 underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
