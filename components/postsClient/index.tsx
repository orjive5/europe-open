'use client'

import { useAwardsQuery } from "@/app/queries/queries";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

import PostsPreview from "../postsPreview";

const PostsClient = ({ postType }: { postType: string }) => {
  let query = useAwardsQuery;

  if (postType === "awards") {
    query = useAwardsQuery
  }

  // Get posts data
  const { data, isLoading, isError } = query()

  // Pagination
  const [pageNumber, setPageNumber] = useState(0);

  const awardsPerPage = 16;
  const pagesVisited = pageNumber * awardsPerPage;

  const pageCount = Math.ceil((data && data) ? data.length / awardsPerPage : 0);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
    window.scrollTo({ top: 0 })
  }

  // Display posts
  const displayPosts = data?.slice(pagesVisited, pagesVisited + awardsPerPage)
    .map((j: any) => (
      <PostsPreview key={j._id} post={j} />
    ));

  return (
    <main className="flex flex-col md:items-center sm:my-8 gap-8">
      <section className="w-full flex flex-col justify-center items-center gap-8">
        <div className="justify-items-center w-full md:w-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-8 gap-x-4">
          {
            isLoading && [...Array(16)].map((el, i) => (
              <div key={i} className="flex flex-col gap-2 w-full sm:w-10/12 md:w-[300px]">
                <AspectRatio
                  className="overflow-hidden rounded-lg"
                  ratio={1 / 1}
                >
                  <Skeleton
                    className="h-full w-full"
                  />
                </AspectRatio>
                <section className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[250px]" />
                  </div>
                  <div className="gap-1 flex flex-col justify-between items-start">
                    <Skeleton className="h-4 w-[150px]" />
                    <div className="flex gap-2 flex-wrap">
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                </section>
              </div>
            ))
          }
          {
            isError &&
            <h2 className="text-center">
              Something went wrong...
            </h2>
          }
          {displayPosts && displayPosts}
        </div>
        {pageCount > 1 && (
          <ReactPaginate
            breakLabel={"..."}
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"flex items-center justify-center gap-8 col-span-1 md:col-span-2 lg:col-span-3 text-base"}
            disabledClassName={"text-muted-foreground"}
            disabledLinkClassName={"cursor-not-allowed"}
            activeClassName={"text-primary"}
          />
        )}
      </section>
    </main>
  )
}

export default PostsClient;