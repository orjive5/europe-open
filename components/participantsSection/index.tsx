import { ParticipantsGrid } from "@/components/participantsGrid";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const ParticipantsSection = () => {
    return (
        <section className="w-5/6 flex flex-col items-center gap-8">
            <ParticipantsGrid heading="Participants" />
            <Link href='participants'>
                <Button>
                    Browse Participants
                </Button>
            </Link>
        </section>
    )
}