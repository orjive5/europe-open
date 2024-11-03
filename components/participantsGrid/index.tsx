'use client'

import { getParticipants } from "@/sanity/sanity-utils";
import { useQuery } from "@tanstack/react-query";
import ParticipantPreview from "../participantPreview";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IParticipantData } from "@/types/participantData.interface";
import { getUniqueCountryElements } from "./utils";
import { ParticipantsSkeleton } from "./components/Skeleton";

type TProps = {
  heading?: string;
  discipline?: string;
  isText?: boolean;
}

export const ParticipantsGrid = (props: TProps) => {
  const { heading, discipline, isText } = props;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['participants'],
    queryFn: getParticipants,
  });

  const [sortedData, setSortedData] = useState<IParticipantData[]>([]);

  useEffect(() => {
    if (data) {
      if (discipline) {
        setSortedData(data.filter(item => item.discipline[0] === discipline).slice(0, 8))
      } else {
        setSortedData(getUniqueCountryElements(data))
      }
    }

  }, [data]);

  return (
    <section className="w-full flex flex-col justify-center items-center gap-8">
      {isText ? (
        <h2 className="sm:text-xl font-medium">
          {heading}
        </h2>) : (
        <Link href='/participants'>
          <h2 className="sm:text-xl font-medium hover:underline">
            {heading}
          </h2>
        </Link>)}
      <div className="justify-items-center w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-8 gap-x-4">
        {
          isLoading && [...Array(8)].map((item, index) => (
            <ParticipantsSkeleton key={index} />
          ))
        }
        {
          isError &&
          <h2 className="text-center">
            Something went wrong...
          </h2>
        }
        {
          sortedData.length > 0 && (
            sortedData.map(item => <ParticipantPreview key={item.slug} participant={item} />)
          )
        }
      </div>
    </section>
  )
}