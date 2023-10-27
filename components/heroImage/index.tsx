'use client'

import { useTheme } from 'next-themes';
import Image from 'next/image';

const HeroImage = () => {
  const { theme } = useTheme();
  return (
    <div className='relative w-full md:w-2/3 xl:w-[600px]'>
        <Image
            src={`${theme === 'dark' ? "/heroDark.png" : '/heroLight.png'}`}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded"
            alt="Hero banner"
        />
    </div>
  )
}

export default HeroImage;