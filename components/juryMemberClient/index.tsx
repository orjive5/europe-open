'use client'

import CountrySection from "@/components/countrySection";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { getJuryMember } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface IJuryParams {
  params: {
    member: string
  }
}

const JuryMemberClient = ({params}: IJuryParams) => {
  
  // Get jury member data
  const { data, isLoading, isError } = useQuery(
    ['jury_member', params.member],
    () => getJuryMember(params.member)
  );

  return (
    <section className="w-full flex flex-col justify-center items-center">
      {
        isLoading && (
          <Card className="gap-2 sm:gap-4 w-full p-2 sm:p-4 lg:w-3/4 xl:w-2/3 lg:p-8 flex flex-col sm:flex-row sm:items-start justify-center items-center text-justify">
            <section className="flex flex-col gap-1 w-full sm:w-1/4">
              <AspectRatio
                className="overflow-hidden rounded-lg"
                ratio={1 / 1}
              >
                <Skeleton
                  className="h-full w-full"
                />
              </AspectRatio>
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-full" />
              <div className="gap-1 flex flex-col justify-between items-start">
                <Skeleton className="h-4 w-[150px]" />
                <div className="flex gap-2 flex-wrap">
                  <Skeleton className="h-4 w-[50px]" />
                  <Skeleton className="h-4 w-[50px]" />
                </div>
              </div>
            </section>
            <section className="w-full sm:w-3/4">
              <Skeleton className="h-96 w-full" />
            </section>
          </Card>
        )
      }
      {
        isError && <h2>Something went wrong...</h2>
      }
      {data && (
          <Card className="gap-2 sm:gap-4 w-full p-2 sm:p-4 lg:w-3/4 xl:w-2/3 lg:p-8 flex flex-col sm:flex-row sm:items-start justify-center items-center text-justify">
            <section className="w-full sm:w-1/4">
              <AspectRatio
                className="overflow-hidden rounded-lg"
                ratio={1 / 1}
              >
                <Image
                  src={data.portrait_photo}
                  alt="Jury member portrait"
                  priority={true}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg object-cover"
                />
              </AspectRatio>
              <h2 className="text-start text-lg md:text-2xl font-medium">
                {data.name_and_surname}
              </h2>
              <h3 className="text-start">
                {data.institution}
              </h3>
              <div className="gap-1 flex flex-col justify-between items-start w-full">
                <CountrySection participant={data} />
                <div className="flex gap-2 flex-wrap">
                  {data.discipline?.map(d => (
                    <Badge key={d} className="text-muted-foreground" variant="outline">
                      {d}
                    </Badge>
                  ))}
                </div>
              </div>
            </section>
            <section className="sm:w-3/4">
              <PortableText value={data.biography} />
            </section>
          </Card>
        )
      }
    </section>
  )
}
  
export default JuryMemberClient;