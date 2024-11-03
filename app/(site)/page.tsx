import Hero from "@/components/hero";
import { MapChart } from "@/components/mapChart";
import { ParticipantsGrid } from "@/components/participantsGrid";
import PostsGrid from "@/components/postsGrid";
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
      <section className="w-5/6 flex flex-col items-center gap-8">
        <PostsGrid heading="AWARDS" href="awards" />
        <Link href='awards'>
          <Button>
            Browse Awards
          </Button>
        </Link>
      </section>
      <section className="w-5/6 flex flex-col items-center gap-8">
        <PostsGrid heading="NEWS" href="news" />
        <Link href='news'>
          <Button>
            Browse News
          </Button>
        </Link>
      </section>
      <MapChart />
    </main>
  )
}

export default Home;