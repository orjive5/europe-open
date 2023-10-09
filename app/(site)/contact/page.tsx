import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Mail, Smartphone} from 'lucide-react'

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
          <CardContent className="flex gap-8">
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="flex gap-2">
                <Mail />
                <h2>Email</h2>
              </div>
              <p className="font-medium">admin@musiccompetition.rs</p>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="flex gap-2">
                <Smartphone />
                <h2>Phone/WhatsApp</h2>
              </div>
              <p className="font-medium">+381 64 064 81 47</p>
            </div>
          </CardContent>
          <CardFooter>
            <p className="font-medium">European Association of Music Educators and Performers & Producer Agency MIR Production</p>
          </CardFooter>
        </Card>
      </section>
    )
  }
  
  export default Contact;