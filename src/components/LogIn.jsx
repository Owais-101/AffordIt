// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { auth, signInWithGoogle } from '@/lib/firebase'
// import { useNavigate, Link } from 'react-router-dom'
// import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from './ui/form'
// import { Input } from './ui/input'
// import { Button } from './ui/button'

// const schema = z.object({
//     email: z.string().email('Invalid email'),
//     password: z.string().min(8, 'Password must be at least 8 characters'),
// })

// const LoginForm = () => {
//     const navigate = useNavigate()
//     const [error, setError] = useState('')
//     const [loading, setLoading] = useState(false)

//     const form = useForm({
//         resolver: zodResolver(schema),
//         defaultValues: {
//             email: '',
//             password: '',
//         },
//     })

//     const onSubmit = async (data) => {
//         try {
//             setLoading(true)
//             setError('')
//             await signInWithEmailAndPassword(auth, data.email, data.password)
//             navigate('/')
//         } catch (error) {
//             if (error.code === 'auth/user-not-found') setError('No account found with this email')
//             else if (error.code === 'auth/wrong-password') setError('Incorrect password')
//             else if (error.code === 'auth/invalid-credential') setError('Invalid email or password')
//             else setError('Something went wrong, please try again')
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleGoogle = async () => {
//         try {
//             await signInWithGoogle()
//             navigate('/')
//         } catch (error) {
//             setError('Google sign in failed, please try again');
//             console.warn(error)
//         }
//     }

//     return (
//         <div className='min-h-screen flex items-center justify-center hero-bg px-4'>

//             {/* Card */}
//             <div className='w-full max-w-md border border-white/10 bg-white rounded-2xl p-8 shadow-2xl'>

//                 {/* Header */}
//                 <div className='flex flex-col items-center gap-2 mb-8'>
//                     <h1 className='text-3xl font-bold text-black'>Welcome back</h1>
//                     <p className='text-black/50 text-sm'>Sign in to your AffordIt account</p>
//                 </div>

//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>

//                         <FormField
//                             control={form.control}
//                             name='email'
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className='text-black/70'>Email</FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             type='email'
//                                             placeholder='m@example.com'
//                                             className='bg-white/10 border-black/10 text-black placeholder:text-black/30 focus:border-orange-500'
//                                             {...field}
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             control={form.control}
//                             name='password'
//                             render={({ field }) => (
//                                 <FormItem>
//                                     {/* <div className='flex items-center justify-between'>
//                                         <FormLabel className='text-black/70'>Password</FormLabel>
//                                         <Link to='/forgot-password' className='text-xs text-orange-400 hover:text-orange-300'>
//                                             Forgot password?
//                                         </Link>
//                                     </div> */}
//                                     <FormLabel>Password</FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             type='password'
//                                             placeholder='••••••••'
//                                             className='bg-white/10 border-black/10 text-black placeholder:text-black/30 focus:border-orange-500'
//                                             {...field}
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         {/* Error */}
//                         {error && (
//                             <p className='text-red-400 text-sm text-center bg-red-500/10 py-2 px-4 rounded-lg'>
//                                 {error}
//                             </p>
//                         )}

//                         <Button
//                             type='submit'
//                             disabled={loading}
//                             className='w-full bg-orange-500 hover:bg-orange-600  font-semibold mt-2'
//                         >
//                             {loading ? 'Signing in...' : 'Sign In'}
//                         </Button>

//                         {/* Divider */}
//                         <div className='relative text-center text-sm my-2'>
//                             <div className='absolute inset-0 flex items-center'>
//                                 <div className='w-full border-t border-white/10' />
//                             </div>
//                             <span className='relative z-10 px-2 text-black/80 bg-transparent'>
//                                 Or continue with
//                             </span>
//                         </div>

//                         {/* Google */}
//                         <Button onClick={handleGoogle} variant='outline' type='button' className='w-full bg-white/5 border-black/10 text-black hover:bg-white/10 flex items-center gap-2'>
//                             <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-4 w-4'>
//                                 <path d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z' fill='currentColor' />
//                             </svg>
//                             Continue with Google
//                         </Button>

//                         {/* Signup Link */}
//                         <p className='text-center text-sm text-black/80 mt-2'>
//                             Don't have an account?{' '}
//                             <Link to='/signup' className='text-orange-400 text-center hover:text-orange-300 font-medium'>
//                                 Sign Up
//                             </Link>
//                         </p>

//                     </form>
//                 </Form>
//             </div>
//         </div>
//     )
// }

// export default LoginForm