'use client'

import { ICategory } from '@/types/category.interface';
import { createClient } from "next-sanity";
import clientConfig from '../sanity/config/client-config';

export async function generateCategory({title}: ICategory) {

    const doc = {
        _type: 'categories',
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
        biography,
        diploma_by_postal_service,
        postal_address,
    }

    async function createParticipantDoc(clientConfig: any, doc: any, identity_documents: any, poster_photo: any) {
        try {
            // Create the initial participant document
            const client = createClient(clientConfig);
            const participantDoc = await client.create(doc);
            const participantDocId = participantDoc._id;
    
            // Upload image and get the image asset
            const imageAsset = await client.assets.upload('image', poster_photo, {filename: `${poster_photo.name}`});

            // Upload identity docs and get the identity docs asset
            const idDocsAssets = await Promise.all(identity_documents.map(async (idDoc: any) => {
                const idDocsAsset = await client.assets.upload('file', idDoc, { filename: `${idDoc.name}` });
                return idDocsAsset;
            }));

            // Set the image asset and files reference in the initial document
            await client
                .patch(participantDocId)
                .set({
                    identity_documents: idDocsAssets.map(idDocAsset => ({
                        _type: 'file',
                        asset: {
                            _type: "reference",
                            _ref: idDocAsset._id
                        },
                        _key: idDocAsset._id
                    }))
                })
                .set({
                    poster_photo: {
                        _type: 'image',
                        asset: {
                            _type: "reference",
                            _ref: imageAsset._id
                        }
                    }
                })
            .commit();

        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    // Call the function with appropriate arguments
    createParticipantDoc(clientConfig, doc, identity_documents, poster_photo);
}