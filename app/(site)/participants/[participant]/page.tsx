
import React from 'react'
import { Metadata } from "next";
import ParticipantClient from '@/components/participantClient';
import { IParticipantParams } from '@/types/participantParams.interface';

export const metadata: Metadata = {
  title: 'Europe Open | Participant',
}

const Participant = ({params}: IParticipantParams) => {
  return <ParticipantClient params={params} />
}

export default Participant;