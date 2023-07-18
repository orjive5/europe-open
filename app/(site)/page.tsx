import { getPosts } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex justify-center">
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          posts.map(post => {
            return (
              <Link
                href={`/posts/${post.slug}`}
                key={post._id}
                className="border-2 border-gray-500 rounded-lg p-1 hover:scale-105 hover:border-blue-500"
              >
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.name}
                    width={250}
                    height={100}
                    className="object-cover rounded-lg border borded-gray-500"
                  />
                )}
                <div className="mt-2 font-extrabold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                  {post.name}
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}
