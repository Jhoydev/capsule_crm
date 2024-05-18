'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ApiErrors } from '@/types/auth.types';

const Login = () => {
    const router: AppRouterInstance = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [shouldRemember, setShouldRemember] = useState<boolean>(false)
    const [errors, setErrors] = useState<ApiErrors>({})
    const [status, setStatus] = useState<string | null>(null)

    /*useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })*/

    const submitForm = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

        await login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <>
            <AuthSessionStatus className="mb-4" status={status} />
            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div>
                    <Label className htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                        required
                        autoFocus
                    />

                    <InputError messages={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <Label className htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1 w-full"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                    />

                    <InputError messages={errors.password} className="mt-2" />
                </div>

                {/* Remember Me */}
                <div className="block mt-4">
                    <label
                        htmlFor="remember_me"
                        className="inline-flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href="/forgot-password"
                        className="underline text-sm text-gray-600 hover:text-gray-900">
                        Forgot your password?
                    </Link>

                    <Button type="submit" className="ml-3">Login</Button>
                </div>
            </form>
        </>
    )
}

export default Login
