'use client'

import ParticipantPreview from "@/components/participantPreview";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { getParticipants } from "@/sanity/sanity-utils";
import { useQuery } from "@tanstack/react-query";

const Participants = () => {
  const {data, isLoading, isError } = useQuery({
    queryKey: ['participants'],
    queryFn: getParticipants,
  });

  return (
    <main className="flex flex-col md:items-center sm:my-8 gap-8">
      <section className="w-full flex flex-col justify-center items-center gap-8">
        <div className="justify-items-center w-full md:w-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-8 gap-x-4">
          {
            isLoading && [...Array(16)].map((el, i) => (
                <div key={i} className="flex flex-col gap-2 w-full sm:w-10/12 md:w-[300px]">
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
              .slice(0, 16)
              .map(p => <ParticipantPreview key={p.slug} participant={p}/>)
          }
        </div>
      </section>
    </main>
  )
}

export default Participants;