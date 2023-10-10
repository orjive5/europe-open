import { PortableTextBlock } from "sanity";

export type Rule = {
    _id: string;
    _createdAt: Date;
    title: string;
    slug: string;
    content: PortableTextBlock[];
}