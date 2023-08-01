"use client"

import { getPosts } from "@/sanity/sanity-utils"
import { useQuery } from "@tanstack/react-query"
import Card from "../Card"
import { useState } from "react"
import ReactPaginate from "react-paginate"

const PostsGrid = () => {

    const posts = useQuery(
        {
            queryKey: ['get_posts'],
            queryFn: getPosts,
        }
    );

    //PAGINATION
    const [pageNumber, setPageNumber] = useState(0);

    const postsPerPage = 3;
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
                <h2 className="text-3xl text-center self-center">
                    Loading...
                </h2>
            }
            {posts && displayPosts}
            <ReactPaginate
                breakLabel={"..."}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"flex items-center justify-center gap-8 col-span-1 md:col-span-2 lg:col-span-3 text-lg"}
                previousLinkClassName={"previousBttn"}
                disabledClassName={"text-secondaryTxt"}
                disabledLinkClassName={"cursor-not-allowed"}
                // pageLinkClassName={"text-blue-200"}
                activeClassName={"text-primaryTone"}
            />
        </>
    )
}

export default PostsGrid;