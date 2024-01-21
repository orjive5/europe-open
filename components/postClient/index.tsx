'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { getAward } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import ReactPlayer from "react-player";
import { PostImage } from "../postImage";

const PostClient = ({ params }: any) => {

  const { data, isLoading, isError } = useQuery(
    ['award', params],
    () => getAward(params.award)
  );

  return (
    <section className="w-full flex flex-col justify-center items-center">
      {
        isLoading && (
          <Card className="gap-2 sm:gap-4 w-full p-2 sm:p-4 lg:w-3/4 xl:w-2/3 lg:p-8">
            <CardHeader className="w-full text-center flex justify-center items-center gap-2 sm:gap-4">
              <div className="flex flex-col justify-center items-center gap-2 w-full">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <div className='rounded relative w-2/3 h-[500px]'>
                <Skeleton className="h-full w-full" />
              </div>
            </CardHeader>
            <CardContent className="text-justify w-full">
              <Skeleton className="h-96 w-full" />
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
          </Card>
        )
      }
      {
        isError && <h2>Something went wrong...</h2>
      }
      {data && (
        <Card className="gap-2 sm:gap-4 w-full p-2 sm:p-4 lg:w-3/4 xl:w-2/3 lg:p-8">
          <CardHeader className="w-full text-center flex justify-center items-center gap-2 sm:gap-4">
            <div>
              <CardTitle className="text-4xl font-semibold">{data.title}</CardTitle>
              <CardDescription className="text-xl">{data.description}</CardDescription>
            </div>
            <div className='rounded relative w-2/3 h-[500px]'>
              <Image
                src={data.image}
                width="0"
                height="0"
                sizes="100vw"
                className="w-auto h-full rounded object-cover object-top box-border overflow-hidden"
                alt="Separator image"
              />
            </div>
          </CardHeader>
          <CardContent className="styled-link-parent text-justify w-full">
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
                      <div className="my-2 sm:my-4 w-full flex justify-center items-center">
                        <ReactPlayer url={url} />
                      </div>)
                  }
                },
              }}
              value={data.content}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
          </CardFooter>
        </Card>
      )
      }
    </section>
  )
}

export default PostClient;