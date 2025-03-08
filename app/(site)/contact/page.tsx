import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | Contact',
}

const Contact = () => {
  return (
    <section className="flex flex-col justify-center items-center">
      <Card className="w-full lg:w-3/4 xl:w-2/3 lg:p-8 flex flex-col justify-center items-center text-justify">
        <CardHeader>
          <CardTitle className="text-center">
            Contact
          </CardTitle>
          <CardDescription className="text-center">
            Europe Open Online Music Competition
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center flex flex-col justify-center items-center gap-8">
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Organizer</h2>
              <h3>European Association of Music Educators and Performers & Producer Agency MIR Production</h3>
            </div>
            <p className="font-semibold">www.europecompetition.com</p>
            <p className="font-semibold">admin@musiccompetition.eu</p>
          </div>
          <Separator />
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Producer</h2>
              <h3>MIR Production</h3>
            </div>
            <p className="font-semibold">www.mirproduction.com</p>
          </div>
          <Separator />
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Founding Director</h2>
              <h3>Milomir Dojcinovic</h3>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Office Manager</h2>
              <h3>Ruzica Iva</h3>
            </div>
            <p className="font-semibold">a-moll@musiccompetition.eu</p>
          </div>
          <Separator />
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Assistant</h2>
              <h3>Laura Martelli</h3>
            </div>
            <p className="font-semibold">c-dur@musiccompetition.eu</p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default Contact;