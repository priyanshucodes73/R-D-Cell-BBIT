import Link from "next/link";
import { FaArrowRight, FaCheckCircle, FaMobileAlt, FaRegWindowMaximize, FaShieldAlt, FaTabletAlt } from "react-icons/fa";

const steps = [
    "Open the website in Chrome or Safari on mobile.",
    "Tap the install banner or browser menu option.",
    "Choose 'Add to Home Screen' or 'Install App'.",
    "Launch the app from your home screen like a native app.",
];

const benefits = [
    {
        title: "Feels like an app",
        desc: "Uses standalone display mode and cached pages for a mobile-app style experience.",
        icon: FaMobileAlt,
    },
    {
        title: "Works on devices",
        desc: "Installable on Android and supported desktop browsers, with iOS home screen support.",
        icon: FaTabletAlt,
    },
    {
        title: "Secure by design",
        desc: "Keeps the same authenticated admin and public content flow as the website.",
        icon: FaShieldAlt,
    },
    {
        title: "Fast launch",
        desc: "Open the site instantly from the home screen without typing a URL each time.",
        icon: FaRegWindowMaximize,
    },
];

export default function DownloadAppPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
                <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
                    <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Mobile App Bundle</p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                        Install the website like a mobile app.
                    </h1>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">
                        This BBIT platform is now configured as a PWA so colleges can open it from a home-screen icon, use it offline in parts, and treat it like a mobile app.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/">
                            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-3 font-bold text-blue-950 shadow-lg transition hover:bg-yellow-300 cursor-pointer">
                                Open Website <FaArrowRight />
                            </span>
                        </Link>
                        <Link href="/accreditation-intelligence">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15 cursor-pointer">
                                View Features
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {benefits.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-950 text-white">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h2 className="mt-5 text-xl font-bold text-slate-900">{item.title}</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
                    <div className="rounded-[2rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">How to install</p>
                        <h2 className="mt-3 text-3xl font-bold text-slate-950">Get the app on your phone in four steps</h2>
                        <div className="mt-6 space-y-4">
                            {steps.map((step, index) => (
                                <div key={step} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-white">
                                        {index + 1}
                                    </div>
                                    <p className="text-sm leading-6 text-slate-700">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[2rem] bg-gradient-to-br from-blue-700 to-indigo-700 p-8 text-white shadow-[0_18px_50px_rgba(29,78,216,0.18)]">
                        <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">Why colleges want it</p>
                        <h2 className="mt-3 text-3xl font-bold">A better experience for admins, faculty, and students.</h2>
                        <div className="mt-6 space-y-4 text-white/85">
                            {[
                                "Open quickly from the home screen.",
                                "Looks and behaves like a proper app.",
                                "Keeps the same accreditation and QR tools.",
                                "Supports a more professional demo to colleges.",
                            ].map((item) => (
                                <div key={item} className="flex gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-300 h-5 w-5" />
                                    <span className="text-sm leading-6">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        </div>
            </section >
        </div >
    );
}
