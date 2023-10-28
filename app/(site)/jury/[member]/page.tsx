import JuryMemberClient from '@/components/juryMemberClient'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | Jury Member',
}

interface IJuryParams {
  params: {
    member: string
  }
}

const JuryMember = ({params}: IJuryParams) => {
  return <JuryMemberClient params={params} />
}

export default JuryMember;