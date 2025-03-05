"use client"
import { useEffect, useState, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import Cookies from "js-cookie"

export default function Navbar() {

    const router = useRouter()
    const pathname = usePathname()
    const isLogin = useRef(false)
    const profile = useRef({ name: "", email: "" })


    useEffect(() => {
        const token = Cookies.get('user-token')

        if (token) {
            isLogin.current = true
        } else {
            isLogin.current = false
            router.push('/auth/login')
        }

        profile.current = {
            name: localStorage.getItem("name") as string,
            email: localStorage.getItem("email") as string
        }
    }, [router])

    if (pathname === '/auth/login' && '/auth/register') {
        return
    }

    return (
        <div className="w-screen h-16 p-4 flex justify-between fixed top-0 bg-blue-600">
            <div>
                <h1 className="text-white font-bold text-xl">Curcol Cyin</h1>
            </div>
            <div className="text-white flex justify-center items-center">
                {
                    isLogin.current && profile ?
                        <p>Hello, {profile.current.name}</p> :
                        <button>Login</button>
                }
            </div>
        </div>
    )
}
