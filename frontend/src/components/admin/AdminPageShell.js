import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaGlobe,
  FaHome,
  FaSearch,
  FaSyncAlt,
  FaBook,
  FaProjectDiagram,
  FaUsers,
  FaNewspaper,
  FaCertificate,
  FaEnvelope,
  FaUserGraduate,
  FaCog,
} from "react-icons/fa";

const defaultNavItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: FaHome },
  { name: "Site Settings", href: "/admin/site-settings", icon: FaCog },
  { name: "Publications", href: "/admin/publications", icon: FaBook },
  { name: "Projects", href: "/admin/projects", icon: FaProjectDiagram },
  { name: "Faculty", href: "/admin/faculty", icon: FaUsers },
  { name: "News & Events", href: "/admin/news-events", icon: FaNewspaper },
  { name: "Patents", href: "/admin/patents", icon: FaCertificate },
  { name: "Contacts", href: "/admin/contacts", icon: FaEnvelope },
  { name: "Registrations", href: "/admin/registrations", icon: FaUserGraduate },
];

export default function AdminPageShell({
  title,
  description,
  backHref = "/admin/dashboard",
  backLabel = "Back to dashboard",
  primaryAction,
  secondaryAction,
  searchTerm,
  setSearchTerm,
  searchPlaceholder = "Search...",
  summary = [],
  loading = false,
  onRefresh,
  navItems = defaultNavItems,
  statusChips = ["Live workspace", "Draft + publish workflow", "Admin control"],
  children,
}) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.12),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(37,99,235,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#e8eef6_100%)]" />

      <div className="mx-auto flex max-w-[1800px] gap-6 px-4 py-4 sm:px-6 lg:px-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-4 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 text-white shadow-[0_25px_80px_rgba(15,23,42,0.14)]">
            <div className="border-b border-white/10 p-5">
              <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">BBIT Admin</p>
              <h2 className="mt-2 text-2xl font-semibold">Control Center</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">One workspace for content, approvals, and publishing.</p>
            </div>

            <nav className="space-y-1 p-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = router.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${active
                        ? "bg-cyan-400/15 text-white ring-1 ring-cyan-400/30"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    <Icon className="shrink-0 text-base" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-3 border-t border-white/10 p-4">
              <Link href="/" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                <FaGlobe />
                Public site
                <FaExternalLinkAlt className="text-xs" />
              </Link>

              <Link href={backHref} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10" aria-label={backLabel}>
                <FaArrowLeft />
                {backLabel}
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile slide-over nav */}
        <div className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`} aria-hidden={!mobileOpen}>
          <div className={`fixed inset-0 bg-black/50 transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileOpen(false)} />
          <div className={`fixed left-0 top-0 h-full w-72 transform bg-slate-950 text-white shadow-xl transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-4 border-b border-white/10">
              <div className="text-xs uppercase tracking-[0.32em] text-cyan-300">BBIT Admin</div>
              <div className="mt-2 text-2xl font-semibold">Control Center</div>
            </div>
            <nav className="p-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = router.pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${active ? 'bg-cyan-400/15 text-white' : 'text-slate-200 hover:bg-white/10 hover:text-white'}`} onClick={() => setMobileOpen(false)}>
                    <Icon className="shrink-0 text-base" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <header className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 text-white shadow-[0_25px_80px_rgba(15,23,42,0.14)]">
            <div className="grid gap-6 p-6 xl:grid-cols-[1.25fr_0.95fr] xl:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                  {statusChips.map((chip) => (
                    <span key={chip} className="rounded-full bg-white/10 px-3 py-1 font-semibold text-slate-200">{chip}</span>
                  ))}
                </div>

                <div className="mt-5 flex items-start gap-4 lg:hidden">
                  <button onClick={() => setMobileOpen(true)} className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10" aria-label="Open menu">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <div className="min-w-0">
                    <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h1>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
                  </div>
                </div>

                <div className="mt-5 hidden items-start gap-4 lg:flex">
                  <div className="min-w-0">
                    <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h1>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
                  </div>
                </div>

                {summary.length > 0 && (
                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {summary.map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
                        <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{item.note}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="relative">
                  <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm?.(event.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/60 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={onRefresh}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <FaSyncAlt className={loading ? "animate-spin" : ""} />
                    Refresh
                  </button>

                  <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                    <FaGlobe />
                    Public site
                    <FaExternalLinkAlt className="text-xs" />
                  </Link>
                </div>

                {primaryAction && <div>{primaryAction}</div>}

                {secondaryAction && <div>{secondaryAction}</div>}
              </div>
            </div>
          </header>

          <main className="mt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}