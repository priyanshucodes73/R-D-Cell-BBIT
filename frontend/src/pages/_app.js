import { useEffect, useState } from 'react'
import Head from 'next/head'
import '../styles/globals.css'
import AccreditationBanner from '../components/AccreditationBanner'
import MobileBottomNav from '../components/MobileBottomNav'
import { idbGet, idbDelete } from '../lib/idb'
import { fetchWithAuth } from '../lib/auth'
import { FaCut } from 'react-icons/fa'

export default function MyApp({ Component, pageProps }) {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateOnline = () => setIsOnline(window.navigator.onLine)
    updateOnline()

    const trySync = async () => {
      try {
        if (!window.localStorage) return
        const token = localStorage.getItem('adminToken')
        if (!token) return
        const cached = await idbGet('accreditationEvidence')
        if (!cached) return

        // Try to save draft and publish
        const body = { draftValue: JSON.stringify(cached), section: 'accreditation', description: 'Accreditation evidence (auto-sync)', type: 'json', isPublic: false }
        const saveRes = await fetchWithAuth(`/api/site-settings/${encodeURIComponent('accreditationEvidence')}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!saveRes.ok) throw new Error('Auto-save failed')

        const pubRes = await fetchWithAuth(`/api/site-settings/${encodeURIComponent('accreditationEvidence')}/publish`, { method: 'POST' })
        if (!pubRes.ok) throw new Error('Auto-publish failed')

        await idbDelete('accreditationEvidence')
        try {
          // eslint-disable-next-line no-alert
          alert('Offline accreditation draft synced and published.')
        } catch (e) { }
      } catch (err) {
        console.warn('Auto-sync failed', err)
      }
    }

    const handleOnline = () => {
      updateOnline()
      trySync()
    }

    window.addEventListener('online', handleOnline)
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

    // Attempt immediate sync if online
    if (window.navigator.onLine) trySync()

    return () => {
      window.removeEventListener('online', handleOnline)
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
      <MobileBottomNav />
    </>
  )
}

function AppInstallBar() {
  const [promptEvent, setPromptEvent] = useState(null)
  const [showIosTip, setShowIosTip] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handler = (event) => {
      try { event.preventDefault() } catch (e) { }
      setPromptEvent(event)
    }

    const detectIos = () => {
      const ua = window.navigator.userAgent || ''
      const isIos = /iPad|iPhone|iPod/.test(ua) && !window.MSStream
      setShowIosTip(isIos && !window.matchMedia('(display-mode: standalone)').matches)
    }

    // Show popup on every load/refresh (no persistent dismissal)
    setVisible(true)

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

  if (!visible) return null

  // Modal-like blocking popup with dismiss (cut) button
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => { /* close on backdrop click optional */ }} />
      <div className="relative z-90 max-w-md w-[92%] rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Download App</p>
            <h2 className="mt-1 text-sm font-bold text-slate-950">Install the website like a mobile app</h2>
            <p className="mt-1 text-xs leading-5 text-slate-600">Save the site to your home screen for quick access on mobile.</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button aria-label="dismiss" title="Dismiss" onClick={() => { setVisible(false) }} className="rounded-full p-2 text-slate-600 hover:bg-slate-100"><FaCut /></button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-950 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l4-4m-4 4l-4-4M4 20h16" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {promptEvent ? (
            <button type="button" onClick={handleInstall} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">Install App</button>
          ) : showIosTip ? (
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Open in Safari/Chrome menu to add to Home Screen</span>
          ) : (
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Available to install from browser menu</span>
          )}
        </div>
      </div>
    </div>
  )
}
