'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [leetcodeId, setLeetcodeId] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const Submit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page refresh

    // Reset errors
    setErrors({});

    // Simple validation
    if (!name || !email || !password || !leetcodeId) {
      setErrors({
        name: !name ? 'Name is required' : '',
        email: !email ? 'Email is required' : '',
        password: !password ? 'Password is required' : '',
        leetcodeId: !leetcodeId ? 'LeetCode ID is required' : '',
      });
      return;
    }

    // Try signing up (or signing in for an existing user)
    const res = await signIn('credentials', {
      username: name,
      email,
      password,
      leetcodeId,
      redirect: false // Avoid automatic redirect
    });

    if (res?.error) {
      console.error('Failed to sign in:', res.error);
      setErrors({ form: res.error }); // Display form-wide errors if necessary
    } else {
      router.push('/'); // Redirect to home on success
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100 justify-center items-center">
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center text-primary">
              <Code2 className="h-8 w-8 mr-2 text-white" />
              <span className="text-2xl font-bold text-white">LeetGroup</span>
            </Link>
          </div>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-white">Create your account</CardTitle>
              <CardDescription className="text-center">
                Join LeetGroup and start your coding journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={Submit}>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leetcodeId" className="text-white">LeetCode ID</Label>
                  <Input
                    id="leetcodeId"
                    type="text"
                    placeholder="Your LeetCode username"
                    value={leetcodeId}
                    onChange={(e) => setLeetcodeId(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  {errors.leetcodeId && <p className="text-red-500 text-sm">{errors.leetcodeId}</p>}
                </div>
                <Button type="submit" className="w-full">Sign Up</Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="/signin" className="text-white hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
