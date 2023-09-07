import {defineType, defineField, defineArrayMember} from 'sanity'

const jury = defineType({
    name: 'jury',
    title: 'Jury',
    type: 'document',
    fields: [
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
                source: 'name_and_surname'
            },
        }),
        defineField({
            name: 'image',
            title: 'Image',
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
        defineField({
            name: 'place',
            title: 'City/place',
            type: 'string',
        }),
        defineField({
            name: 'country',
            title: 'Country',
            type: 'string',
        }),
    ]
})

export default jury;