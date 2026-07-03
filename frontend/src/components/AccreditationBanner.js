import React from 'react'
import { defaultPublicSettings } from '../lib/siteSettings'

export default function AccreditationBanner() {
    const text = defaultPublicSettings.accreditationBanner || 'Accreditation Intelligence System for Institutional Excellence (NBA & NAAC Compliant Web Platform)'

    return (
        <div className="w-full border-b border-yellow-200 bg-gradient-to-r from-yellow-100 via-white to-yellow-100">
            <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 8v4m8-8h-4M4 12H0" />
                        </svg>
                    </div>
                    <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg">
                        <div className="max-w-[56ch] overflow-hidden whitespace-nowrap">
                            <div className="animate-marquee inline-block">{text}&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;{text}</div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
        .animate-spin-slow { animation: spin 6s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-marquee { animation: marquee 18s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
      `}</style>
        </div>
    )
}
