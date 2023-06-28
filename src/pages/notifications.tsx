import React from 'react'
import Header from './components/header'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import NotificationFeed from './components/notificationsfeed'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}

const Notifications: React.FC = () => {
  return (
    <>
      <Header label='Notifications' showBackArrow />
      <NotificationFeed />
    </>
  )
}

export default Notifications
