import type { AppProps } from 'next/app';
import '../styles/global.scss'
import {Header} from '../components/Header'
import {Provider as NextAuthProvider } from 'next-auth/client'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'

const inititalOptions ={
  "client-id" : "ATaAEYlAJeIoBdtOt7c6Uo8BqaQHMwNzG0q06lIUriFGfE18kIUKajHnGso3JILtxDf2zh-9MLBeP30u",
  currency:"BRL",
  intent:'capture',
};;


function App({Component, pageProps}: AppProps) {
  return (
    <NextAuthProvider  session={pageProps.session}>
      <PayPalScriptProvider options={inititalOptions}>
        <Header/>
        <Component {...pageProps} />
        </PayPalScriptProvider>
      </NextAuthProvider >
    
  )
}

export default App