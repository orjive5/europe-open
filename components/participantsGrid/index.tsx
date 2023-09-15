'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getParticipants_2023 } from "@/sanity/sanity-utils";
import { useQuery } from "@tanstack/react-query";

const ParticipantsGrid = () => {
  let participants_2023 = useQuery({
    queryKey: ['participants_2023'],
    queryFn: getParticipants_2023,
  })

  const displayParticipants = participants_2023.data?.slice(0,8).map((participant, i) => (
    <div key={participant.name_and_surname+i} className="flex flex-col gap-2 w-full md:w-[300px]">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/placeholder_dog.avif"
          alt="Europe Open logo"
          priority={true}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover"
        />
      </AspectRatio>
      <div>
        <h2 className="font-medium">
          {participant.name_and_surname}
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h3 className="text-muted-foreground">Serbia</h3>
          </div>
          <Badge className="text-muted-foreground" variant="outline">
            {participant.discipline[0]}
          </Badge>
        </div>
      </div>
    </div>
  ))

  return (
    <section className="w-full flex flex-col justify-center items-center gap-8">
      <h1 className="sm:text-xl font-medium">
        Participants
      </h1>
      <div className="w-full md:w-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-8 gap-x-4">
        {
          participants_2023.isLoading && <h1 className="text-center">Loading...</h1>
        }
        {
          participants_2023 && displayParticipants
        }
      </div>
      <Link href='participants'>
        <Button>
          Browse Participants
        </Button>
      </Link>
     
    </section>
  )
}

export default ParticipantsGrid;