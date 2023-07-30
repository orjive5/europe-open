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
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-10 p-10 w-5/6 md:w-4/5 lg:w-3/4">
                <h1 className="text-center text-primaryTxt text-5xl drop-shadow font-extrabold">
                    {post.name}
                </h1>
                    <div className="relative w-3/4 h-[400px]">
                        <Image
                            src={post.image}
                            alt={post.name}
                            fill
                            sizes="100vw"
                            priority={true}
                            className="border-2 border-gray-700 object-cover rounded-xl"
                        />
                    </div>
                <div className="text-justify text-lg text-primaryTxt">
                    <PortableText value={post.content} />
                </div>
            </div>
        </div>
    )
}

export default Post;
