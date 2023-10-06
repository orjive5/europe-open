'use client'

import { ICategory } from '@/types/category.interface';
import { createClient } from "next-sanity";
import clientConfig from '../sanity/config/client-config';

export async function generateCategory({title}: ICategory) {

    const doc = {
        _type: 'categories',
        // _id: 'drafts.',
        title: title,
        slug: {
            _type: 'slug',
            current: title.toLowerCase(),
        }
    }
    createClient(clientConfig)
        .create(doc)
        .then(res => console.log(res))
}

export async function generateParticipant({
        discipline,
        category,
        name_and_surname,
        date_of_birth,
        teacher_conductor_collective_leader,
        accompanist,
        country,
        coutry_code,
        place,
        institution_city_country,
        program,
        diploma_by_postal_service,
        teacher_email,
        participant_email,
        video_link,
        youtube_link,
        identity_document,
        poster_photo,
        biography,
    }: any) {

    const doc = {
        _type: 'participants',
        _id: 'drafts.',
        discipline: [{
            _type: 'reference',
            _key: '6c0b3c5e676b',
            _ref: discipline,
        }],
        category,
        name_and_surname,
        date_of_birth,
        teacher_conductor_collective_leader,
        accompanist,
        country,
        coutry_code,
        place,
        institution_city_country,
        program,
        diploma_by_postal_service,
        teacher_email,
        participant_email,
        video_link,
        youtube_link,
        identity_document,
        poster_photo,
        biography,
    }
    createClient(clientConfig)
        .create(doc)
        .then(res => console.log(res))
}