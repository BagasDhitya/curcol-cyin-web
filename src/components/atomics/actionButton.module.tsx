"use client"
// import { useState } from "react"
import Backendless from "@/lib/backendless"
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

type FormData = {
    title: string,
    content: string,
    objectId?: string | number | object
}

export default function ActionButton({ post }: { post: any }) {

    // const [isEditing, setIsEditing] = useState(false)
    // const [formData, setFormData] = useState<FormData>({ title: "", content: "", objectId: "" })
    const route = useRouter()

    async function handleDeleteButton() {
        if (!window.confirm("Are you sure want to delete this post?")) {
            return
        }

        try {
            await Backendless.Data.of("posts").remove(post?.objectId as FormData)
            toast.success("Post deleted successfully!")
            route.refresh()
        } catch (error) {
            toast.error(`Failed to delete post : ${error}`)
        }
    }

    return (
        <div>
            <button
                onClick={handleDeleteButton}
                className="bg-red-500 text-white p-5 rounded-md"
            >Delete</button>
        </div>
    )
}
