import { TypedObject } from "sanity";

export interface IJury {
    _id: string,
    _createdAt: string,
    discipline: string[],
    name_and_surname: string,
    slug: string,
    country: string,
    country_code: string,
    place: string,
    institution: string,
    portrait_photo: string,
    biography: TypedObject[],
}