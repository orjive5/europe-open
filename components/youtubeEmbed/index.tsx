'use client'

import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

const YoutubeEmbed = ({ embedId }: {embedId: string}) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className='aspect-video relative rounded w-full 2xl:w-auto 2xl:h-full'>
            {!loaded && <Skeleton className="absolute w-full h-full" />}
            <iframe
                className={`rounded ${loaded ? 'visible' : 'invisible'} h-full w-full object-cover`}
                src={`https://www.youtube.com/embed/${embedId}?theme=dark&autoplay=1&autohide=0&cc_load_policy=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&mute=0&loop=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                title="Participant's embedded YouTube video"
                onLoad={() => setLoaded(true)}
                allowFullScreen
            />
        </div>
    )
};

export default YoutubeEmbed;