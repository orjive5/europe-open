'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import PostsPreview from "../postsPreview";
import { useAwardsQuery, useNewsQuery } from "@/app/queries/queries";

const PostsGrid = ({ heading, href }: { heading: string; href: string }) => {

    let query = useAwardsQuery;

    if (href === "awards") {
        query = useAwardsQuery
    }

    if (href === "news") {
        query = useNewsQuery
    }

    // Get posts data
    const { data, isLoading, isError } = query()

    return (
        <section className="w-full flex flex-col justify-center items-center gap-8">
            <Link href={href}>
                <h1 className="sm:text-xl font-medium hover:underline">
                    {heading}
                </h1>
            </Link>
            <div className="justify-items-center w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-8 gap-x-4">
                {
                    isLoading && [...Array(8)].map((el, i) => (
                        <div key={i} className="flex flex-col gap-2 w-full">
                            <AspectRatio
                                className="overflow-hidden rounded-lg"
                                ratio={1 / 1}
                            >
                                <Skeleton
                                    className="h-full w-full"
                                />
                            </AspectRatio>
                            <div className="flex flex-col items-start gap-1">
                                <Skeleton className="h-4 w-[200px]" />
                                <div className="text-start gap-1 flex flex-col justify-between items-start">
                                    <Skeleton className="h-4 w-[150px]" />
                                    <Skeleton className="h-4 w-[50px]" />
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    isError &&
                    <h2 className="text-center">
                        Something went wrong...
                    </h2>
                }
                {
                    data && data
                        .slice(0, 8)
                        .map(post => <PostsPreview landingPage key={post._id} post={post} />)
                }
            </div>
        </section>
    )
}

export default PostsGrid;