"use client"

import { getPosts } from "@/sanity/sanity-utils"
import { useQuery } from "@tanstack/react-query"
import Card from "../Card"
import { useState } from "react"

const PostsGrid = () => {

    const posts = useQuery(
        {
            queryKey: ['get_posts'],
            queryFn: getPosts
        }
    );

  return (
    <>
        {
            posts.isLoading && <h2 className="text-3xl text-center self-center">Loading...</h2>
        }
        {
            posts && posts.data?.map(post => {
                return (
                    <Card key={post._id} post={post} />
                )
            })
        }
    </>
  )
}

export default PostsGrid;