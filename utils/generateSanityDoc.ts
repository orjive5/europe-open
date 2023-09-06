'use client'

import { createClient } from "next-sanity";
import { title } from "process";
// import { DRAFTS_FOLDER } from "sanity";
import clientConfig from '../sanity/config/client-config';

//GENERATE DRAFT DOCUMENT FROM FRONTEND
// TODO: figure out how to put it in a draft, figure out slug type
export async function generateCategory() {

    const doc = {
        _type: 'categories',
        // _id: 'drafts',
        title: 'I',
        slug: 'i',
    }
    createClient(clientConfig)
        .create(doc)
        .then(res => console.log(res))
        // (res => console.log(`Document was created, document ID is ${res._id}`)
}