// 'use client'

import { Page } from "@/types/page";
import { Post } from "@/types/post";
import { createClient, groq } from "next-sanity";
// import { DRAFTS_FOLDER } from "sanity";
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

// //GENERATE DRAFT DOCUMENT FROM FRONTEND
// export async function generateCategory() {

//     const doc = {
//         _type: 'categories',
//         _id: DRAFTS_FOLDER,
//         title: 'I',
//         slug: 'i',
//     }
//     createClient(clientConfig)
//         .create(doc)
//         .then(res => console.log(res))
//         // (res => console.log(`Document was created, document ID is ${res._id}`)
// }