import React, { useCallback, useMemo } from 'react'
import useCurrentUser from './usecurrentuser'
import usePost from './usepost'
import usePosts from './useposts'
import useLoginModal from './useloginmodal'
import toast from 'react-hot-toast'
import axios from 'axios'

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser()
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId)
  const { mutate: mutateFetchedPosts } = usePosts(userId as string)

  const loginModal = useLoginModal()

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || []
    return list.includes(currentUser?.id)
  }, [currentUser?.id, fetchedPost?.likedIds])

  const toggleLike = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen()

    try {
      let request
      if (hasLiked) {
        request = () => axios.delete('/api/like', { params: { postId } })
      } else {
        request = () => axios.post('/api/like', { postId })
      }

      await request()
      mutateFetchedPost()
      mutateFetchedPosts()
      toast.success('Success')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [currentUser, hasLiked, loginModal, mutateFetchedPost, mutateFetchedPosts, postId])

  return { hasLiked, toggleLike }
}

export default useLike
