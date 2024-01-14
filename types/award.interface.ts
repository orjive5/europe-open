import { PortableTextBlock } from "sanity";

export type Award = {
    _id: string;
    _createdAt: Date;
    title: string;
    description: string;
    slug: string;
    image: string;
    URLs: string[];
    content: PortableTextBlock[];
}