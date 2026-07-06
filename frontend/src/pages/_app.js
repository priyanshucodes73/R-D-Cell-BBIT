import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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
        <link rel="manifest" href="/api/manifest.json" />
        <link rel="apple-touch-icon" href="/cropped_circle-image.png" />
        {/* iOS startup images (A2HS splash) - fallback to site-logo PNG; add more device-specific sizes as needed */}
        <link rel="apple-touch-startup-image" href="/cropped_circle-image.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/cropped_circle-image.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/cropped_circle-image.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/cropped_circle-image.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/cropped_circle-image.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/cropped_circle-image.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/cropped_circle-image.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/cropped_circle-image.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" />
      </Head>
      <AppInstallBar />
      <SplashLoader />
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

function SplashLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2500); // Splash duration

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center splash-root">
        <div className="animated-bg"></div>

        <div className="relative z-20 flex flex-col items-center">
          <div className="logo-wrapper">
            <div className="loader-ring"></div>

            <img
              src="/cropped_circle-image.png"
              alt="BBIT Logo"
              className="logo"
            />
          </div>

          <h2 className="title">BBIT R&D CELL</h2>
        </div>
      </div>

      <style jsx>{`
        .splash-root {
          background: linear-gradient(135deg, #004aad 0%, #0b2d73 100%);
        }

        .animated-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top left, rgba(255,255,255,.12), transparent 35%),
            radial-gradient(circle at bottom right, rgba(255,255,255,.08), transparent 35%);
          animation: bgMove 5s ease-in-out infinite alternate;
        }

        @keyframes bgMove {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.08);
          }
        }

        .logo-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-ring {
          position: absolute;
          width: 118px;
          height: 118px;
          border: 4px dotted #ffd54f;
          border-radius: 50%;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          border-radius: 50%;
          animation: pulse 1.4s ease-in-out infinite;
          box-shadow: 0 0 25px rgba(255,255,255,.35);
          background: white;
          padding: 6px;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1);
          }
        }

        .title {
          margin-top: 24px;
          color: white;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 2px;
        }
      `}</style>
    </>
  );
}
function AppInstallBar() {
  const [promptEvent, setPromptEvent] = useState(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return

    setVisible(true)

    const handler = (e) => {
      e.preventDefault()
      setPromptEvent(e)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (promptEvent) {
      promptEvent.prompt()
      await promptEvent.userChoice
      setPromptEvent(null)
      setVisible(false)
    } else {
      alert(
        "To install this app:\n\nDesktop:\nOpen Chrome menu (⋮) → Install App\n\nMobile:\nOpen browser menu → Add to Home Screen."
      )
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn">

      <div className="relative w-[92%] max-w-md rounded-3xl bg-white p-7 shadow-2xl">

        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 top-4 h-10 w-10 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition"
        >
          ✕
        </button>

        <div className="flex justify-center mb-5">
          <img
            src="/cropped_circle-image.png"
            className="w-20 h-20 rounded-full animate-bounce"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-blue-900">
          Install BBIT R&D
        </h2>

        <p className="text-center text-gray-600 mt-2">
          Install this website like a mobile application for faster access and a
          better experience.
        </p>

        <button
          onClick={handleInstall}
          className="mt-7 w-full rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 py-3 text-lg font-bold text-white shadow-lg hover:scale-105 transition"
        >
          📲 Install App
        </button>

        <button
          onClick={() => setVisible(false)}
          className="mt-3 w-full rounded-xl border py-3 font-semibold hover:bg-gray-100 transition"
        >
          Maybe Later
        </button>

      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn .4s ease;
        }

        @keyframes fadeIn {
          from {
            opacity:0;
          }
          to {
            opacity:1;
          }
        }
      `}</style>

    </div>
  )
}