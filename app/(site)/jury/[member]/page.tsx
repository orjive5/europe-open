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
import { getJuryMember } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface IJuryParams {
  params: {
    member: string
  }
}

const JuryMember = ({params}: IJuryParams) => {
  const { data, isLoading, isError } = useQuery(
    ['jury_member', params.member],
    () => getJuryMember(params.member)
  );

  return (
    <section className="flex flex-col justify-center items-center">
      {data && (
          <Card className="w-full lg:w-3/4 xl:w-2/3 lg:p-8 flex flex-col justify-center items-center text-justify">
            <section>
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
              <h2>{data.name_and_surname}</h2>
              <h3>{data.institution}</h3>
              <div className="gap-1 flex flex-col justify-between items-start">
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
            <section>
              <PortableText value={data.biography} />
            </section>
          </Card>
        )
      }
    </section>
  )
}
  
export default JuryMember;