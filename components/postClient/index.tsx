'use client'

import { useAwardQuery, useNewsArticleQuery } from "@/app/queries/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import ReactPlayer from "react-player";
import { PostImage } from "../postImage";

const PostClient = ({ params, postType }: any) => {

  let query = useAwardQuery;

  if (postType === "awards") {
    query = useAwardQuery;
  }

  if (postType === "news_article") {
    query = useNewsArticleQuery
  }

  // Get posts data
  const { data, isLoading, isError } = query({ params });

  data && console.log(data)

  return (
    <section className="w-full flex flex-col justify-center items-center">
      {
        isLoading && (
          <Card className="flex flex-col gap-2 sm:gap-4 w-full p-2 sm:p-4 lg:w-3/4 xl:w-2/3 lg:p-8">
            <CardHeader className="w-full text-center flex justify-center items-center gap-2 sm:gap-4 p-0">
              <div className="flex flex-col justify-center items-center gap-2 w-full">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <div className='rounded relative w-full h-screen'>
                <Skeleton className="h-full w-full" />
              </div>
            </CardHeader>
            <CardContent className="styled-link-parent text-justify w-full flex flex-col justify-center items-start p-0">
              <CardContent className="text-justify w-full">
                <Skeleton className="h-96 w-full" />
              </CardContent>
            </CardContent>
          </Card>
        )
      }
      {
        isError && <h2>Something went wrong...</h2>
      }
      {data && (
        <Card className="flex flex-col gap-2 sm:gap-4 w-full p-2 sm:p-4 lg:w-3/4 xl:w-2/3 lg:p-8">
          <CardHeader className="w-full text-center flex justify-center items-center gap-2 sm:gap-4 p-0">
            <div>
              <CardTitle className="text-4xl font-semibold">{data.title}</CardTitle>
              <CardDescription className="text-xl">{data.description}</CardDescription>
            </div>
            <div className='rounded relative w-full h-auto'>
              <Image
                src={data.image}
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-full rounded object-cover object-top box-border overflow-hidden"
                alt="Separator image"
              />
            </div>
          </CardHeader>
          <CardContent className="styled-link-parent text-justify w-full flex flex-col justify-center items-start p-0">
            <PortableText
              components={{
                types: {
                  image: ({ value }) => {
                    return (
                      <div className="my-2 sm:my-4 flex justify-center items-center">
                        <PostImage value={value} />
                      </div>
                    )
                  },
                  youtube: ({ value }) => {
                    const { url } = value;
                    return (
                      <div className="rounded my-2 sm:my-4 w-full sm:w-2/3">
                        <ReactPlayer width="100%" url={url} />
                      </div>)
                  },
                  break: ({ value }) => value.style === "break" ? <br /> : null
                },
              }}
              value={data.content}
            />
          </CardContent>
        </Card>
      )
      }
    </section>
  )
}

export default PostClient;