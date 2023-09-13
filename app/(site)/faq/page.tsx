import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaqs } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";

const Faq = async () => {

  const faqs = await getFaqs();

  return (
    <div className="sm:my-8 gap-8 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="sm:text-xl font-medium">
          Frequently Asked Questions
        </h1>
        <p className="my-2 text-center">
          Find answers to commonly asked questions
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full md:w-[600px]">
        {faqs.map((faq, index) =>  (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger className="text-justify gap-8">
                {index+1}. {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-justify">
                  <PortableText value={faq.answer} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
    </div>
  )
}
  
export default Faq;