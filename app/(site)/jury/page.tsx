import React, { Suspense } from 'react'
import JuryClient from '@/components/juryClient'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | Jury',
}

const Jury = () => {
  return (
      <Suspense fallback={<p>Loading...</p>}>
        <JuryClient />
      </Suspense>
  )
}

export default Jury;