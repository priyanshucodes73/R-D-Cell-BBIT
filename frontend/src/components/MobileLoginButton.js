import Link from 'next/link'
import { FaUserShield } from 'react-icons/fa'

export default function MobileLoginButton() {
    return (
        <Link href="/admin/login">
            <a aria-label="Admin login" className="fixed bottom-20 right-4 z-60 md:hidden">
                <div className="relative flex items-center justify-center">
                    <div className="absolute -inset-1 animate-ping rounded-full bg-yellow-400/40" />
                    <div className="absolute -inset-3 rounded-full border-2 border-yellow-400/30 blur-sm" />
                    <div className="relative h-14 w-14 rounded-full bg-yellow-400 shadow-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                        <FaUserShield className="text-blue-900 h-6 w-6" />
                    </div>
                </div>
            </a>
        </Link>
    )
}
