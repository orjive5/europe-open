import Link from 'next/link';
import CountdownTimer from '../countdownTimer';
import HeroImage from '../heroImage';
import { Timer } from 'lucide-react';

const Hero = () => {
    // Time to apply until next season
    const nextSeason = new Date("Dec 1, 2023 15:37:25").getTime();

    return (
        <section className="xl:h-[calc(100vh-192px)] w-5/6 flex flex-col xl:flex-row justify-center items-center gap-8">
            <div className='xl:w-1/2 flex flex-col text-center xl:text-start gap-4 xl:gap-8'>
                <div className='text-2xl xl:text-4xl'>
                    <span className='font-black text-4xl xl:text-8xl'>Europe Open</span>
                    <br />
                    <h3 className='mt-2 font-semibold'>Online Music Competition</h3>
                </div>
                <p>
                    Send a video of your performance to compete with peers from all around the world and receive evaluations from a panel of professionals representing some of the most prestigious musical institutions.
                </p>
                <p className='font-medium text-xl'>
                    Applications are being accepted now!
                </p>
                <div className='flex flex-col justify-center items-start'>
                    <h2 className='font-medium flex'>Time left until next season</h2>
                    <CountdownTimer targetDate={nextSeason} />
                </div>
                <div className='flex justify-center xl:justify-start items-center gap-4'>
                    <Link href="/apply" draggable="false" aria-labelledby="title" className="relative py-3 px-7 rounded group text-white bg-primary">
                        <span id="title" className="text-xl tracking-wider">Apply</span>
                        <div className="absolute inset-0 py-3 px-7 border border-primary rounded bg-background text-primary motion-safe:transition-[clip-path] motion-safe:duration-500 ease-out [clip-path:circle(20%_at_120%_120%)] group-hover:[clip-path:circle(170%_at_120%_120%)]" aria-hidden="true">
                            <span className="text-xl tracking-wider">Apply</span>
                        </div>
                    </Link>
                    <Link href="/rules" draggable="false" aria-labelledby="title" className="relative py-3 px-7 rounded group border text-foreground bg-background">
                        <span id="title" className="text-xl tracking-wider">
                            Learn more
                        </span>
                        <div className="absolute inset-0 py-3 px-7 rounded bg-accent text-accent-foreground motion-safe:transition-[clip-path] motion-safe:duration-500 ease-out [clip-path:circle(20%_at_120%_120%)] group-hover:[clip-path:circle(170%_at_120%_120%)]" aria-hidden="true">
                            <span className="text-xl tracking-wider">
                                Learn more
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
            <HeroImage />
        </section>
    )
}

export default Hero;