import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './components/layout'
import LoginModal from './components/modals/loginmodal'
import RegisterModal from './components/modals/registermodal'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import EditModal from './components/modals/editmodal'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Twitter Clone: Tweeter</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <EditModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}
