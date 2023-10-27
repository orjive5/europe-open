'use client'

import { useTheme } from 'next-themes';
import Image from 'next/image';

const SeparatorImage = () => {
  const {theme} = useTheme();
  return (
    <div className='relative w-full xl:w-[900px]'>
        <Image
            src={`${theme === 'dark' ? "/separatorDark.png" : '/separatorLight.png'}`}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded"
            alt="Separator image"
        />
    </div>
  )
}

export default SeparatorImage;