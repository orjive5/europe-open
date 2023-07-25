import { Post } from "@/types/post";
import Link from "next/link";
import Image from "next/image";

const Card = ({ post }: { post: Post }) => {
  return (
    <Link
      href={`/posts/${post.slug}`}
      key={post._id}
      className="relative z-10 h-[460px]"
    >
      {post.image && (
        <div className="h-full w-full relative">
          <div className="absolute inset-0 opacity-60 z-30 w-full h-full bg-[#99ccff]">
            <div className="absolute inset-0 z-10 bg-black opacity-25"></div>
          </div>
          <Image
            src={post.image}
            alt={post.name}
            fill
            sizes="100vw, 50vw, 33vw"
            className="absolute z-20 w-full h-full object-cover border-2 border-gray-500"
          />
        </div>
      )}
      <h1 className="w-full h-full absolute z-30 top-1 p-5 font-bold text-3xl hover:underline">
        {post.name}
      </h1>
    </Link>
  );
};

export default Card;