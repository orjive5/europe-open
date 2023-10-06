import { slugHex } from '@/lib/slugHex';
import {defineType, defineField, defineArrayMember} from 'sanity';

const participants = defineType({
    name: 'participants',
    title: 'Participants',
    type: 'document',
    fields: [
        defineField({
            name: 'discipline',
            title: 'Discipline',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'disciplines' }]
                })
            ]
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'categories' }]
                })
            ]
        }),
        defineField({
            name: 'name_and_surname',
            title: 'Name and surname',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name_and_surname',
                slugify: (input: string) => input
                    .toLowerCase()
                    .replace(/^/, slugHex())
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '') 
                    .replace(/-+$/, '')
                    .slice(0, 101) + `-${new Date().getFullYear()}`
                },
        }),
        defineField({
            name: 'date_of_birth',
            title: 'Date of birth',
            type: 'date',
        }),
        defineField({
            name: 'teacher',
            title: 'Teacher',
            type: 'string',
        }),
        defineField({
            name: 'accompanist',
            title: 'Accompanist',
            type: 'string',
        }),
        defineField({
            name: 'conductor',
            title: 'Conductor',
            type: 'string',
        }),
        defineField({
            name: 'collective_leader',
            title: 'Collective leader',
            type: 'string',
        }),
        defineField({
            name: 'country',
            title: 'Country',
            type: 'string',
        }),
        defineField({
            name: 'country_code',
            title: 'Country code',
            type: 'string',
        }),
        defineField({
            name: 'place',
            title: 'City/place',
            type: 'string',
        }),
        defineField({
            name: 'institution',
            title: 'Institution',
            type: 'string',
        }),
        defineField({
            name: 'program',
            title: 'Program',
            type: 'text',
        }),
        defineField({
            name: 'teacher_email',
            title: 'Teacher\'s e-mail',
            type: 'email',
        }),
        defineField({
            name: 'participant_email',
            title: 'Participant\'s e-mail',
            type: 'email',
        }),
        defineField({
            name: 'video_link',
            title: 'Video URL',
            type: 'url',
        }),
        defineField({
            name: 'youtube_link',
            title: 'Youtube URL',
            type: 'url',
        }),
        defineField({
            name: 'identity_documents',
            title: 'Identity documents',
            type: 'array',
            of: [{type: 'file'}],
        }),
        defineField({
            name: 'poster_photo',
            title: 'Photo for the poster',
            type: 'image',
            options: {
                hotspot: true
            },
        }),
        defineField({
            name: 'biography',
            title: 'Participant\'s biography',
            type: 'text',
        }),
        defineField({
            name: 'diploma_by_postal_service',
            title: 'Diplomas by the postal service (+10€)',
            type: 'boolean',
        }),
        defineField({
            name: 'postal_address',
            title: 'Postal address',
            type: 'text',
        }),
    ]
})

export default participants;