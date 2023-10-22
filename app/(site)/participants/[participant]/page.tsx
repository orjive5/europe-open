'use client'

import YoutubeEmbed from "@/components/youtubeEmbed";
import { getParticipant } from "@/sanity/sanity-utils";
import { IParticipantParams } from "@/types/participantParams.interface";
import { useQuery } from "@tanstack/react-query";
import { getYoutubeVideoId } from "@/lib/getYoutubeVideoId";
import ParticipantInfo from "@/components/participantInfo";
import { Skeleton } from "@/components/ui/skeleton";
import ParticipantsGrid from "@/components/participantsGrid";

const Participant = ({params}: IParticipantParams) => {

  const { data, isLoading, isError } = useQuery(
    ['participant_2023', params.participant],
    () => getParticipant(params.participant)
  );

  return (
    <main className="gap-8 flex flex-col justify-center items-center">
      {
        isLoading && (
          <div className="flex flex-col 2xl:flex-row w-full lg:w-3/4 2xl:h-[500px] justify-center items-center gap-8">
            <Skeleton className="aspect-video rounded w-full 2xl:w-auto 2xl:h-full" />
            <Skeleton className="min-h-[700px] md:min-h-[434px] 2xl:h-full w-full 2xl:w-[400px]" />
          </div>
        )
      }
      {
        isError && <h2>Something went wrong...</h2>
      }
      {
        data && (
            <section className="w-full lg:w-5/6 flex flex-col 2xl:flex-row 2xl:h-[500px] justify-center items-center gap-8">
              <YoutubeEmbed embedId={getYoutubeVideoId(data.youtube_link)} />
              <ParticipantInfo participant={data} />
            </section>
        )
      }
      <section className="w-5/6">
        <ParticipantsGrid heading="Latest participants"/>
      </section>
    </main>
  )
}

export default Participant;