"use client"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Cookies from "js-cookie"

export default function Navbar() {

    const router = useRouter()
    const pathname = usePathname()
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [profile, setProfile] = useState<any>()

    useEffect(() => {
        const token = Cookies.get('user-token')
        const name = localStorage.getItem("name")
        const email = localStorage.getItem("email")

        const profile = {
            email: email,
            name: name
        }

        setProfile(profile)
        setIsLogin(true)

        if (token) {
            return
        } else {
            router.push('/auth/login')
        }
    }, [])



    if (pathname === '/auth/login' && '/auth/register') {
        return
    }

    console.log('profile -> ', profile)

    return (
        <div className="w-screen h-16 p-4 flex justify-between fixed top-0 bg-blue-600">
            <div>
                <h1 className="text-white font-bold text-xl">Curcol Cyin</h1>
            </div>
            <div className="text-white flex justify-center items-center">
                {
                    isLogin && profile ?
                        <p>Hello, {profile.name}</p> :
                        <button>Login</button>
                }
            </div>
        </div>
    )
}
