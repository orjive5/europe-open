import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

const Hero = () => {

    return (
        <section className="xl:h-[calc(100vh-192px)] w-5/6 flex flex-col xl:flex-row justify-center items-center gap-8">
            <div className='xl:w-1/2 flex flex-col text-center xl:text-start gap-4 xl:gap-8'>
                <h2 className='text-2xl xl:text-4xl'>
                    <span className='font-bold text-4xl xl:text-8xl'>Europe Open </span>
                    <br/>
                    Online Music Competition
                </h2>
                <p>
                    Send a video of your performance to compete with peers from all around the world and receive evaluations from a panel of professionals representing some of the most prestigious musical institutions.
                </p>
                <p className='font-medium text-xl'>
                    Applications are being accepted now!
                </p>
                <div className='flex justify-center xl:justify-start items-center gap-4'>
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
            <div className='relative w-full xl:w-[800px]'>
                <Image
                    src="/hero1.png"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto rounded"
                    alt="Hero banner"
                />
            </div>
        </section>
    )
}

export default Hero;