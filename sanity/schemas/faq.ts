import { defineArrayMember, defineField, defineType } from "sanity";

const faq = defineType({
    name: 'faq',
    title: 'FAQ',
    type: 'document',
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'question',
                maxLength: 96,
            }
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'block'
                })
            ],
        })
    ]
})

export default faq;