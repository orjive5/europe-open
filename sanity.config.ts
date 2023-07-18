import { defineConfig } from "sanity";
import {deskTool} from 'sanity/desk';
import schemas from './sanity/schemas';

const config = defineConfig ({
    projectId: '7fvn7aji',
    dataset: 'production',
    title: 'Qualion',
    apiVersion: '2023-07-16',
    basePath: '/admin',
    plugins: [deskTool()],
    schema: {
        types: schemas
    }
});

export default config;