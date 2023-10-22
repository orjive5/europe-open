'use client'

import { getParticipants } from "@/sanity/sanity-utils";
import { useQuery } from "@tanstack/react-query";
import ParticipantPreview from "../participantPreview";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "../ui/aspect-ratio";

const ParticipantsGrid = ({heading}: {heading: string}) => {
  const {data, isLoading, isError } = useQuery({
    queryKey: ['participants'],
    queryFn: getParticipants,
  });

  return (
    <section className="w-full flex flex-col justify-center items-center gap-8">
      <h1 className="sm:text-xl font-medium">
        {heading}
      </h1>
      <div className="justify-items-center w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-8 gap-x-4">
        {
          isLoading && [...Array(8)].map((el, i) => (
              <div key={i} className="flex flex-col gap-2 w-full sm:w-10/12 md:w-[300px]">
                <AspectRatio 
                  className="overflow-hidden rounded-lg"
                  ratio={16 / 9}
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
            .slice(0,8)
            .map(p => <ParticipantPreview key={p.slug} participant={p} />)
        }
      </div>
    </section>
  )
}

export default ParticipantsGrid;