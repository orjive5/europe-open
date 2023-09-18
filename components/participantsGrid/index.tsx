'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { getParticipants } from "@/sanity/sanity-utils";
import { useQuery } from "@tanstack/react-query";
import ParticipantPreview from "../participantPreview";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "../ui/aspect-ratio";

const ParticipantsGrid = () => {
  const {data, isLoading, isError } = useQuery({
    queryKey: ['participants'],
    queryFn: getParticipants,
  });

  return (
    <section className="w-full flex flex-col justify-center items-center gap-8">
      <h1 className="sm:text-xl font-medium">
        Participants
      </h1>
      <div className="w-full md:w-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-8 gap-x-4">
        {
          isLoading && [...Array(8)].map((el, i) => (
              <div key={i} className="flex flex-col gap-2 w-full md:w-[300px]">
                <AspectRatio 
                  className="overflow-hidden rounded-lg"
                  ratio={16 / 9}
                >
                  <Skeleton
                    className="h-full w-full"
                  />
                </AspectRatio>
                <Skeleton className="h-4 w-[200px]" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[50px]" />
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
            .slice(0,8)
            .map(p => <ParticipantPreview key={p.slug} participant={p}/>)
        }
      </div>
      <Link href='participants'>
        <Button>
          Browse Participants
        </Button>
      </Link>
    </section>
  )
}

export default ParticipantsGrid;