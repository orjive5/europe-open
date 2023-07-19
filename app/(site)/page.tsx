import Card from "@/components/Card";
import { getPosts } from "@/sanity/sanity-utils";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex justify-center">
      <div className="w-5/6 md:w-4/5 lg:w-3/4 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          posts.map(post => {
            return (
              <Card post={post} />
            )
          })
        }
      </div>
    </div>
  )
}
