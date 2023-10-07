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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ParticipantInfo = ({participant}: IParticipantInfo) => {
  return (
    <Card className="h-full w-full 2xl:w-[400px]">
      <ScrollArea className="flex justify-center items-center h-full w-full rounded-md">
        <div className="flex flex-col md:flex-row 2xl:flex-col items-start justify-center">
          <CardHeader className="gap-2 w-full md:w-auto 2xl:w-full flex flex-col justify-center items-center">
            {participant.poster_photo &&
              (<div className="relative w-full h-72 sm:w-2/3 md:w-44 2xl:w-full md:h-60">
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
            <CardTitle className="text-lg md:text-2xl text-center">
              {participant.name_and_surname}
            </CardTitle>
            <div className="gap-2 2xl:gap-4 2xl:w-full flex flex-col 2xl:flex-row justify-center items-center">
              <CountrySection participant={participant} />
              <Badge className="text-muted-foreground" variant="outline">
                {participant.discipline}
              </Badge>
            </div>
          </CardHeader>
          <div className="w-full">
            <CardContent className="flex-grow md:mt-6 2xl:mt-0 flex flex-col gap-2 text-center">
              <Accordion className="w-full" type="single" collapsible>
                <AccordionItem className="border-0" value="performance">
                  <AccordionTrigger className="font-medium w-full">
                    Performance details
                  </AccordionTrigger>
                  <AccordionContent className="text-justify">
                    <div className="flex flex-col gap-4">
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
                          {participant.teacher}
                        </p>
                      </div>
                      {participant.accompanist && (
                      <div>
                        <h2 className="font-medium">
                          Accompanist:
                        </h2>
                        <p>
                          {participant.accompanist}
                        </p>
                      </div>)}
                      {participant.conductor && (
                      <div>
                        <h2 className="font-medium">
                          Conductor:
                        </h2>
                        <p>
                          {participant.conductor}
                        </p>
                      </div>)}
                      {participant.collective_leader && (
                        <div>
                          <h2 className="font-medium">
                            Collective leader:
                          </h2>
                          <p>
                            {participant.collective_leader}
                          </p>
                        </div>)}
                      {participant.institution && (
                        <div>
                          <h2 className="font-medium">
                            Institution:
                          </h2>
                          <p>
                            {participant.institution}
                          </p>
                        </div>)}
                      <div>
                        <h2 className="font-medium">
                          Program:
                        </h2>
                        <p>
                          {participant.program}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            {participant.biography && (
              <CardFooter className="flex flex-col text-center justify-center items-center">
                <Accordion className="w-full" type="single" collapsible>
                  <AccordionItem className="border-0" value="biography">
                    <AccordionTrigger className="font-medium w-full">
                      Participant's biography
                    </AccordionTrigger>
                    <AccordionContent className="text-justify">
                      {participant.biography}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
            )}
          </div>
        </div>
      </ScrollArea>
    </Card>
  )
}

export default ParticipantInfo;