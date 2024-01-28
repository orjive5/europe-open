import PostsClient from "@/components/postsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | News',
}

const News = () => {
  return <PostsClient postType="news" />
}

export default News;