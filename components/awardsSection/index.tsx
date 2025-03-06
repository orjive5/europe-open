'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAwardsQuery } from "@/app/queries/queries";
import { PostsGrid } from "@/components/postsGrid";

export const AwardsSection = () => {
    const { data, isLoading, isError } = useAwardsQuery();
    return (
        <section className="w-5/6 flex flex-col items-center gap-8">
            <PostsGrid heading="AWARDS" href="awards" data={data} isLoading={isLoading} isError={isError} />
            <Link href='awards'>
                <Button>
                    Browse Awards
                </Button>
            </Link>
        </section>
    )
}