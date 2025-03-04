"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/validator/login.schema"
import Backendless from "@/lib/backendless"
import { toast } from 'react-toastify'

import Cookies from 'js-cookie'

export default function Login() {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    async function onSubmitLogin(data: { email: string, password: string }) {
        try {
            const response: any = await Backendless.UserService.login(data.email, data.password, true)

            Cookies.set("user-token", response["user-token"], { expires: 7 })

            toast.success("Login successful")
            // arahkan ke feed
        } catch (error) {
            toast.error(`Login failed : ${error}`)
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="my-5 text-blue-500 font-bold">Login dulu gan</h1>
            <form
                onSubmit={handleSubmit(onSubmitLogin)}
                className="flex flex-col gap-y-5 items-center p-10 rounded-md shadow-sm bg-slate-100 w-1/2"
            >
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
                    type="submit">Login</button>
            </form>
        </div>
    )
}
