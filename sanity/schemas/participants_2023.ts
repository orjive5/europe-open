import {defineType, defineField, defineArrayMember} from 'sanity'

const participants_2023 = defineType({
    name: 'participants_2023',
    title: 'Participants 2023',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name'
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
            name: 'URLs',
            title: 'URLs',
            type: 'array',
            of: [
                {
                    name: 'url1',
                    title: 'Url1',
                    type: 'url',
                },
                {
                    name: 'url2',
                    title: 'Url2',
                    type: 'url',
                },
                {
                    name: 'url3',
                    title: 'Url3',
                    type: 'url',
                },
            ]
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ]
        }),
        defineField({
            title: "String array",
            name: "strings",
            type: "array",
            of: [
              defineArrayMember({ type: "string" })  
            ]
        })
    ]
})

export default participants_2023;