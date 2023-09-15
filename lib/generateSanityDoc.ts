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