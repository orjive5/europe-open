import { slugHex } from '@/lib/slugHex';
import {defineType, defineField, defineArrayMember, SlugRule} from 'sanity'

const jury = defineType({
    name: 'jury',
    title: 'Jury',
    type: 'document',
    fields: [
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
            name: 'portrait_photo',
            title: 'Portrait photo',
            type: 'image',
            options: {
                hotspot: true
            },
        }),
        defineField({
            name: 'biography',
            title: 'Biography',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'block'
                })
            ]
        }),
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
    ]
})

export default jury;