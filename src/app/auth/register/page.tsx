"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/lib/validator/register.schema"
import Backendless from "@/lib/backendless"
import { toast } from 'react-toastify'

export default function Register() {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema)
    })

    async function onSubmitRegister(data: { name: string, email: string, password: string }) {
        try {
            await Backendless.UserService.register(data)
            toast.success("Registration successful")
            router.push('/auth/login')
        } catch (error) {
            toast.error(`Registration failed: ${error}`)
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="my-5 text-blue-500 font-bold">Welcome to CurcolCyin</h1>
            <form
                onSubmit={handleSubmit(onSubmitRegister)}
                className="flex flex-col gap-y-5 items-center p-10 rounded-md shadow-sm bg-slate-100 w-1/2"
            >
                <input
                    {...register('name')}
                    className="border border-slate-400 p-2 mb-2 text-black rounded-md w-1/2"
                    placeholder="Type your name here ..."
                    type="text" />
                {errors.name && <p className="text-red-500 mt-2">{errors?.name?.message}</p>}
                <input
                    {...register('email')}
                    className="border border-slate-400 p-2 mb-2 text-black rounded-md w-1/2"
                    placeholder="Type your email here ..."
                    type="email" />
                {errors.email && <p className="text-red-500 mt-2">{errors?.email?.message}</p>}
                <input
                    {...register('password')}
                    className="border border-slate-400 p-2 mb-2 text-black rounded-md w-1/2"
                    placeholder="Type your password here ..."
                    type="password"
                />
                {errors.password && <p className="text-red-500 mt-2">{errors?.password?.message}</p>}
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-4 rounded-md w-1/2"
                    type="submit">Register</button>
            </form>
        </div>
    )
}
