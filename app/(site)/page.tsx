import ParticipantsGrid from "@/components/participantsGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col md:items-center sm:my-8 gap-8">
      <section className="flex flex-col items-center gap-8">
        <ParticipantsGrid heading="Participants"/>
        <Link href='participants'>
          <Button>
            Browse Participants
          </Button>
        </Link>
      </section>
    </main>
  )
}

export default Home;