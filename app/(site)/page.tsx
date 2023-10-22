import Hero from "@/components/hero";
import { MapChart } from "@/components/mapChart";
import ParticipantsGrid from "@/components/participantsGrid";
import SeparatorImage from "@/components/separatorImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col items-center sm:my-8 gap-8">
        <Hero />
        <section className="w-5/6 flex flex-col items-center gap-8">
          <ParticipantsGrid heading="Participants"/>
          <Link href='participants'>
            <Button>
              Browse Participants
            </Button>
          </Link>
          <SeparatorImage />
        </section>
        <MapChart />
    </main>
  )
}

export default Home;