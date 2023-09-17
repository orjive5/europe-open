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
                slugify: input => input
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
            name: 'teacher_conductor_collective_leader',
            title: 'Teacher/ Conductor/ Collective leader',
            type: 'string',
        }),
        defineField({
            name: 'accompanist',
            title: 'Accompanist',
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
            name: 'institution_city_country',
            title: 'Institution, city, country',
            type: 'string',
        }),
        defineField({
            name: 'program',
            title: 'Program (composer, composition title, duration)',
            type: 'string',
        }),
        defineField({
            name: 'diploma_by_postal_service',
            title: 'Diplomas by the postal service (+10€)',
            type: 'boolean',
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
        {
            name: 'identity_document',
            title: 'Identity document',
            type: 'file',
        },
        defineField({
            name: 'poster_photo',
            title: 'Photo for the poster',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt',
                    type: 'string',
                })
            ]
        }),
        {
            name: 'biography',
            title: 'Participant\'s biography',
            type: 'file',
        }
    ]
})

export default participants;