import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import auth from "../../lib/auth";
import {
  FaBars,
  FaBook,
  FaCertificate,
  FaChartBar,
  FaCheckCircle,
  FaClock,
  FaCog,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGlobe,
  FaHome,
  FaInbox,
  FaNewspaper,
  FaProjectDiagram,
  FaSearch,
  FaShieldAlt,
  FaSignOutAlt,
  FaSyncAlt,
  FaTimes,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";

const sidebarItems = [
  { id: "overview", name: "Dashboard", icon: FaHome, href: "/admin/dashboard" },
  { id: "site-settings", name: "Site Settings", icon: FaCog, href: "/admin/site-settings" },
  { id: "publications", name: "Publications", icon: FaBook, href: "/admin/publications" },
  { id: "projects", name: "Research Projects", icon: FaProjectDiagram, href: "/admin/projects" },
  { id: "faculty", name: "Faculty", icon: FaUsers, href: "/admin/faculty" },
  { id: "news", name: "News & Events", icon: FaNewspaper, href: "/admin/news-events" },
  { id: "patents", name: "Patents", icon: FaCertificate, href: "/admin/patents" },
  { id: "contacts", name: "Contact Inquiries", icon: FaEnvelope, href: "/admin/contacts" },
  { id: "registrations", name: "Registrations", icon: FaUserGraduate, href: "/admin/registrations" },
];

const controlGroups = [
  {
    title: "Content control",
    description: "Edit the website content that visitors see.",
    items: [
      {
        name: "Site Settings",
        href: "/admin/site-settings",
        icon: FaCog,
        description: "Draft, publish, menus, hero content, and page blocks.",
        accent: "from-slate-700 to-slate-900",
      },
      {
        name: "Publications",
        href: "/admin/publications",
        icon: FaBook,
        description: "Add papers, manage records, and keep research output current.",
        accent: "from-blue-600 to-blue-800",
      },
      {
        name: "Research Projects",
        href: "/admin/projects",
        icon: FaProjectDiagram,
        description: "Track ongoing and completed projects in one place.",
        accent: "from-emerald-600 to-emerald-800",
      },
      {
        name: "Faculty",
        href: "/admin/faculty",
        icon: FaUsers,
        description: "Maintain staff profiles and research visibility.",
        accent: "from-violet-600 to-violet-800",
      },
    ],
  },
  {
    title: "Operations",
    description: "Handle day-to-day administrative work faster.",
    items: [
      {
        name: "Contact Inquiries",
        href: "/admin/contacts",
        icon: FaInbox,
        description: "Review messages, requests, and pending responses.",
        accent: "from-amber-600 to-amber-800",
      },
      {
        name: "Registrations",
        href: "/admin/registrations",
        icon: FaUserGraduate,
        description: "Process admissions and registration requests.",
        accent: "from-cyan-600 to-cyan-800",
      },
      {
        name: "News & Events",
        href: "/admin/news-events",
        icon: FaNewspaper,
        description: "Publish announcements and event updates quickly.",
        accent: "from-orange-600 to-orange-800",
      },
      {
        name: "Patents",
        href: "/admin/patents",
        icon: FaCertificate,
        description: "Keep intellectual property records organized.",
        accent: "from-rose-600 to-rose-800",
      },
    ],
  },
];

const workflowSteps = [
  {
    title: "Review submissions",
    description: "Start with registrations, contact requests, and pending updates.",
    icon: FaInbox,
    href: "/admin/contacts",
  },
  {
    title: "Update content",
    description: "Use site settings to control page copy, menus, and public blocks.",
    icon: FaCog,
    href: "/admin/site-settings",
  },
  {
    title: "Publish research",
    description: "Keep publications, projects, faculty, and patents current.",
    icon: FaChartBar,
    href: "/admin/publications",
  },
  {
    title: "Verify system health",
    description: "Confirm your session, refresh stats, and continue safely.",
    icon: FaShieldAlt,
    href: "/admin/dashboard",
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsError, setStatsError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminName, setAdminName] = useState("Administrator");
  const [loginTime, setLoginTime] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setAdminEmail(localStorage.getItem("adminEmail") || "");
    setAdminName(localStorage.getItem("adminName") || "Administrator");
    setLoginTime(localStorage.getItem("adminLoginTime") || "");
    refreshStats();
  }, [router]);

  const refreshStats = async () => {
    try {
      setStatsError("");
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";
      const response = await fetch(`${apiBase}/api/stats`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to load dashboard metrics");
      }

      setStats(data);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStatsError(error.message || "Unable to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.logout();
    router.push("/admin/login");
  };

  const visibleGroups = controlGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const haystack = `${group.title} ${item.name} ${item.description}`.toLowerCase();
        return haystack.includes(searchTerm.toLowerCase());
      }),
    }))
    .filter((group) => group.items.length > 0);

  const statCards = [
    {
      label: "Publications",
      value: stats?.publications || 0,
      description: "All research papers and reports",
      icon: FaBook,
      tone: "from-blue-600 to-cyan-600",
    },
    {
      label: "Active Projects",
      value: stats?.activeProjects || 0,
      description: "Ongoing research initiatives",
      icon: FaProjectDiagram,
      tone: "from-emerald-600 to-teal-600",
    },
    {
      label: "Faculty Members",
      value: stats?.faculty || 0,
      description: "Profiles available for the public site",
      icon: FaUsers,
      tone: "from-violet-600 to-fuchsia-600",
    },
    {
      label: "Patents",
      value: stats?.patents || 0,
      description: "Filed, published, and granted records",
      icon: FaCertificate,
      tone: "from-amber-600 to-orange-600",
    },
    {
      label: "This Year",
      value: stats?.recentPublications || 0,
      description: "Publications added this calendar year",
      icon: FaChartBar,
      tone: "from-slate-700 to-slate-900",
    },
    {
      label: "Platform Status",
      value: loading ? "..." : "Ready",
      description: statsError ? "Check backend connection" : "Dashboard metrics loaded",
      icon: FaCheckCircle,
      tone: "from-rose-600 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(15,118,110,0.14),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#eef3f8_100%)]" />

      <aside
        className={`fixed top-0 left-0 z-50 h-full border-r border-white/20 bg-slate-950/95 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-24"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 p-5">
            <div className="flex items-start justify-between gap-3">
              {sidebarOpen ? (
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">BBIT Admin</p>
                  <h1 className="mt-2 text-2xl font-semibold">Control Hub</h1>
                  <p className="mt-1 text-sm text-slate-300">Manage the R&D Cell like a live application.</p>
                </div>
              ) : (
                <div className="pt-1">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-lg font-bold text-white">
                    B
                  </div>
                </div>
              )}

              <button
                onClick={() => setSidebarOpen((current) => !current)}
                className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto p-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.id} href={item.href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white">
                  <Icon className="shrink-0 text-base" />
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-3 border-t border-white/10 p-4">
            <div className="rounded-2xl bg-white/5 p-4">
              {sidebarOpen ? (
                <>
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Signed in as</p>
                  <p className="mt-2 text-sm font-semibold text-white">{adminName}</p>
                  <p className="text-xs text-slate-300">{adminEmail || "Administrator"}</p>
                </>
              ) : (
                <div className="flex justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold">
                    {adminName ? adminName.charAt(0).toUpperCase() : "A"}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-rose-600 px-4 py-3 font-semibold text-white transition hover:bg-rose-500"
            >
              <FaSignOutAlt />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-24"}`}>
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
          <div className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Administration</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Dashboard</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                A central place to manage content, workflows, and operational health for the BBIT R&D Cell.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={refreshStats}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <FaSyncAlt className={loading ? "animate-spin" : ""} />
                Refresh metrics
              </button>
              <Link href="/" className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                <FaGlobe />
                Open public site
                <FaExternalLinkAlt className="text-xs" />
              </Link>
            </div>
          </div>
        </header>

        <main className="space-y-8 px-6 py-6 lg:px-8">
          <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
            <div className="grid gap-6 p-6 xl:grid-cols-[1.45fr_0.85fr] xl:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="rounded-full bg-cyan-50 px-3 py-1 font-semibold text-cyan-700">Live control room</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">Draft and publish ready</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                    {loginTime ? `Session started ${new Date(loginTime).toLocaleString()}` : "Session active"}
                  </span>
                </div>

                <h3 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                  Manage the site with fewer clicks and clearer decisions.
                </h3>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  This dashboard now behaves like a real operations console: live counters, focused workflows, fast search, and direct access to the pages you actually edit every day.
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {[
                    { label: "Content control", value: "Draft + publish" },
                    { label: "Operational work", value: "Contacts + registrations" },
                    { label: "Research output", value: "Publications + projects" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{item.label}</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">System summary</p>
                    <h4 className="mt-2 text-xl font-semibold">Dashboard health</h4>
                  </div>
                  <div className="rounded-full bg-white/10 p-3 text-cyan-300">
                    <FaShieldAlt />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-200">API metrics</p>
                      <p className="text-xs text-slate-400">Live counts from the backend</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statsError ? "bg-rose-500/20 text-rose-200" : "bg-emerald-500/20 text-emerald-200"}`}>
                      {statsError ? "Needs attention" : "Connected"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-200">Admin session</p>
                      <p className="text-xs text-slate-400">Protected with the current token</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">Active</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-200">Last refresh</p>
                      <p className="text-xs text-slate-400">Updated when metrics were loaded</p>
                    </div>
                    <span className="text-sm font-semibold text-white">{lastUpdated || "Waiting"}</span>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  Use site settings for broad content control, then open a module below to manage individual records.
                </div>
              </div>
            </div>
          </section>

          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white/70">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            </div>
          ) : (
            <>
              {statsError && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{statsError}</div>
              )}

              <section>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Live overview</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">Core metrics</h3>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <div key={card.label} className="rounded-[1.6rem] border border-white/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.tone} text-white`}>
                          <Icon />
                        </div>
                        <div className="mt-5 flex items-end justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-slate-500">{card.label}</p>
                            <p className="mt-2 text-4xl font-black tracking-tight text-slate-950">{card.value}</p>
                          </div>
                          <div className="max-w-[160px] text-right text-xs leading-5 text-slate-500">{card.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Fast search</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">Find the right admin tool quickly</h3>
                    <p className="mt-2 text-sm text-slate-600">Search across modules to jump to the page you need instead of browsing through the whole sidebar.</p>
                  </div>

                  <div className="relative w-full lg:max-w-md">
                    <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search modules, workflows, or settings"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-8">
                  {visibleGroups.map((group) => (
                    <div key={group.title}>
                      <div className="mb-4 flex items-end justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900">{group.title}</h4>
                          <p className="text-sm text-slate-500">{group.description}</p>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link key={item.name} href={item.href} className="group rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl">
                              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg`}>
                                <Icon />
                              </div>
                              <h5 className="mt-4 text-base font-semibold text-slate-900">{item.name}</h5>
                              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                                Open module <FaExternalLinkAlt className="text-xs text-slate-400 transition group-hover:translate-x-0.5" />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Workflow</p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-900">Recommended admin flow</h3>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {workflowSteps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <Link key={step.title} href={step.href} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-white hover:shadow-lg">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                              <Icon />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                                <span>Step {index + 1}</span>
                              </div>
                              <h4 className="mt-2 text-base font-semibold text-slate-900">{step.title}</h4>
                              <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_20px_50px_rgba(15,23,42,0.14)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Control notes</p>
                      <h3 className="mt-2 text-2xl font-bold">Useful session info</h3>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3 text-cyan-300">
                      <FaClock />
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-sm font-medium text-slate-200">Signed in user</p>
                      <p className="mt-1 text-sm text-slate-300">{adminName}</p>
                      <p className="text-xs text-slate-400">{adminEmail || "No email saved in session"}</p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-sm font-medium text-slate-200">Current focus</p>
                      <p className="mt-1 text-sm text-slate-300">Open site settings to manage the most impactful public content first.</p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-sm font-medium text-slate-200">Best next actions</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-300">
                        <li>• Review pending contact inquiries</li>
                        <li>• Update publication and project entries</li>
                        <li>• Publish site content changes when ready</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
