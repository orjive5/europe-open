import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IParticipantsInfo } from "@/types/participantsInfo.interface";
import { User } from "lucide-react"
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "../ui/badge";

const ParticipantsInfo = ({participant}: IParticipantsInfo) => {
  return (
    <Card className="h-full w-[400px]">
      <ScrollArea className="flex flex-col justify-center items-center h-full w-full rounded-md">
        <CardHeader className="gap-2 w-full flex flex col justify-center items-center">
          {participant.poster_photo ? 
            (<div className="relative w-full h-60">
              <Image
                src={participant.poster_photo}
                alt="Participant's preview"
                priority={true}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover"
              />
            </div>) : (
              <div className="w-12 h-12 bg-muted rounded-full p-2">
                <User className="w-full h-full" />
              </div>
            )
          }
          <CardTitle className="text-center">
            {participant.name_and_surname}
          </CardTitle>
          <CardDescription className="gap-4 w-full flex justify-center items-center">
            <Badge className="text-muted-foreground" variant="outline">
              {participant.discipline}
            </Badge>
            <div className="flex items-center gap-2">
              <Image
                alt={participant.country}
                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${participant.country_code}.svg`}
                priority={true}
                width={21}
                height={14}
                className="object-cover rounded-md"
              />
              <h3 className="text-muted-foreground">
                {participant.country}, {participant.place}
              </h3>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-center">
            Section: {participant.category} category
          </h2>
          <h2 className="text-center">
            Date of birth: {participant.date_of_birth.slice(0,4)}
          </h2>
          <h2 className="text-center">
            Teacher: {participant.teacher_conductor_collective_leader}
          </h2>
          <h2 className="text-center">
            Accompanist: {participant.accompanist}
          </h2>
          <h2 className="text-center">
            Institution,place and country: {participant.institution_city_country}
          </h2>
          <h2 className="text-center">
            Program: {participant.program}
          </h2> 
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          card footer
        </CardFooter>
      </ScrollArea>
    </Card>
  )
}

export default ParticipantsInfo;