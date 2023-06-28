import usePosts from '@/pages/hooks/useposts'
import React from 'react'
import PostItem from './postitem'

interface PostFeedProps {
  userId?: string
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId as string)

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  )
}

export default PostFeed
