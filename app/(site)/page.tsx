import Hero from "@/components/hero";
import { MapChart } from "@/components/mapChart";
import ParticipantsGrid from "@/components/participantsGrid";
import PostsGrid from "@/components/postsGrid";
import SeparatorImage from "@/components/separatorImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col items-center sm:my-8 gap-8">
      <Hero />
      <section className="w-5/6 flex flex-col items-center gap-8">
        <ParticipantsGrid heading="PARTICIPANTS" />
        <Link href='participants'>
          <Button>
            Browse Participants
          </Button>
        </Link>
      </section>
      <SeparatorImage />
      <section className="w-5/6 flex flex-col items-center gap-8">
        <PostsGrid heading="AWARDS" href="awards" />
        <Link href='awards'>
          <Button>
            Browse Awards
          </Button>
        </Link>
      </section>
      <section className="styled-link-parent w-5/6 flex flex-col items-center gap-8">
        <Link
          href='https://arhiv.musiccompetition.eu/arhiv/'
          rel="noopener noreferrer"
          target="_blank"
          className="sm:text-xl font-medium hover:underline"
        >
          ARCHIVE is the place where champions live!
        </Link>
        <Link
          href='https://musiccompetition.eu/preporuka-za-snimanje-videa/'
          rel="noopener noreferrer"
          target="_blank"
          className="sm:text-xl font-medium hover:underline"
        >
          MAKE A BEAUTIFUL AND HIGH-QUALITY VIDEO - RECOMMENDATIONS!
        </Link>
      </section>
      <MapChart />
    </main>
  )
}

export default Home;