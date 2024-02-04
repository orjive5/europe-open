'use client'

import YoutubeEmbed from "@/components/youtubeEmbed";
import { getParticipant } from "@/sanity/sanity-utils";
import { IParticipantParams } from "@/types/participantParams.interface";
import { useQuery } from "@tanstack/react-query";
import { getYoutubeVideoId } from "@/lib/getYoutubeVideoId";
import ParticipantInfo from "@/components/participantInfo";
import { Skeleton } from "@/components/ui/skeleton";
import ParticipantsGrid from "@/components/participantsGrid";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ParticipantClient = ({ params }: IParticipantParams) => {

  const { data, isLoading, isError } = useQuery(
    ['participant_2023', params.participant],
    () => getParticipant(params.participant),
  );

  return (
    <main className="w-5/6 gap-8 flex flex-col justify-center items-center">
      {
        isLoading && (
          <div className="flex flex-col 2xl:flex-row w-full 2xl:h-[500px] justify-center items-center gap-8">
            <Skeleton className="aspect-video rounded w-full 2xl:w-auto 2xl:h-full" />
            <Skeleton className="min-h-[500px] md:min-h-[434px] 2xl:h-full w-full" />
          </div>
        )
      }
      {
        isError && <h2>Something went wrong...</h2>
      }
      {
        data && (
          <>
            <section className="w-full flex flex-col 2xl:flex-row 2xl:h-[500px] justify-center items-center gap-8">
              <YoutubeEmbed embedId={getYoutubeVideoId(data.youtube_link)} />
              <ParticipantInfo participant={data} />
            </section>
            <section className="w-full flex flex-col items-center gap-8">
              <ParticipantsGrid heading={`LATEST PARTICIPANTS - ${data.discipline[0].toUpperCase()}`} discipline={data.discipline[0]} />
              <Link href='/participants'>
                <Button>
                  Browse Participants
                </Button>
              </Link>
            </section>
          </>
        )
      }
    </main>
  )
}

export default ParticipantClient;