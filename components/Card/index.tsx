import { Post } from "@/types/post";
import Link from "next/link";
import Image from "next/image";

const Card = ({ post }: { post: Post }) => {

  function formatDate(inputDate: Date): string {
    const dateObj = new Date(inputDate);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return dateObj.toLocaleDateString(undefined, options);
  }

  return (
    <Link
      href={`/posts/${post.slug}`}
      key={post._id}
      className="relative z-10 h-[460px]"
    >
      {post.image && (
        <div className="h-full w-full relative">
          <div className="absolute inset-0 opacity-60 z-30 w-full h-full bg-primaryBg">
            <div className="absolute inset-0 z-10 bg-black opacity-25"></div>
          </div>
          <Image
            src={post.image}
            alt={post.name}
            fill
            sizes="100vw"
            priority={true}
            className="absolute z-20 w-full h-auto object-cover border-2 border-gray-500"
          />
        </div>
      )}
      <h1 className="w-full h-full absolute z-30 top-1 p-5 font-bold text-3xl hover:underline">
        {post.name}
      </h1>
      <h1 className="absolute z-30 bottom-1 p-5 text-lg">
        {formatDate(post._createdAt)}
      </h1>
    </Link>
  );
};

export default Card;