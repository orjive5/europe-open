import ParticipantsClient from '@/components/participantsClient'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | Participants',
}

const Participants = () => {
  return <ParticipantsClient />
}

export default Participants;