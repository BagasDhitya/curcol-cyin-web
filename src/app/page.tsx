import Backendless from "@/lib/backendless"

type Post = {
  objectId: string,
  title: string,
  content: string,
  author: [{
    name: string
  }],
  date_time: string
}

export default async function Feeds() {

  const posts = await Backendless.Data.of("posts").find({ relations: ["author"] }) as Post[]

  return (
    <div className="w-screen h-screen justify-center items-center flex flex-col">
      <div className="p-6 w-1/2 mx-auto">
        <h1 className="text-2xl font-bold mb-4">All Posts</h1>
        {
          posts.length === 0 ? (
            <p className="text-blue-500 font-semibold">No posts available</p>
          ) : (
            posts?.map((post: Post) => {
              return (
                <div
                  key={post?.objectId}
                  className="border p-4 mb-4 rounded shadow-sm"
                >
                  <h2 className="text-xl font-semibold">{post?.title}</h2>
                  <p className="text-slate-400">{post?.content}</p>
                  <div className="mt-10">
                    <p className="text-sm text-slate-700">By {post?.author[0]?.name}</p>
                    <p className="text-sm text-blue-500">Created on : {new Date(post?.date_time).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "2-digit" })}</p>
                  </div>
                </div>
              )
            })
          )
        }
      </div>
    </div>
  )
}
