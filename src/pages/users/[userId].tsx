import { useRouter } from 'next/router'
import Header from '../components/header'
import useUser from '../hooks/useuser'
import { ClipLoader } from 'react-spinners'
import UserHero from '../components/users/userhero'
import UserBio from '../components/users/userbio'
import PostFeed from '../components/posts/postfeed'

const UserView = () => {
  const router = useRouter()
  const { userId } = router.query

  const { data: fetchedUser, isLoading } = useUser(userId as string)

  if (isLoading || !fetchedUser) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }
  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  )
}

export default UserView
