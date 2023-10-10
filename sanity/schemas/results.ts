import { defineType, defineField } from 'sanity';

const results = defineType({
    name: 'results',
    title: 'Results',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'competitive_year',
            title: 'Competitive year',
            type: 'number',
        }),
        defineField({
            name: 'results',
            title: 'Results',
            type: 'file',
        }),
    ]
})

export default results;