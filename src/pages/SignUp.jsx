import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import signUpPhoto from '../assets/images/sign-up.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, signInWithGoogle } from '@/lib/firebase';
import { useState } from "react";


const schema = z.object({
  email: z.string().email('Invalid email address').refine((email) => {
    const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
    const domain = email.split("@")[1];
    return allowedDomains.includes(domain)
  }, "please enter authorized domain"),

  password: z.string().min(8, 'Password must be at least 8 characters'),

  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export function Signup({ className, ...props }) {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate('/');
      form.reset();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError("Email already registered")
      } else {
        setError('Something went wrong, please try again')
      }
    }

  }

  const handleGoogle = async () => {
    try {
      await signInWithGoogle()
      navigate('/dashboard')
    } catch (error) {
      setError('Google sign in failed, please try again');
      console.warn(error)
    }
  }

  return (
    <div className={cn("hero-bg flex flex-col h-screen px-5 lg:px-48 justify-center gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 flex flex-col gap-4">

              {/* Heading */}
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm">
                  Enter your details below to create your account
                </p>
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button type="submit" className="w-full">
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              {error && <span className="bg-red-500/10 text-sm text-center py-1 rounded-sm text-red-400" >{error}</span>}

              {/* Divider */}
              <div className="relative text-center text-sm">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <span className="bg-card relative z-10 px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              {/* Google Button */}
              <Button onClick={handleGoogle} variant="outline" type="button" className="w-full flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Sign up with Google
              </Button>

              {/* Sign In Link */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="no-underline text-brand hover:text-subBrand">
                  Sign In
                </Link>
              </p>

            </form>
          </Form>

          {/* Right Side Image */}
          <div className="bg-muted relative hidden md:block">
            <img
              src={signUpPhoto}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>

        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground px-6">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
      </p>
    </div>
  )
}