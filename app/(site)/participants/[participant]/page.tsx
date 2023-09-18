'use client'

import YoutubeEmbed from "@/components/youtubeEmbed";
import { getParticipant } from "@/sanity/sanity-utils";
import { IParticipantParams } from "@/types/participantParams.interface";
import { useQuery } from "@tanstack/react-query";
import { getYoutubeVideoId } from "@/lib/getYoutubeVideoId";
import ParticipantInfo from "@/components/participantInfo";
import { Skeleton } from "@/components/ui/skeleton";

const Participant = ({params}: IParticipantParams) => {

  const { data, isLoading, isError } = useQuery(
    ['participant_2023', params.participant],
    () => getParticipant(params.participant)
  );

  return (
    <main className="flex flex-col justify-center items-center">
      {
        isLoading && (
          <div className="h-[500px] w-full flex justify-center items-center gap-8">
            <Skeleton className="aspect-video relative rounded h-full"/>
            <Skeleton className="h-full w-[400px]"/>
          </div>
        )
      }
      {
        isError && <h2>Something went wrong...</h2>
      }
      {
        data && (
          <section className="h-[500px] flex justify-center items-center gap-8">
            <YoutubeEmbed embedId={getYoutubeVideoId(data.youtube_link)} />
            <ParticipantInfo participant={data} />
          </section>
        )
      }
    </main>
  )
}

export default Participant;