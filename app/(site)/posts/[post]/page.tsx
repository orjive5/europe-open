import { getPost } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

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
                <h1 className="text-center text-primaryTxt responsive-heading-large drop-shadow font-extrabold">
                    {post.name && post.name}
                </h1>
                    <div className="relative w-full h-[400px]">
                        <Image
                            src={post.image ? post.image : '/placeholder_dog.avif'}
                            alt={post.name ? post.name : 'Sorry, something went wrong on our end!'}
                            fill
                            sizes="100vw"
                            priority={true}
                            className="border-2 border-primaryTone object-cover"
                        />
                    </div>
                {post.content && (
                    <div className="text-justify responsive-base text-primaryTxt">
                        <PortableText value={post.content} />
                    </div>
                )}
                {post.URLs && (
                    <div className="w-full flex flex-col gap-5">
                        <h2 className="text-justify responsive-base text-primaryTxt">
                            Read more:
                        </h2>
                        <div className="text-secondaryTxt responsive-base flex flex-col gap-2 items-justify">
                            {post.URLs.map(url => {
                                return (
                                    <Link
                                        href={url}
                                        target='_blank'
                                        key={url}
                                        className="hover:underline truncate"
                                    >
                                        {url}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Post;
