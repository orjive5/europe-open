import React from 'react'
import { Metadata } from "next";
import PostClient from '@/components/postClient';

export const metadata: Metadata = {
    title: 'Europe Open | News',
}

const Post = ({ params }: any) => {
    return <PostClient params={params} postType="news_article" />
}

export default Post;