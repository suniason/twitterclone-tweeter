import useLoginModal from '@/pages/hooks/useloginmodal'
import React, { useCallback } from 'react'
import Input from '../input'
import Modal from '../modal'
import useRegisterModal from '@/pages/hooks/useregistermodal'
import { signIn } from 'next-auth/react'

const LoginModal: React.FC = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await signIn('credentials', { email, password })
      loginModal.onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [loginModal, email, password])

  const onToggle = useCallback(() => {
    if (isLoading) return

    loginModal.onClose()
    registerModal.onOpen()
  }, [isLoading, loginModal, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Email'
        onChange={e => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder='Password'
        onChange={e => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        type='password'
      />
    </div>
  )

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>
        New to Tweeter?{' '}
        <span className='text-white cursor-pointer hover:underline' onClick={onToggle}>
          Create an account
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Sign In'
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
