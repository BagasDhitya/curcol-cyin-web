"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Backendless from "@/lib/backendless"
import { toast } from "react-toastify"

type Post = {
    title: string,
    content: string,
}

type Response = {
    objectId?: string;
    title: string;
    content: string;
    created?: number;
    updated?: number;
};


export default function UserDashboard() {

    const router = useRouter()
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")

    async function handleCreatePost() {
        try {
            const user = await Backendless.UserService.getCurrentUser();
            if (!user) {
                toast.error("User not found!");
                return;
            }

            console.log("User data:", user);

            const newPost: Post = {
                title: title,
                content: content,
            };

            const response: Response = await Backendless.Data.of("posts").save(newPost);

            console.log("Post response:", response); // Cek apakah response mengandung objectId

            if (!response || !response.objectId) {
                throw new Error("Post creation failed, no objectId returned.");
            }

            // Setelah post tersimpan, tambahkan relasi author ke Users
            if (user.objectId) {
                await Backendless.Data.of("posts").setRelation(response.objectId, "author", [user.objectId]);
            } else {
                throw new Error("User objectId is undefined.");
            }

            toast.success("Success create your post!");
            router.push("/")
        } catch (error) {
            toast.error(`Failed to create post: ${error}`);
            console.error(error);
        }
    }



    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="p-5 w-1/2 h-1/2 flex flex-col justify-center items-center shadow-md">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <div className="w-full my-4 flex flex-col gap-y-5">
                    <input
                        type="text"
                        className="shadow-sm p-2 rounded-md text-black bg-slate-100"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="shadow-sm p-2 bg-slate-100 rounded-md"
                        placeholder="Content"
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white p-2" onClick={handleCreatePost}>
                        Create Post
                    </button>
                </div>
            </div>
        </div>
    )
}
