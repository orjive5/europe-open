import Image from "next/image";
import urlBuilder from '@sanity/image-url'

export const PostImage = ({ value }: any) => {
    const urlFor = (source: string) => urlBuilder(
        { projectId: '3vogqwic', dataset: 'production' }
    ).image(source).url();
    return (
        <div className='rounded relative w-full h-auto'>
            <Image
                src={urlFor(value)}
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-full rounded object-cover object-top box-border overflow-hidden"
                alt="Separator image"
            />
        </div>
    )
}