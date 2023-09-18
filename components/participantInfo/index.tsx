import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IParticipantInfo } from "@/types/participantInfo.interface";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "../ui/badge";
import CountrySection from "../countrySection";
import Link from "next/link";

const ParticipantInfo = ({participant}: IParticipantInfo) => {
  
  return (
    <Card className="h-full w-[400px]">
      <ScrollArea className="flex flex-col justify-center items-center h-full w-full rounded-md">
        <CardHeader className="gap-2 w-full flex flex col justify-center items-center">
          {participant.poster_photo && 
            (<div className="relative w-full h-60">
              <Image
                src={participant.poster_photo}
                alt="Participant's preview"
                priority={true}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover"
              />
            </div>)
          }
          <CardTitle className="text-center">
            {participant.name_and_surname}
          </CardTitle>
          <div className="gap-4 w-full flex justify-center items-center">
            <CountrySection participant={participant} />
            <Badge className="text-muted-foreground" variant="outline">
              {participant.discipline}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-center">
          <div>
            <h2 className="font-medium">
              Section:
            </h2>
            <p>
              {participant.category} category, {participant.date_of_birth.slice(0,4)}
            </p>
          </div>
          <div>
            <h2 className="font-medium">
              Teacher:
            </h2>
            <p>
              {participant.teacher_conductor_collective_leader}
            </p>
          </div>
          {participant.accompanist && (<div>
            <h2 className="font-medium">
              Accompanist:
            </h2>
            <p>
              {participant.accompanist}
            </p>
          </div>)}
          <div>
            <h2 className="font-medium">
              Institution, place and country:
            </h2>
            <p>
              {participant.institution_city_country}
            </p>
          </div>
          <div>
            <h2 className="font-medium">
              Program:
            </h2>
            <p>
              {participant.program}
            </p>
          </div>
        </CardContent>
        {participant.biography && (
          <CardFooter className="flex justify-center items-center">
            <p>Download participant's biography</p>
            &nbsp;
            <Link
              target="_blank"
              rel="noreferrer"
              download
              href={`${participant.biography}?dl=`}
              className='font-medium underline'
            >
                here
            </Link>
          </CardFooter>
        )}
      </ScrollArea>
    </Card>
  )
}

export default ParticipantInfo;