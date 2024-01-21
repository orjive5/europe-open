
import PostsClient from "@/components/postsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | Awards',
}

const Awards = () => {
  return <PostsClient postType="awards" />
}

export default Awards;