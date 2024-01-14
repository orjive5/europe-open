// import { IJury } from "@/types/jury.interface";
import Image from "next/image";
import Link from "next/link";
// import CountrySection from "../countrySection";
import { AspectRatio } from "../ui/aspect-ratio";
// import { Badge } from "../ui/badge";

const PostsPreview = ({ post, landingPage }: any) => {
  console.log(post)
  return (
    <Link
      href={`/${post}s/${post.slug}`}
      key={post._id}
      className={`group hover:cursor-pointer flex flex-col gap-2 ${landingPage ? '' : 'sm:w-10/12 md:w-[300px]'} w-full`}
    >
      <AspectRatio
        className="overflow-hidden rounded-lg"
        ratio={1 / 1}
      >
        <Image
          src={post.image}
          alt={`${post} preview`}
          priority={true}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover"
        />
      </AspectRatio>
      <section className="flex flex-col gap-2">
        <div>
          <h2 className="sm:text-xl font-medium hover:underline">
            {post.title}
          </h2>
          <h3 className="text-muted-foreground">
            {post.description}
          </h3>
        </div>
      </section>
    </Link>
  )
}

export default PostsPreview;