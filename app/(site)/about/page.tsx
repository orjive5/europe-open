import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const About = () => {
    return (
      <section className="flex flex-col justify-center items-center">
        <Card className="w-full lg:w-3/4 xl:w-2/3 lg:p-8 flex flex-col justify-center items-center text-justify">
          <CardHeader>
            <CardTitle className="text-center">
              About
            </CardTitle>
            <CardDescription className="text-center">
              Europe Open Online Music Competition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The European Association of Music Educators and Performers & Producer Agency MIR Production, with the support of the Ministries of Culture and Communications, organizes EUROPE OPEN MUSIC COMPETITION.
              <br />
              <br />
              In 2004. Facebook appeared, in 2006. Twitter. Viber was founded in the beginning of 2010, and Instagram in October of the same year. In 2009, the idea of organizing a music competition that took place entirely online appeared. For the first time in the history of music competitions for pupils of schools, colleges and conservatories, as well as for participants without age restrictions, back in 2010, we combined and organized a competition for all instruments in one place (website) thanks to the Internet. Only at WORLD OPEN MUSIC COMPETITION, as proof, in the archive of the website you can see all the videos and results of the participants since 2010!
              <br />
              <br />
              <b>
                EUROPE OPEN MUSIC COMPETITION is a new format of an online competition, which is held in all nominations for soloists and groups. Having familiarized yourself with the terms and conditions of the competition, you will understand that the EUROPE OPEN MUSIC COMPETITION competition is very convenient and practical for participation!
                <br />
                <br />
                EUROPE OPEN MUSIC COMPETITION has no connection with the WORLD OPEN MUSIC COMPETITION.
              </b>
              <br />
              <br />
              The creator and director of EUROPE OPEN MUSIC COMPETITION is the charismatic and purposeful Mr. Milomir Doјčinović, President of the European Association of Music Educators and Performers & Producer Agency MIR Production, and under his leadership a well-coordinated team of professionals and a number of specialized consultants work.
            </p>
          </CardContent>
        </Card>
      </section>
    )
  }
  
  export default About;