import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from '../ui/aspect-ratio';
import { Button } from '../ui/button';

const Hero = () => {

    return (
        <section className="w-10/12 flex justify-center items-center gap-8">
            <div className='w-1/2 flex flex-col text-start gap-8'>
                <h2 className='text-4xl'>
                    <span className='font-bold text-8xl'>Europe Open </span>
                    <br/>
                    Online Music Competition
                </h2>
                <p>
                    Send a video of your performance to compete with peers from all around the world and receive evaluations from a panel of professionals representing some of the most prestigious musical institutions.
                </p>
                <p className='font-medium text-xl'>
                    Applications are being accepted now!
                </p>
                <div className='flex gap-4'>
                    <Link href="/apply">
                        <Button>
                            Apply
                        </Button>
                    </Link>
                    <Link href="/rules">
                        <Button variant='outline'>
                            Learn more
                        </Button>
                    </Link>
                </div>
            </div>
            <div className='relative w-[800px] h-[573px]'>
                {/* <AspectRatio
                    className="overflow-hidden rounded-lg w-[800px] h-[573px]"
                    ratio={1 / 1}
                > */}
                    <Image
                        src='/hero1.png'
                        alt="Hero image"
                        priority={true}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-lg object-cover"
                    />
                {/* </AspectRatio> */}
            </div>
        </section>
    )
}

export default Hero;