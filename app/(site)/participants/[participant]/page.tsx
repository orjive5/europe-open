'use client'

import YoutubeEmbed from "@/components/youtubeEmbed";
import { getParticipant } from "@/sanity/sanity-utils";
import { IParticipantParams } from "@/types/participantParams.interface";
import { useQuery } from "@tanstack/react-query";

const Participant = ({params}: IParticipantParams) => {
  console.log(params.participant);
  const { data, isLoading, isError } = useQuery(
    ['participant_2023', params.participant],
    () => getParticipant(params.participant)
  );

  return (
    <main>
      <YoutubeEmbed embedId="qX4LC1HBmag" />
    </main>
  )
}

export default Participant;