import Image from 'next/image';

const HeroImage = () => {
  return (
    <section className='relative w-full md:w-2/3 xl:w-[600px]'>
      <Image
        src={'/hero.png'}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-auto rounded"
        alt="Hero banner"
      />
    </section>
  )
}

export default HeroImage;