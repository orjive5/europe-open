import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAwards } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | Awards',
}

const Awards = async () => {
  const awards = await getAwards();

  return (
    <section className="flex flex-col justify-center items-center">
      <Card className="w-full lg:p-8 flex flex-col justify-center items-center text-justify">
        <CardHeader>
          <CardTitle className="text-center">
            Awards
          </CardTitle>
          <CardDescription className="text-center">
            Europe Open Online Music Competition
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-8">
          <Accordion type="single" collapsible className="w-full md:w-[600px]">
            {awards.map((item, index, ar) => (
              <AccordionItem className={`${index === ar.length - 1 && 'border-b-0'}`} key={item.title} value={`item-${index}`}>
                <AccordionTrigger className="text-justify gap-8">
                  {index + 1}. {item.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-justify">
                    <PortableText value={item.content} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  )
}

export default Awards;