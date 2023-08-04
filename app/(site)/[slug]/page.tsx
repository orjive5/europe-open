import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";

type Props = {
    params: {
        slug: string;
    }
}

export default async function Page ({ params }: Props) {
    const page = await getPage(params.slug);
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="responsive-heading text-center">
                <PortableText value={page.content} />
            </div>
        </div>
    )
}