import { slugHex } from "@/lib/slugHex";
import { defineArrayMember, defineField, defineType } from "sanity";

const rules_soloists = defineType({
    name: 'rules_soloists',
    title: 'Rules (soloists)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
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
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'block'
                })
            ]
        })
    ]
})

export default rules_soloists;