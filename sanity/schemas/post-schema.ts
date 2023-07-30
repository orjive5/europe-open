const post = {
    name: 'post',
    title: 'Posts',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name'
            },
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt',
                    type: 'string',
                }
            ]
        },
        {
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
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ]
        }
    ]
}

export default post;