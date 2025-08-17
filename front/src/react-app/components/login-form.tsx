// "use client"

// import { useState } from "react"
// import { useActionState } from "react"
// import { login } from "../actions/auth"
// import { Button } from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import { Label } from "../../components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
// import { AlertCircle } from "lucide-react"
// import Link from "next/link"

// export function LoginForm() {
//   const [state, formAction, isPending] = useActionState(login)
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle>Login</CardTitle>
//         <CardDescription>Enter your email and password to access your account.</CardDescription>
//       </CardHeader>
//       <form action={formAction}>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//             />
//           </div>
//           {state?.error && (
//             <div className="flex items-center space-x-2 text-red-500">
//               <AlertCircle size={16} />
//               <span className="text-sm">{state.error}</span>
//             </div>
//           )}
//         </CardContent>
//         <CardFooter className="flex flex-col space-y-4">
//           <Button className="w-full" type="submit" disabled={isPending}>
//             {isPending ? "Logging in..." : "Log in"}
//           </Button>
//           <p className="text-sm text-center text-gray-600">
//             Don't have an account?{" "}
//             <Link href="/register" className="text-blue-600 hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </CardFooter>
//       </form>
//     </Card>
//   )
// }

// src/react-app/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { Button } from '@/react-app/components/Button';
import { setToken } from '@/shared/auth';
import { notify } from '@/shared/notify';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

type Props = {
  onSuccess?: () => void;              // qué hacer después de loguear (navegar/recargar)
  apiBase?: string;                    // opcional: base URL del back
};

export function LoginForm({ onSuccess, apiBase = 'http://localhost:3001' }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const done = notify.loading?.('Signing in...');

    try {
      const res = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Login failed');

      setToken(data.token);
      notify.success?.('Welcome!');
      onSuccess?.();
    } catch (err: any) {
      const msg = err?.message || 'Unexpected error';
      setError(msg);
      notify.error?.(msg);
    } finally {
      setPending(false);
      done && done();
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Login</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter your email and password to access your account.
        </p>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm mb-3">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button className="w-full" type="submit" disabled={pending} loading={pending}>
            {pending ? 'Logging in...' : 'Log in'}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
