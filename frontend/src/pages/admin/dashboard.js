import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import auth from "../../lib/auth";
import {
  FaBars,
  FaBook,
  FaCertificate,
  FaChartBar,
  FaChevronRight,
  FaCheckCircle,
  FaClock,
  FaCog,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGlobe,
  FaHome,
  FaInbox,
  FaHistory,
  FaLayerGroup,
  FaNewspaper,
  FaProjectDiagram,
  FaSearch,
  FaShieldAlt,
  FaSignOutAlt,
  FaSyncAlt,
  FaTimes,
  FaUserGraduate,
  FaUsers,
  FaCloudUploadAlt,
} from "react-icons/fa";

const auditStorageKey = "bbit_admin_audit_log";
const publishingStateKey = "bbit_admin_publishing_states";
const defaultPublishingStates = {
  homepage: "Published",
  research: "Published",
  operations: "Draft",
};

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

const dashboardHighlights = [
  {
    label: "Publishing posture",
    value: "Controlled",
    note: "Drafts, publish actions, and page overrides stay in one place.",
  },
  {
    label: "Operational load",
    value: "Focused",
    note: "Manage contacts, registrations, and records from the same console.",
  },
  {
    label: "Content readiness",
    value: "Visible",
    note: "Track what still needs attention before the next update cycle.",
  },
];

const quickActions = [
  {
    name: "Site settings",
    href: "/admin/site-settings",
    icon: FaCog,
    description: "Edit homepage, menus, and public content blocks.",
    tone: "from-slate-900 to-slate-700",
  },
  {
    name: "Review contacts",
    href: "/admin/contacts",
    icon: FaInbox,
    description: "Handle inquiries and follow-up messages first.",
    tone: "from-blue-700 to-cyan-600",
  },
  {
    name: "Publish updates",
    href: "/admin/news-events",
    icon: FaNewspaper,
    description: "Post announcements and event updates quickly.",
    tone: "from-emerald-700 to-teal-600",
  },
  {
    name: "Open public site",
    href: "/",
    icon: FaGlobe,
    description: "Check how recent changes appear to visitors.",
    tone: "from-violet-700 to-fuchsia-600",
  },
];

const activityFeed = [
  {
    title: "Content synchronization",
    description: "Homepage and page overrides are connected to admin settings.",
    meta: "System",
    icon: FaLayerGroup,
  },
  {
    title: "Research content flow",
    description: "Publications, projects, faculty, and patents are managed separately.",
    meta: "Content",
    icon: FaBook,
  },
  {
    title: "Operational queue",
    description: "Contacts and registrations remain ready for review.",
    meta: "Workflow",
    icon: FaInbox,
  },
  {
    title: "Security posture",
    description: "Admin sessions stay protected through authenticated access.",
    meta: "Access",
    icon: FaShieldAlt,
  },
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
  const [publishingStates, setPublishingStates] = useState(defaultPublishingStates);
  const [auditLog, setAuditLog] = useState([]);

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

    try {
      const savedPublishingStates = localStorage.getItem(publishingStateKey);
      if (savedPublishingStates) {
        setPublishingStates({ ...defaultPublishingStates, ...JSON.parse(savedPublishingStates) });
      }
    } catch (error) {
      console.warn("Unable to load publishing states", error);
    }

    try {
      const savedAuditLog = localStorage.getItem(auditStorageKey);
      if (savedAuditLog) {
        setAuditLog(JSON.parse(savedAuditLog));
      } else {
        const initialEntry = {
          id: Date.now(),
          title: "Dashboard connected",
          description: "Admin control center loaded successfully.",
          scope: "System",
          time: new Date().toISOString(),
        };
        setAuditLog([initialEntry]);
        localStorage.setItem(auditStorageKey, JSON.stringify([initialEntry]));
      }
    } catch (error) {
      console.warn("Unable to load audit log", error);
    }

    refreshStats();
    refreshAuditLog();
  }, [router]);

  const writeAuditEntry = (title, description, scope = "Content") => {
    const entry = {
      id: Date.now(),
      title,
      description,
      scope,
      time: new Date().toISOString(),
    };

    setAuditLog((current) => {
      const nextLog = [entry, ...current].slice(0, 6);
      if (typeof window !== "undefined") {
        localStorage.setItem(auditStorageKey, JSON.stringify(nextLog));
      }
      return nextLog;
    });
  };

  const togglePublishingState = (key) => {
    setPublishingStates((current) => {
      const nextValue = current[key] === "Published" ? "Draft" : "Published";
      const nextStates = { ...current, [key]: nextValue };

      if (typeof window !== "undefined") {
        localStorage.setItem(publishingStateKey, JSON.stringify(nextStates));
      }

      const labelMap = {
        homepage: "Homepage",
        research: "Research section",
        operations: "Operational queue",
      };

      writeAuditEntry(`${labelMap[key]} set to ${nextValue.toLowerCase()}`, `Updated the ${labelMap[key].toLowerCase()} visibility state.`, "Publishing");
      return nextStates;
    });
  };

  const refreshAuditLog = async () => {
    try {
      const response = await auth.fetchWithAuth("/api/admin/audit-log?limit=6");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to load audit timeline");
      }

      const normalizedLogs = Array.isArray(data.logs)
        ? data.logs.map((item) => ({
            ...item,
            title: item.title || item.action,
            time: item.time || item.createdAt || new Date().toISOString(),
          }))
        : [];
      setAuditLog(normalizedLogs);
    } catch (error) {
      console.warn("Unable to load backend audit log", error);
    }
  };

  const publishAllSettings = async () => {
    try {
      const response = await auth.fetchWithAuth("/api/site-settings/publish-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to publish all site settings");
      }

      writeAuditEntry("Published all site settings", `Published ${data.updatedKeys?.length || 0} settings from the dashboard.`, "Publishing");
      refreshAuditLog();
      refreshStats();
    } catch (error) {
      console.error("Publish all failed:", error);
      setStatsError(error.message || "Unable to publish all site settings");
    }
  };

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

  const readinessScore = Math.min(
    100,
    (Number(stats?.publications || 0) > 0 ? 25 : 0) +
      (Number(stats?.activeProjects || 0) > 0 ? 25 : 0) +
      (Number(stats?.faculty || 0) > 0 ? 25 : 0) +
      (Number(stats?.patents || 0) > 0 ? 25 : 0),
  );

  const readinessLabel = readinessScore >= 75 ? "Strong" : readinessScore >= 50 ? "Stable" : "Needs attention";

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
    {
      label: "Pending Contacts",
      value: stats?.pendingContacts || 0,
      description: "Inquiries awaiting review",
      icon: FaInbox,
      tone: "from-orange-600 to-amber-600",
    },
    {
      label: "Pending Registrations",
      value: stats?.pendingRegistrations || 0,
      description: "Applications waiting to be processed",
      icon: FaUserGraduate,
      tone: "from-cyan-600 to-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.12),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(37,99,235,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#e8eef6_100%)]" />

      <aside
        className={`fixed top-0 left-0 z-50 h-full border-r border-slate-800 bg-slate-950/96 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-24"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 p-5">
            <div className="flex items-start justify-between gap-3">
              {sidebarOpen ? (
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">BBIT Admin</p>
                  <h1 className="mt-2 text-2xl font-semibold">Command Center</h1>
                  <p className="mt-1 text-sm text-slate-300">Serious control for content, operations, and publishing.</p>
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
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="px-6 py-4 lg:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Administration</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">Dashboard</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">A clean control room for publishing, operations, and content governance.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[540px] xl:grid-cols-[1fr_auto_auto]">
                <div className="relative">
                  <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search modules, workflows, settings"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                  />
                </div>

                <button
                  onClick={refreshStats}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <FaSyncAlt className={loading ? "animate-spin" : ""} />
                  Refresh
                </button>

                <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  <FaGlobe />
                  Public site
                  <FaExternalLinkAlt className="text-xs" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="space-y-8 px-6 py-6 lg:px-8">
          <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 text-white shadow-[0_25px_80px_rgba(15,23,42,0.14)]">
            <div className="grid gap-6 p-6 xl:grid-cols-[1.45fr_0.85fr] xl:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1 font-semibold text-cyan-200">Live control room</span>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 font-semibold text-emerald-200">Draft + publish workflow</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-slate-200">
                    {loginTime ? `Session started ${new Date(loginTime).toLocaleString()}` : "Session active"}
                  </span>
                </div>

                <h3 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Serious administration, clearer control, fewer distractions.
                </h3>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                  Use this dashboard as a command center for content, publishing, and operational work. The layout emphasizes hierarchy, fast access, and visible status.
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {dashboardHighlights.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
                      <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">System summary</p>
                    <h4 className="mt-2 text-xl font-semibold text-white">Dashboard health</h4>
                  </div>
                  <div className="rounded-full bg-white/10 p-3 text-cyan-300">
                    <FaShieldAlt />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-slate-900/60 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-slate-100">API metrics</p>
                        <p className="text-xs text-slate-400">Live counts from the backend</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statsError ? "bg-rose-500/20 text-rose-200" : "bg-emerald-500/20 text-emerald-200"}`}>
                        {statsError ? "Needs attention" : "Connected"}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-900/60 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-slate-100">Admin session</p>
                        <p className="text-xs text-slate-400">Protected with the current token</p>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">Active</span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-900/60 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-slate-100">Last refresh</p>
                        <p className="text-xs text-slate-400">Updated when metrics were loaded</p>
                      </div>
                      <span className="text-sm font-semibold text-white">{lastUpdated || "Waiting"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm leading-6 text-slate-300">
                  Keep global content in site settings, then use the module pages below for records, approvals, and publishing.
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
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Readiness</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">{readinessLabel}</p>
                    <p className="text-sm text-slate-500">{readinessScore}% of core areas populated</p>
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

              <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Fast access</p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-900">Find the right admin tool quickly</h3>
                      <p className="mt-2 text-sm text-slate-600">Search across modules to jump to the page you need instead of browsing through the whole sidebar.</p>
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

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
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
                </div>

                <div className="space-y-6">
                  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Quick actions</p>
                        <h3 className="mt-2 text-2xl font-bold text-slate-900">One-click access</h3>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                          <Link key={action.name} href={action.href} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white hover:shadow-lg">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.tone} text-white shadow-lg`}>
                              <Icon />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-slate-900">{action.name}</p>
                                <FaChevronRight className="text-xs text-slate-400 transition group-hover:translate-x-0.5" />
                              </div>
                              <p className="mt-1 text-sm leading-6 text-slate-600">{action.description}</p>
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

                      <button
                        onClick={publishAllSettings}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                      >
                        <FaCloudUploadAlt />
                        Publish all settings
                      </button>

                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-sm font-medium text-slate-200">Publishing states</p>
                        <div className="mt-3 space-y-3">
                          {[
                            {
                              label: "Homepage",
                              key: "homepage",
                              note: "Controls the public landing page visibility.",
                            },
                            {
                              label: "Research",
                              key: "research",
                              note: "Use this for publications, projects, and innovation content.",
                            },
                            {
                              label: "Operations",
                              key: "operations",
                              note: "Queue state for contacts and registrations.",
                            },
                          ].map((item) => {
                            const value = publishingStates[item.key];
                            const isPublished = value === "Published";

                            return (
                              <div key={item.key} className="rounded-2xl border border-white/10 bg-slate-900/50 p-3">
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <p className="text-sm font-semibold text-white">{item.label}</p>
                                    <p className="text-xs text-slate-400">{item.note}</p>
                                  </div>
                                  <button
                                    onClick={() => togglePublishingState(item.key)}
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                      isPublished ? "bg-emerald-500/15 text-emerald-200" : "bg-amber-500/15 text-amber-200"
                                    }`}
                                  >
                                    {value}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-white/5 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-slate-200">Recent edits</p>
                          <FaHistory className="text-slate-400" />
                        </div>
                        <div className="mt-3 space-y-3">
                          {auditLog.slice(0, 4).map((item) => (
                            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900/50 p-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
                                  {item.scope}
                                </span>
                                <span className="text-xs text-slate-400">{new Date(item.time).toLocaleString()}</span>
                              </div>
                              <p className="mt-2 text-sm font-semibold text-white">{item.title || item.action}</p>
                              <p className="text-xs leading-5 text-slate-300">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Activity log</p>
                        <h3 className="mt-2 text-2xl font-bold text-slate-900">Recent control points</h3>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {activityFeed.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                              <Icon />
                            </div>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="font-semibold text-slate-900">{item.title}</p>
                                <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                                  {item.meta}
                                </span>
                              </div>
                              <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                            </div>
                          </div>
                        );
                      })}
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
