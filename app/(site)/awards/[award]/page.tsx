import React from 'react'
import { Metadata } from "next";
import PostClient from '@/components/postClient';

export const metadata: Metadata = {
    title: 'Europe Open | Award',
}

const Post = ({ params }: any) => {
    return <PostClient params={params} />
}

export default Post;