import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from "@/components/ui/skeleton"

export const ParticipantsSkeleton = () => {
    return (
        <section className="flex flex-col gap-2 w-full">
            <AspectRatio
                className="overflow-hidden rounded-lg"
                ratio={16 / 9}
            >
                <Skeleton className="h-full w-full" />
            </AspectRatio>
            <div className="flex flex-col items-start gap-1">
                <Skeleton className="h-4 w-[200px]" />
                <div className="text-start gap-1 flex flex-col justify-between items-start">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[50px]" />
                </div>
            </div>
        </section>
    )
}