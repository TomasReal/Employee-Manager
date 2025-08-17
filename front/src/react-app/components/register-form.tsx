// "use client"

// import { useState } from "react"
// import { useActionState } from "react"
// import { register } from "../actions/auth"
// import { Button } from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import { Label } from "../../components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
// import { AlertCircle } from "lucide-react"
// import Link from "next/link"

// export function RegisterForm() {
//   const [state, formAction, isPending] = useActionState(register)
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle>Create Account</CardTitle>
//         <CardDescription>Enter your details to create a new account.</CardDescription>
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
//           <div className="space-y-2">
//             <Label htmlFor="confirmPassword">Confirm Password</Label>
//             <Input
//               id="confirmPassword"
//               name="confirmPassword"
//               type="password"
//               required
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm your password"
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
//             {isPending ? "Creating account..." : "Create Account"}
//           </Button>
//           <p className="text-sm text-center text-gray-600">
//             Already have an account?{" "}
//             <Link href="/login" className="text-blue-600 hover:underline">
//               Sign in
//             </Link>
//           </p>
//         </CardFooter>
//       </form>
//     </Card>
//   )
// }

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/react-app/components/Button';
import { notify } from '@/shared/notify';
import { setToken } from '@/shared/auth';

type Props = {
  onSuccess?: () => void;
  apiBase?: string;
};

export function RegisterForm({ onSuccess, apiBase = 'http://localhost:3001' }: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const errs: string[] = [];
    if (!fullName.trim()) errs.push('Full name is required');
    if (!email.trim()) errs.push('Email is required');
    if (!password) errs.push('Password is required');
    if (password && password.length < 6) errs.push('Password must be at least 6 characters');
    if (password !== confirm) errs.push('Passwords do not match');

    if (errs.length) {
      setError(errs[0]);
      notify.error(errs[0]);
      return;
    }

    setPending(true);
    const done = notify.loading('Creating account...');

    try {
      const res = await fetch(`${apiBase}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: fullName.trim(), email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Registration failed');

      // Tu backend devuelve { token, user }. Autologin:
      setToken(data.token);
      notify.success('Account created!');

      // Si preferís llevar a /login en lugar de autologin,
      // comentá la línea de setToken de arriba y hacé:
      // window.location.replace('/login');

      onSuccess?.();
    } catch (err: any) {
      const msg = err?.message || 'Unexpected error';
      setError(msg);
      notify.error(msg);
    } finally {
      setPending(false);
      done && done();
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Create Account</h2>
        <p className="text-sm text-gray-600 mb-4">Enter your details to create a new account.</p>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm mb-3">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm mb-1">Full name</label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-1">Email</label>
            <input
              id="email"
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
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm mb-1">Confirm password</label>
            <input
              id="confirm"
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button className="w-full" type="submit" disabled={pending} loading={pending}>
            {pending ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
