import PostsGrid from "@/components/postsGrid";

export default function Home() {

  return (
    <div className="flex justify-center py-10">
      <div className="w-5/6 md:w-4/5 lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PostsGrid />
      </div>
    </div>
  )
}
