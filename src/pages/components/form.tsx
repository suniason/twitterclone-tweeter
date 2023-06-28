import React, { useCallback } from 'react'
import useRegisterModal from '../hooks/useregistermodal'
import useLoginModal from '../hooks/useloginmodal'
import useCurrentUser from '../hooks/usecurrentuser'
import usePosts from '../hooks/useposts'
import toast from 'react-hot-toast'
import axios from 'axios'
import Avatar from './avatar'
import Button from './button'
import usePost from '../hooks/usepost'

interface FormProps {
  placeholder: string
  isComment?: boolean
  postId?: string
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const { data: currentUser } = useCurrentUser()
  const { mutate: mutatePosts } = usePosts(postId as string)
  const { mutate: mutatePost } = usePost(postId as string)

  const [body, setBody] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts'

      await axios.post(url, { body })

      toast.success('Tweet Created')

      setBody('')
      mutatePosts()
      mutatePost()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [body, mutatePosts, isComment, postId, mutatePost])

  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
      {currentUser ? (
        <div className='flex flex-row gap-4'>
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className='w-full '>
            <textarea
              disabled={isLoading}
              onChange={e => setBody(e.target.value)}
              value={body}
              className='disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white'
              placeholder={placeholder}
            ></textarea>
            <hr className='opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-100	 transition' />
            <div className='mt-4 flex flex-row justify-end'>
              <Button label='Tweet' onClick={onSubmit} disabled={isLoading || !body} />
            </div>
          </div>
        </div>
      ) : (
        <div className='py-8'>
          <h1 className='text-white text-center text-2xl mb-4 font-bold'>
            Welcome to a <span className='text-cyan-500'>Twitter Clone: Tweeter</span>
          </h1>
          <div className='flex flex-row items-center justify-center gap-4'>
            <Button label='Login' onClick={loginModal.onOpen} />
            <Button label='Register' onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  )
}

export default Form
