import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/globals.ts';
import { toast } from '@/hooks/use-toast.ts';

interface LoginFormProps {
  onSuccessfulLogin?: () => void;
}
export default function LoginForm({ onSuccessfulLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  console.log('LoginForm', { email, password, error });

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    else {
      setError(null);
      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in',
      });
      if (onSuccessfulLogin) onSuccessfulLogin();
    }
  }

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) setError(error.message);
    else {
      setError(null);
      toast({
        title: 'Signup Successful',
        description: 'Verify your email to complete',
      });
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" onClick={handleLogin}>
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
      <CardFooter className={'flex justify-center'}>
        {error && (
          <div className="text-center text-red-500" role="alert">
            {error}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
