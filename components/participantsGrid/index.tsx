'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { getParticipants } from "@/sanity/sanity-utils";
import { useQuery } from "@tanstack/react-query";
import ParticipantPreview from "../participantPreview";

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
          isLoading && 
            <h2 className="text-center">
              Loading...
            </h2>
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
            .map(p => <ParticipantPreview participant={p}/>)
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