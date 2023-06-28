import useCurrentUser from '@/hooks/usecurrentuser'
import useLoginModal from '@/hooks/useloginmodal'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { BsBellFill, BsDot, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'

interface SidebarItemProps {
  label: string
  href?: string
  icon: string
  onClick?: () => void
  auth?: boolean
  alert?: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, icon, onClick, auth, alert }) => {
  const loginModal = useLoginModal()
  const { data: currentUser } = useCurrentUser()
  const router = useRouter()
  const handleClick = useCallback(() => {
    if (onClick) return onClick()
    if (auth && !currentUser) loginModal.onOpen()
    else if (href) router.push(href)
  }, [router, onClick, href, currentUser, loginModal, auth])

  let iconUsed
  if (icon === 'BsHouseFill') {
    iconUsed = <BsHouseFill size={28} color='white' />
  } else if (icon === 'BsBellFill') {
    iconUsed = <BsBellFill size={28} color='white' />
  } else if (icon === 'FaUser') {
    iconUsed = <FaUser size={28} color='white' />
  } else if (icon === 'BiLogOut') {
    iconUsed = <BiLogOut size={28} color='white' />
  }

  let iconUsedResponsive
  if (icon === 'BsHouseFill') {
    iconUsedResponsive = <BsHouseFill size={24} color='white' />
  } else if (icon === 'BsBellFill') {
    iconUsedResponsive = <BsBellFill size={24} color='white' />
  } else if (icon === 'FaUser') {
    iconUsedResponsive = <FaUser size={24} color='white' />
  } else if (icon === 'BiLogOut') {
    iconUsedResponsive = <BiLogOut size={24} color='white' />
  }

  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
      <div
        className='relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300
	hover:bg-opacity-10 cursor-pointer lg:hidden'
      >
        {iconUsed}
        {alert ? <BsDot className='text-cyan-500 absolute -top-4 left-0' size={70} /> : null}
      </div>
      <div className='relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer '>
        {iconUsedResponsive}
        <p className='hidden lg:block text-white text-xl'>{label}</p>
        {alert ? <BsDot className='text-cyan-500 absolute -top-4 left-0' size={70} /> : null}
      </div>
    </div>
  )
}

export default SidebarItem
