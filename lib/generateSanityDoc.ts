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
        teacher,
        accompanist,
        conductor,
        collective_leader,
        country,
        country_code,
        place,
        institution,
        program,
        teacher_email,
        participant_email,
        video_link,
        identity_documents,
        poster_photo,
        biography,
        diploma_by_postal_service,
        postal_address,
    }: any) {

    const doc = {
        _type: 'participants',
        _id: 'drafts.',
        discipline: [{
            _type: 'reference',
            _key: '6c0b3c5e676b',
            _ref: discipline,
        }],
        category: [{
            _type:'reference',
            _key: '5e31c2201004',
            _ref: category,
        }],
        name_and_surname,
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
        teacher_email,
        participant_email,
        video_link,
        // ovo fali
        identity_documents,
        // i ovo
        poster_photo,
        biography,
        diploma_by_postal_service,
        postal_address,
    }
    createClient(clientConfig)
        .create(doc)
        .then(res => console.log(res))
}