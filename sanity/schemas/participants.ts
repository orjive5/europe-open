import { slugHex } from '@/lib/slugHex';
import {defineType, defineField, defineArrayMember, Rule, SlugRule} from 'sanity';

const seasonEnum = [
    { title: 'Autumn', value: 'autumn' },
    { title: 'Spring', value: 'spring' },
    { title: 'Summer', value: 'summer' },
  ];

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
                    to: [{ type: 'disciplines' }],
                })
            ],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'categories' }],
                })
            ],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'name_and_surname',
            title: 'Name and surname',
            type: 'string',
            validation: Rule => Rule.required()
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
            validation: (Rule: SlugRule) => Rule.required()
        }),
        defineField({
            name: 'date_of_birth',
            title: 'Date of birth',
            type: 'date',
            validation: Rule => Rule.required()
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
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'country_code',
            title: 'Country code',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'place',
            title: 'City/place',
            type: 'string',
            validation: Rule => Rule.required()
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
            validation: Rule => Rule.required()
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
            validation: Rule => Rule.required()
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
            validation: Rule => Rule.required()
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
        defineField({
            name: 'competitive_year',
            title: 'Competitive year',
            type: 'number',
            initialValue: 2023,
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'season',
            title: 'Season',
            type: 'string',
            options: {
              list: seasonEnum,
            },
            initialValue: 'autumn',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'points',
            title: 'Points',
            type: 'number',
        }),
        defineField({
            name: 'transaction_id',
            title: 'Transaction ID',
            type: 'string',
        }),
    ]
})

export default participants;