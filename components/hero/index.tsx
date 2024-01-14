import Link from 'next/link';
import HeroImage from '../heroImage';

const Hero = () => {

    return (
        <section className="xl:h-[calc(100vh-192px)] w-5/6 flex flex-col xl:flex-row justify-center items-center gap-8">
            <div className='xl:w-1/2 flex flex-col text-center xl:text-start gap-4 xl:gap-8'>
                <div className='text-2xl xl:text-4xl'>
                    <span className='font-black text-4xl xl:text-8xl'>
                        Europe Open
                    </span>
                    <br />
                    <h3 className='mt-2 font-semibold'>Online Music Competition</h3>
                </div>
                <p>
                    Send a video of your performance to compete with peers from all around the world and receive evaluations from a panel of professionals representing some of the most prestigious musical institutions.
                </p>
                <p className='font-medium text-lg md:text-xl'>
                    Applications are being accepted now!
                </p>
                <div className='flex flex-wrap justify-center xl:justify-start items-center gap-4'>
                    <Link href="/apply" draggable="false" aria-labelledby="title" className="relative py-2 px-6 md:py-3 md:px-7 rounded group text-white bg-primary">
                        <span id="title" className="text-lg md:text-xl tracking-wider">Apply</span>
                        <div className="absolute inset-0 py-2 px-6 md:py-3 md:px-7 border border-primary rounded bg-background text-primary motion-safe:transition-[clip-path] motion-safe:duration-500 ease-out [clip-path:circle(20%_at_120%_120%)] group-hover:[clip-path:circle(170%_at_120%_120%)]" aria-hidden="true">
                            <span className="text-lg md:text-xl tracking-wider">Apply</span>
                        </div>
                    </Link>
                    <Link href="/rules" draggable="false" aria-labelledby="title" className="relative py-2 px-6 md:py-3 md:px-7 rounded group border text-foreground bg-background">
                        <span id="title" className="text-lg md:text-xl tracking-wider">
                            Learn more
                        </span>
                        <div className="absolute inset-0 py-2 px-6 md:py-3 md:px-7 rounded bg-accent text-accent-foreground motion-safe:transition-[clip-path] motion-safe:duration-500 ease-out [clip-path:circle(20%_at_120%_120%)] group-hover:[clip-path:circle(170%_at_120%_120%)]" aria-hidden="true">
                            <span className="text-lg md:text-xl tracking-wider">
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