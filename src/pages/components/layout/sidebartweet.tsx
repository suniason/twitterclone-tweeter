import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { FaFeather } from 'react-icons/fa'
import useLoginModal from '@/pages/hooks/useloginmodal'

const SidebarTweetButton: React.FC = () => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const onClick = useCallback(() => {
    loginModal.onOpen()
  }, [loginModal])

  return (
    <div onClick={onClick}>
      <div className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-cyan-500 hover:bg-opacity-80 transition cursor-pointer'>
        <FaFeather size={24} color='white' />
      </div>
      <div className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-cyan-500 hover:bg-opacity-90 cursor-pointer trasition'>
        <p className='hidden lg:block text-center font-semibold text-white text-[20px]'>Tweet</p>
      </div>
    </div>
  )
}

export default SidebarTweetButton
