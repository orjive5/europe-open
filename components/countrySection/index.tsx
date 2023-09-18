import Image from 'next/image';

const CountrySection = ({participant}: any) => {
  return (
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
            {participant.country}, {participant.place}
        </h3>
    </div>
  )
}

export default CountrySection;