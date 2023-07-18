import { getPost } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

type Props = {
    params: {
        post: string;
    }
}

const Post = async ({ params }: Props) => {
    const slug = params.post;
    const post = await getPost(slug);
    return (
        <div>
            <header className="flex items-center justify-between">
                <h1 className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
                    {post.name}
                </h1>
                <a
                    href={post.url}
                    title='View Post'
                    target='_blank'
                    className="bg-gray-100 rounded-lg text-gray-500 font-bold py-3 px-4 whitespace-nowrap hover:bg-pink-500 hover:text-pink-100 transition"
                >
                    View Post
                </a>
            </header>

            {/* content goes here */}
            <div className="text-lg text-gray-700 mt-5">
                <PortableText value={post.content} />
            </div>

            {/* image goes here */}
            <Image 
                src={post.image}
                alt={post.name}
                width={1920}
                height={1080}
                className="mt-10 border-2 border-gray-700 object-cover rounded-xl"
            />
        </div>
    )
}

export default Post;
