import JuryClient from '@/components/juryClient'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | Jury',
}

const Jury = () => {
  return <JuryClient />
}

export default Jury;