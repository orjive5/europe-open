"use client"

import { getPosts } from "@/sanity/sanity-utils"
import { useQuery } from "@tanstack/react-query"
import Card from "../Card"
import { useState } from "react"
import ReactPaginate from "react-paginate"
import CardSkeleton from "../CardSkeleton"

const PostsGrid = () => {

    const posts = useQuery(
        {
            queryKey: ['get_posts'],
            queryFn: getPosts,
        }
    );
    
    const [pageNumber, setPageNumber] = useState(0);

    const postsPerPage = 12;
    const pagesVisited = pageNumber * postsPerPage;

    const displayPosts = posts.data?.slice(pagesVisited, pagesVisited + postsPerPage)
        .map(post => (
            <Card key={post._id} post={post} />
    ));

    const pageCount = Math.ceil((posts && posts.data) ? posts.data.length / postsPerPage : 0);

    const changePage = ({selected}: {selected: number}) => {
        setPageNumber(selected)
    }

    return (
        <>
            {
                posts.isLoading &&
                (
                    <>
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                    </>
                )
            }
            {posts && displayPosts}
            <ReactPaginate
                breakLabel={"..."}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"flex items-center justify-center gap-8 col-span-1 md:col-span-2 lg:col-span-3 responsive-base"}
                previousLinkClassName={"previousBttn"}
                disabledClassName={"text-secondaryTxt"}
                disabledLinkClassName={"cursor-not-allowed"}
                activeClassName={"text-primaryTone"}
            />
        </>
    )
}

export default PostsGrid;