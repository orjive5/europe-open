import React, { Suspense } from 'react'
import ResultsClient from '@/components/resultsClient'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | Results',
}

const Results = () => {
  return (
      <Suspense fallback={<p>Loading...</p>}>
        <ResultsClient />
      </Suspense>
  )
}

export default Results;