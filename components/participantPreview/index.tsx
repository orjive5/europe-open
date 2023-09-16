import { getYoutubeVideoId } from "@/lib/getYoutubeVideoId";
import { IParticipantPreview } from "@/types/participantPreview.interface";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";

const ParticipantPreview = ({participant}: {participant: IParticipantPreview}) => {
  return (
    <Link
      href={`/participants/${participant.slug}`}
      key={participant._id}
      className="group hover:cursor-pointer flex flex-col gap-2 w-full md:w-[300px]"
    >
      <AspectRatio
        className="overflow-hidden rounded-lg"
        ratio={16 / 9}
      >
        <Image
          src={`http://img.youtube.com/vi/${getYoutubeVideoId(participant.video_link)}/0.jpg`}
          alt="Participant's preview"
          priority={true}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-all group-hover:scale-105 rounded-lg object-cover"
        />
      </AspectRatio>
      <div>
        <h2 className="group-hover:underline font-medium">
          {participant.name_and_surname}
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              alt={participant.country}
              src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${participant.country_code}.svg`}
              priority={true}
              width={21}
              height={14}
              className="object-cover rounded-md"
            />
            <h3 className="text-muted-foreground">
              {participant.country}
            </h3>
          </div>
          <Badge className="text-muted-foreground" variant="outline">
            {participant.discipline[0]}
          </Badge>
        </div>
      </div>
    </Link>
  )
}

export default ParticipantPreview;