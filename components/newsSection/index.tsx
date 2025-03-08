'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useNewsQuery } from "@/app/queries/queries";
import { PostsGrid } from "@/components/postsGrid";

export const NewsSection = () => {
    const { data, isLoading, isError } = useNewsQuery();
    return (
        <section className="w-5/6 flex flex-col items-center gap-8">
            <PostsGrid heading="News" href="news" data={data} isLoading={isLoading} isError={isError} />
            <Link href='news'>
                <Button>
                    Browse News
                </Button>
            </Link>
        </section>
    )
}