import useRegisterModal from '@/pages/hooks/useregistermodal'
import React, { useCallback } from 'react'
import Input from '../input'
import Modal from '../modal'
import useLoginModal from '@/pages/hooks/useloginmodal'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

const RegisterModal: React.FC = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await axios.post('api/register', {
        email,
        password,
        username,
        name
      })

      toast.success('Account created')

      registerModal.onClose()
      signIn('credentials', { email, password })
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [registerModal, email, password, username, name])

  const onToggle = useCallback(() => {
    if (isLoading) return

    registerModal.onClose()
    loginModal.onOpen()
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
        placeholder='Name'
        onChange={e => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder='Username'
        onChange={e => setUsername(e.target.value)}
        value={username}
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
        Already have an account?{' '}
        <span className='text-white cursor-pointer hover:underline' onClick={onToggle}>
          Sign In
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Create an Account'
      actionLabel='Register'
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal