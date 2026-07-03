import '../styles/globals.css'
import AccreditationBanner from '../components/AccreditationBanner'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AccreditationBanner />
      <Component {...pageProps} />
    </>
  )
}
