import { slugHex } from "@/lib/slugHex";
import { defineArrayMember, defineField, defineType, SlugRule } from "sanity";

const award = defineType({
    name: 'award',
    title: 'Awards',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
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
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'block'
                }),
                defineArrayMember({
                    type: 'image'
                }),
                defineArrayMember({
                    type: 'youtube'
                })
            ]
        })
    ]
})

export default award;