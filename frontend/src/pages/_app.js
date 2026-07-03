import { useEffect, useState } from 'react'
import Head from 'next/head'
import '../styles/globals.css'
import AccreditationBanner from '../components/AccreditationBanner'

export default function MyApp({ Component, pageProps }) {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateOnline = () => setIsOnline(window.navigator.onLine)
    updateOnline()
    window.addEventListener('online', updateOnline)
    window.addEventListener('offline', updateOnline)

    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('/sw.js')
        } catch (error) {
          console.warn('Service worker registration failed', error)
        }
      }
    }

    registerServiceWorker()

    return () => {
      window.removeEventListener('online', updateOnline)
      window.removeEventListener('offline', updateOnline)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BBIT R&D" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
      </Head>
      <AppInstallBar />
      {!isOnline && (
        <div className="sticky top-0 z-[60] border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm font-semibold text-amber-900 shadow-sm">
          You are offline. The installed app can still open cached pages when available.
        </div>
      )}
      <AccreditationBanner />
      <Component {...pageProps} />
    </>
  )
}

function AppInstallBar() {
  const [promptEvent, setPromptEvent] = useState(null)
  const [showIosTip, setShowIosTip] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handler = (event) => {
      event.preventDefault()
      setPromptEvent(event)
    }

    const detectIos = () => {
      const ua = window.navigator.userAgent || ''
      const isIos = /iPad|iPhone|iPod/.test(ua) && !window.MSStream
      setShowIosTip(isIos && !window.matchMedia('(display-mode: standalone)').matches)
    }

    window.addEventListener('beforeinstallprompt', handler)
    detectIos()

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!promptEvent) return
    promptEvent.prompt()
    await promptEvent.userChoice
    setPromptEvent(null)
  }

  if (!promptEvent && !showIosTip) return null

  return (
    <div className="fixed bottom-4 right-4 z-[70] max-w-sm rounded-[1.5rem] border border-slate-200 bg-white/95 p-4 shadow-[0_25px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Download App</p>
          <h2 className="mt-1 text-sm font-bold text-slate-950">Install the website like a mobile app</h2>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Save the site to your home screen for quick access on mobile.
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-950 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l4-4m-4 4l-4-4M4 20h16" />
          </svg>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {promptEvent ? (
          <button
            type="button"
            onClick={handleInstall}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Install App
          </button>
        ) : (
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            Open in Safari/Chrome menu to add to Home Screen
          </span>
        )}
      </div>
    </div>
  )
}
