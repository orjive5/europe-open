import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { getCollectivesRules, getCollectivesTimetable, getSoloistsRules, getSoloistsTimetable } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | Rules',
}

export const revalidate = 60;

const Rules = async () => {

  const soloistsRules = await getSoloistsRules();
  const soloistsTimetable = await getSoloistsTimetable();
  const soloistsTimetableGeneral = soloistsTimetable.find(item => item.title === 'GENERAL')?.content;
  const soloistsTimetableEditions = soloistsTimetable.filter(item => item.title !== 'GENERAL')
  const collectivesRules = await getCollectivesRules();
  const collectivesTimetable = await getCollectivesTimetable();
  const collectivesTimetableGeneral = collectivesTimetable.find(item => item.title === 'GENERAL')?.content;
  const collectivesTimetableEditions = collectivesTimetable.filter(item => item.title !== 'GENERAL')

  return (
    <section className="flex flex-col justify-center items-center">
      <Card className="lg:p-8 flex flex-col justify-center items-center text-justify">
        <CardHeader>
          <CardTitle className="text-center">
            Rules and regulations for all nominations
          </CardTitle>
          <CardDescription className="max-w-[600px] text-center">
            Europe Open Online Music Competition is held completely online, in such form where the jury views of video recordings of participants' performances. Performers from all over the world are invited to participate in the competition. The competition is held annually, applications are accepted 365 days a year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="soloists" className="w-full flex flex-col justify-center items-center">
            <TabsList>
              <TabsTrigger value="soloists">
                Soloists
              </TabsTrigger>
              <TabsTrigger value="collectives">
                Collectives
              </TabsTrigger>
            </TabsList>
            <TabsContent value="soloists">
              <Accordion type="multiple" className="w-full md:w-[600px]">
                <AccordionItem value="soloists_timetable">
                  <AccordionTrigger className="text-justify gap-8">
                    Timetable
                  </AccordionTrigger>
                  <AccordionContent className="text-justify styled-link-parent">
                    {
                      <PortableText value={soloistsTimetableGeneral as any} />
                    }
                    {soloistsTimetableEditions.map((rule, index, ar) => (
                      <AccordionItem className={`ml-4 ${index === ar.length - 1 && 'border-b-0'}`} key={`${index}-${rule.title}-soloists`} value={`${index}-${rule.title}-soloists`}>
                        <AccordionTrigger className="text-justify gap-8">
                          {rule.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-justify styled-link-parent">
                          <PortableText value={rule.content} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                {soloistsRules.map((rule, index, ar) => (
                  <AccordionItem className={`${index === ar.length - 1 && 'border-b-0'}`} key={`${index}-${rule.title}-soloists`} value={`${index}-${rule.title}-soloists`}>
                    <AccordionTrigger className="text-justify gap-8">
                      {rule.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-justify styled-link-parent">
                      <PortableText value={rule.content} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            <TabsContent value="collectives">
              <Accordion type="multiple" className="w-full md:w-[600px]">
                <AccordionItem value="soloists_timetable">
                  <AccordionTrigger className="text-justify gap-8">
                    Timetable
                  </AccordionTrigger>
                  <AccordionContent className="text-justify styled-link-parent">
                    {
                      <PortableText value={collectivesTimetableGeneral as any} />
                    }
                    {collectivesTimetableEditions.map((rule, index, ar) => (
                      <AccordionItem className={`ml-4 ${index === ar.length - 1 && 'border-b-0'}`} key={`${index}-${rule.title}-soloists`} value={`${index}-${rule.title}-soloists`}>
                        <AccordionTrigger className="text-justify gap-8">
                          {rule.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-justify styled-link-parent">
                          <PortableText value={rule.content} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                {collectivesRules.map((rule, index, ar) => (
                  <AccordionItem className={`${index === ar.length - 1 && 'border-b-0'}`} key={`${index}-${rule.title}-collectives`} value={`${index}-${rule.title}-collectives`}>
                    <AccordionTrigger className="text-justify gap-8">
                      {rule.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-justify styled-link-parent">
                      <PortableText value={rule.content} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}

export default Rules;