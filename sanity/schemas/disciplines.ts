import {defineType, defineField } from 'sanity';

const disciplines = defineType({
  name: 'disciplines',
  title: 'Disciplines',
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
      },
    }),
  ],
});

export default disciplines;