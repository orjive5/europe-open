import { ICategory } from "@/types/category.interface";
import { IDiscipline } from "@/types/discipline.interface";
import { IJury } from "@/types/jury.interface";
import { Page } from "@/types/page.interface";
import { IParticipantData } from "@/types/participantData.interface";
import { Post } from "@/types/post.interface";
import { Result } from "@/types/result.interface";
import { Rule } from "@/types/rule.interface";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

export async function getAwards(): Promise<Post[]> {

    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == "award"]{
          _type,
          _id,
          _createdAt,
          title,
          description,
          "slug": slug.current,
          "image": image.asset->url,
          URLs,
          content
      } | order(_createdAt desc)`
    );
}

export async function getAward(slug: string): Promise<Post> {

    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == "award" && slug.current == $slug][0]{
            _id,
            _createdAt,
            title,
            description,
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

export async function getNews(): Promise<Post[]> {
    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == "news"]{
          _type,
          _id,
          _createdAt,
          title,
          description,
          "slug": slug.current,
          "image": image.asset->url,
          URLs,
          content
      } | order(_createdAt desc)`
    );
}

export async function getNewsArticle(slug: string): Promise<Post> {
    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == "news" && slug.current == $slug][0]{
            _id,
            _createdAt,
            title,
            description,
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
    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == 'page']{
            _id,
            _createdAt,
            title,
            'slug': slug.current,
        } | order(_createdAt asc)`
    )
}

export async function getPage(slug: string): Promise<Page> {
    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
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
    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
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
    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
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

export async function getParticipants(): Promise<IParticipantData[]> {
    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == 'participants']{
            _id,
            _createdAt,
            "discipline": discipline[]->title,
            name_and_surname,
            'slug': slug.current,
            country,
            country_code,
            place,
            youtube_link,
            competitive_year,
            season,
        } | order(_createdAt desc)`
    )
}

export async function getParticipant(slug: string): Promise<any> {
    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == "participants" && slug.current == $slug][0]{
            _id,
            _createdAt,
            "discipline": discipline[]->title,
            "category": category[]->title,
            name_and_surname,
            "slug": slug.current,
            date_of_birth,
            teacher,
            accompanist,
            conductor,
            collective_leader,
            country,
            country_code,
            place,
            institution,
            program,
            youtube_link,
            "poster_photo": poster_photo.asset->url,
            biography
        }`,
        { slug }
    )
}

export async function getDisciplines(): Promise<IDiscipline[]> {
    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == "disciplines"]{
          _id,
          _createdAt,
          title,
          "slug": slug.current,
      } | order(_createdAt desc)`
    );
}

export async function getCategories(): Promise<ICategory[]> {
    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == "categories"]{
          _id,
          _createdAt,
          title,
          "slug": slug.current,
      } | order(_createdAt asc)`
    );
}

export async function deleteAllParticipants() {
    return createClient(clientConfig).delete(
        {
            query: `*[_type == "participants"]`
        }
    )
}

export async function getSoloistsRules(): Promise<Rule[]> {

    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == "rules_soloists"]{
          _id,
          _createdAt,
          title,
          "slug": slug.current,
          content
      } | order(_createdAt asc)`
    );
}

export async function getSoloistsTimetable(): Promise<Rule[]> {

    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == "timetable_soloists"]{
          _id,
          _createdAt,
          title,
          "slug": slug.current,
          content
      } | order(_createdAt asc)`
    );
}

export async function getCollectivesRules(): Promise<Rule[]> {

    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == "rules_collectives"]{
          _id,
          _createdAt,
          title,
          "slug": slug.current,
          content
      } | order(_createdAt asc)`
    );
}

export async function getCollectivesTimetable(): Promise<Rule[]> {

    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == "timetable_collectives"]{
          _id,
          _createdAt,
          title,
          "slug": slug.current,
          content
      } | order(_createdAt asc)`
    );
}

export async function getResults(): Promise<Result[]> {

    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == "results"]{
          _id,
          _createdAt,
          title,
          competitive_year,
          "results": results.asset->url
      } | order(_createdAt asc)`
    );
}

export async function getJury(): Promise<IJury[]> {
    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == 'jury']{
            _id,
            _createdAt,
            "discipline": discipline[]->title,
            name_and_surname,
            'slug': slug.current,
            country,
            country_code,
            place,
            institution,
            "portrait_photo": portrait_photo.asset->url,
            biography,
        } | order(_createdAt asc)`
    )
}

export async function getJuryMember(slug: string): Promise<IJury> {
    return createClient({ ...clientConfig, perspective: 'published' }).fetch(
        groq`*[_type == "jury" && slug.current == $slug][0]{
            _id,
            _createdAt,
            "discipline": discipline[]->title,
            name_and_surname,
            'slug': slug.current,
            country,
            country_code,
            place,
            institution,
            "portrait_photo": portrait_photo.asset->url,
            biography,
        }`,
        { slug }
    )
}