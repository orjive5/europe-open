import { IJury } from "@/types/jury.interface";
import Image from "next/image";
import Link from "next/link";
import CountrySection from "../countrySection";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";

const JuryPreview = ({member, landingPage}: {member: IJury, landingPage?: boolean}) => {
  return (
    <Link
      href={`/jury/${member.slug}`}
      key={member._id}
      className={`group hover:cursor-pointer flex flex-col gap-2 ${landingPage ? '' : 'sm:w-10/12 md:w-[300px]'} w-full`}
    >
      <AspectRatio
        className="overflow-hidden rounded-lg"
        ratio={1 / 1}
      >
        <Image
          src={member.portrait_photo}
          alt="Jury member preview"
          priority={true}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover"
        />
      </AspectRatio>
      <section className="flex flex-col gap-2">
        <div>
          <h2 className="group-hover:underline font-medium">
            {member.name_and_surname}
          </h2>
          <h3 className="text-muted-foreground">
            {member.institution}
          </h3>
        </div>
        <div className="gap-1 flex flex-col justify-between items-start">
          <CountrySection participant={member} />
          <div className="flex gap-2 flex-wrap">
            {member.discipline.map(d => (
              <Badge key={d} className="text-muted-foreground" variant="outline">
                {d}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </Link>
  )
}

export default JuryPreview;