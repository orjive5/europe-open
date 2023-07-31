import { Page } from "@/types/page";
import { Post } from "@/types/post";
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
      }`
    );
}

// TODO: Delete the code bellow when done with pagination

// export async function getPosts(page: number, perPage: number): Promise<Post[]> {
//     const startIndex = (page - 1) * perPage;
  
//     return createClient(clientConfig).fetch(
//       groq`*[_type == "post"]{
//           _id,
//           _createdAt,
//           name,
//           "slug": slug.current,
//           "image": image.asset->url,
//           URLs,
//           content
//       } | order(_createdAt desc)[${startIndex}...${
//         startIndex + perPage
//       }]`
//     );
// }

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

export async function countPosts(): Promise<Post[]> {
  
    return createClient(clientConfig).fetch(
      groq`count(*[_type == "post"])`
    );
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