'use client'

import { useState } from "react";

const YoutubeEmbed = ({ embedId }: {embedId: string}) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className="rounded w-[800px]">
            <iframe
                className={`rounded ${loaded ? 'visible' : 'invisible'} aspect-video w-full h-full object-cover`}
                src={`https://www.youtube.com/embed/${embedId}?theme=dark&autoplay=1&autohide=0&cc_load_policy=1&modestbranding=1&fs=0&showinfo=0&rel=0&iv_load_policy=3&mute=0&loop=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
                title="Participant's embedded YouTube video"
                onLoad={() => setLoaded(true)}
            />
        </div>
    )
};

export default YoutubeEmbed;