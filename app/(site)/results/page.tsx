import ResultsClient from '@/components/resultsClient'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | Results',
}

const Results = () => {
  return <ResultsClient />
}

export default Results;