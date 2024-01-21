import Image from "next/image";
import urlBuilder from '@sanity/image-url'

export const PostImage = ({ value }: any) => {
    const urlFor = (source: string) => urlBuilder(
        { projectId: '3vogqwic', dataset: 'production' }
    ).image(source).url();
    return (
        <div className='rounded relative w-2/3 h-[500px]'>
            <Image
                src={urlFor(value)}
                alt="Post image"
                width="0"
                height="0"
                sizes="100vw"
                className="w-auto h-full rounded object-cover object-top box-border overflow-hidden"
            />
        </div>
    )
}