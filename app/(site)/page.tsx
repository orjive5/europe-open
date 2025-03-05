import Hero from "@/components/hero";
import { MapChart } from "@/components/mapChart";
import { ParticipantsSection } from "@/components/participantsSection";
import { AwardsSection } from "@/components/awardsSection";
import { NewsSection } from "@/components/newsSection";

const Home = () => {
  return (
    <main className="flex flex-col items-center sm:my-8 gap-8">
      <Hero />
      <ParticipantsSection />
      <AwardsSection />
      <NewsSection />
      <MapChart />
    </main>
  )
}

export default Home;