"use client"
import { useState, useEffect } from "react"
import Backendless from "@/lib/backendless"
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import Modal from "./modal.module"

type FormData = {
    title: string,
    content: string,
    objectId?: string | number | object
}

export default function ActionButton({ post }: { post: any }) {

    const [isEditing, setIsEditing] = useState(false)
    const [currentUser, setCurrentUser] = useState<Backendless.User>()
    const [formData, setFormData] = useState<FormData>({ title: "", content: "", objectId: "" })
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

    async function handleEditButton(e: React.FormEvent) {
        e.preventDefault()
        try {
            const updatedPost: FormData = {
                objectId: post.objectId,
                title: formData.title,
                content: formData.content
            }
            await Backendless.Data.of("posts").save(updatedPost)
            toast.success("Post updated successfully!")
            route.refresh()
        } catch (error) {
            toast.error(`Failed to update post : ${error}`)
        }
    }

    async function getCurrentUser() {
        try {
            const user = await Backendless.UserService.getCurrentUser()
            setCurrentUser(user)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])


    return (
        <div className="mt-2 flex gap-x-3">
            {
                currentUser?.objectId === post.ownerId ?
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-500 text-black p-5 rounded-md h-14 font-semibold flex justify-center items-center"
                        >Update</button>
                        <button
                            onClick={handleDeleteButton}
                            className="bg-red-500 text-white p-5 rounded-md h-14 font-semibold flex justify-center items-center"
                        >Delete</button>
                        <Modal onClose={() => setIsEditing(false)} isOpen={isEditing}>
                            <h2 className="text-xl font-bold mb-4">Update Post</h2>
                            <form onSubmit={handleEditButton}>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="w-full p-2 border rounded mb-2 text-black bg-slate-100"
                                    onChange={(e) => setFormData({
                                        ...formData, title: e.target.value
                                    })}
                                />
                                <textarea
                                    className="w-full p-2 border rounded mb-2 text-black bg-slate-100"
                                    onChange={(e) => setFormData({
                                        ...formData, content: e.target.value
                                    })}
                                />
                                <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full">Save</button>
                            </form>
                        </Modal>
                    </> : null
            }
        </div>
    )
}
