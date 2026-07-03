import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaHome, FaStar, FaQrcode, FaDownload } from 'react-icons/fa'

export default function MobileBottomNav() {
    const router = useRouter()
    const items = [
        { href: '/', label: 'Home', Icon: FaHome },
        { href: '/accreditation-intelligence', label: 'Accreditation', Icon: FaStar },
        { href: '/qr-verification', label: 'QR', Icon: FaQrcode },
        { href: '/download-app', label: 'Install', Icon: FaDownload },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 block md:hidden">
            <div className="mx-auto max-w-3xl">
                <div className="backdrop-blur-sm border-t bg-white/95 flex items-center justify-between px-4 py-2">
                    {items.map((it) => (
                        <Link key={it.href} href={it.href} className={`flex flex-col items-center gap-1 text-xs ${router.pathname === it.href ? 'text-slate-900' : 'text-slate-600'}`}>
                            <it.Icon className="h-6 w-6" />
                            <span>{it.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}
