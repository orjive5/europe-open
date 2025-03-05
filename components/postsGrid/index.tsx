import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import PostsPreview from "../postsPreview";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Post } from "@/types/post.interface";
import Autoplay from "embla-carousel-autoplay"

type TProps = {
    heading: string;
    href: string;
    data: Post[];
    isLoading: boolean;
    isError: boolean;
}

export const PostsGrid = (props: TProps) => {
    const { href, heading, data, isLoading, isError } = props;

    return (
        <section className="w-full flex flex-col justify-center items-center gap-8">
            <Link href={href}>
                <h1 className="sm:text-xl font-medium hover:underline">
                    {heading}
                </h1>
            </Link>
            {isLoading && (
                <div className="justify-items-center w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-8 gap-x-4">
                    {[...Array(4)].map((_item, index) => (
                        <div key={index} className="flex flex-col gap-2 w-full">
                            <AspectRatio
                                className="overflow-hidden rounded-lg"
                                ratio={1 / 1}
                            >
                                <Skeleton
                                    className="h-full w-full"
                                />
                            </AspectRatio>
                            <div className="flex flex-col items-start gap-1">
                                <Skeleton className="h-4 w-[200px]"/>
                                <div className="text-start gap-1 flex flex-col justify-between items-start">
                                    <Skeleton className="h-4 w-[150px]"/>
                                    <Skeleton className="h-4 w-[50px]"/>
                                </div>
                            </div>
                        </div>))}
                </div>
            )}
            <div className="justify-items-center w-full gap-y-8 gap-x-4">
                {
                    isError &&
                    <h2 className="text-center">
                        Something went wrong...
                    </h2>
                }
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 4000,
                        }),
                    ]}
                    className="w-full"
                >
                    <CarouselContent>
                        {data.map(item => (
                            <CarouselItem className="basis-1/4" key={item._id}>
                                <PostsPreview landingPage key={item._id} post={item} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {data.length > 4 && (
                        <>
                            <CarouselPrevious />
                            <CarouselNext />
                        </>
                    )}
                </Carousel>
            </div>
        </section>
    )
}