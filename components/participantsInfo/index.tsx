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

const ParticipantsInfo = ({participant}: IParticipantsInfo) => {
  return (
    <Card className="h-full w-[400px]">
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
        <CardTitle>
          {participant.name_and_surname}
        </CardTitle>
        <CardDescription>
          {participant.discipline}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}

export default ParticipantsInfo;