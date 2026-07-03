import Link from 'next/link'
import { useRouter } from 'next/router'

export default function MobileBottomNav() {
    const router = useRouter()
    const items = [
        { href: '/', label: 'Home', icon: 'M3 12h18' },
        { href: '/accreditation-intelligence', label: 'Accreditation', icon: 'M12 2l3 7h7l-5.5 4.5L19 21l-7-4-7 4 1.5-7.5L3 9h7z' },
        { href: '/qr-verification', label: 'QR', icon: 'M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z' },
        { href: '/download-app', label: 'Install', icon: 'M12 3v12' },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 block md:hidden">
            <div className="mx-auto max-w-3xl">
                <div className="backdrop-blur-sm border-t bg-white/90 flex items-center justify-between px-4 py-2">
                    {items.map((it) => (
                        <Link key={it.href} href={it.href} className={`flex flex-col items-center gap-1 text-xs ${router.pathname === it.href ? 'text-slate-900' : 'text-slate-600'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d={it.icon} />
                            </svg>
                            <span>{it.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}
