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
        <div className="p-10">
            <h1 className="text-primaryTxt text-5xl drop-shadow font-extrabold">
                {post.name}
            </h1>
            <Image
                src={post.image}
                alt={post.name}
                width={1920}
                height={1080}
                //TODO: check sizes with responsive image linter
                // fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
                className="w-full h-auto mt-10 border-2 border-gray-700 object-cover rounded-xl"
            />
            <div className="text-lg text-secondaryTxt mt-5">
                <PortableText value={post.content} />
            </div>

        </div>
    )
}

export default Post;
