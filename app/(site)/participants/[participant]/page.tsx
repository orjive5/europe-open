'use client'

import YoutubeEmbed from "@/components/youtubeEmbed";
import { getParticipant } from "@/sanity/sanity-utils";
import { IParticipantParams } from "@/types/participantParams.interface";
import { useQuery } from "@tanstack/react-query";
import { getYoutubeVideoId } from "@/lib/getYoutubeVideoId";
import ParticipantsInfo from "@/components/participantsInfo";

const Participant = ({params}: IParticipantParams) => {
  console.log(params.participant);
  const { data, isLoading, isError } = useQuery(
    ['participant_2023', params.participant],
    () => getParticipant(params.participant)
  );

  return (
    <main className="flex flex-col justify-center items-center">
      {
        isLoading && <h2>Loading...</h2>
      }
      {
        isError && <h2>Something went wrong...</h2>
      }
      {
        data && (
          <section className="flex justify-center items-center gap-8">
            <YoutubeEmbed embedId={getYoutubeVideoId(data.youtube_link)} />
            <ParticipantsInfo />
          </section>
        )
      }
    </main>
  )
}

export default Participant;