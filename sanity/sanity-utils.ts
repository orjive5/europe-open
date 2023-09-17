import { Page } from "@/types/page.interface";
import { Post } from "@/types/post.interface";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

export async function getPosts(): Promise<Post[]> {
  
    return createClient(clientConfig).fetch(
      groq`*[_type == "post"]{
          _id,
          _createdAt,
          name,
          "slug": slug.current,
          "image": image.asset->url,
          URLs,
          content
      } | order(_createdAt desc)`
    );
}

export async function getPost(slug: string): Promise<Post> {

    return createClient(clientConfig).fetch(
        groq`*[_type == "post" && slug.current == $slug][0]{
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            "image": image.asset->url,
            URLs,
            content
        }`,
        {
            slug
        },
    )
}

export async function getPages(): Promise<Page[]> {
    return createClient(clientConfig).fetch(
        groq`*[_type == 'page']{
            _id,
            _createdAt,
            title,
            'slug': slug.current,
        } | order(_createdAt asc)`
    )
}

export async function getPage(slug: string): Promise<Page> {
    return createClient(clientConfig).fetch(
        groq`*[_type == 'page' && slug.current == $slug][0]{
            _id,
            _createdAt,
            title,
            'slug': slug.current,
            content
        }`,
        { slug }
    )
}

export async function getFaqs(): Promise<any[]> {
    return createClient(clientConfig).fetch(
        groq`*[_type == 'faq']{
            _id,
            _createdAt,
            question,
            'slug': slug.current,
            answer,
        } | order(_createdAt asc)`
    )
}

export async function getFaq(slug: string): Promise<any> {
    return createClient(clientConfig).fetch(
        groq`*[_type == 'faq' && slug.current == $slug][0]{
            _id,
            _createdAt,
            question,
            'slug': slug.current,
            answer,
        }`,
        { slug }
    )
}

export async function getParticipants(): Promise<any[]> {
    return createClient(clientConfig).fetch(
        groq`*[_type == 'participants']{
            _id,
            _createdAt,
            "discipline": discipline[]->title,
            name_and_surname,
            country,
            country_code,
            'slug': slug.current,
            youtube_link,
        } | order(_createdAt asc)`
    )
}

export async function getParticipant(slug: string): Promise<any> {
    return createClient(clientConfig).fetch(
        groq`*[_type == 'participants' && slug.current == $slug][0]{
            _id,
            _createdAt,
            discipline,
            name_and_surname,
            'slug': slug.current,
            youtube_link,
        }`,
        { slug }
    )
}