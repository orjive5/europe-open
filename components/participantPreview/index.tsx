import { getYoutubeVideoId } from "@/lib/getYoutubeVideoId";
import { IParticipantPreview } from "@/types/participantPreview.interface";
import Image from "next/image";
import Link from "next/link";
import CountrySection from "../countrySection";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";

const ParticipantPreview = ({participant}: {participant: IParticipantPreview}) => {
  return (
    <Link
      href={`/participants/${participant.slug}`}
      key={participant._id}
      className="group hover:cursor-pointer flex flex-col gap-2 w-full sm:w-10/12 md:w-[300px]"
    >
      <AspectRatio
        className="overflow-hidden rounded-lg"
        ratio={16 / 9}
      >
        <Image
          src={`http://img.youtube.com/vi/${getYoutubeVideoId(participant.youtube_link)}/0.jpg`}
          alt="Participant's preview"
          priority={true}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover"
        />
      </AspectRatio>
      <div className="flex flex-col items-start">
        <h2 className="group-hover:underline font-medium text-start">
          {participant.name_and_surname}
        </h2>
        <div className="text-start gap-1 flex flex-col justify-between items-start">
          <CountrySection participant={participant} />
          <Badge className="text-muted-foreground" variant="outline">
            {participant.discipline[0]}
          </Badge>
        </div>
      </div>
    </Link>
  )
}

export default ParticipantPreview;