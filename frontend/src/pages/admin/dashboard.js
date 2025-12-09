import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  FaHome,
  FaBook,
  FaProjectDiagram,
  FaUsers,
  FaNewspaper,
  FaCertificate,
  FaEnvelope,
  FaUserGraduate,
  FaChartBar,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
} from "react-icons/fa";

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication only on client side
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("adminAuth");
      if (!isAuth) {
        router.push("/admin/login");
        return;
      }
    }

    // Fetch stats
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";
      const response = await fetch(`${apiBase}/api/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminLoginTime");
    router.push("/admin/login");
  };

  const menuItems = [
    { id: "overview", name: "Overview", icon: <FaHome />, href: "#" },
    { id: "publications", name: "Publications", icon: <FaBook />, href: "/admin/publications" },
    { id: "projects", name: "Research Projects", icon: <FaProjectDiagram />, href: "/admin/projects" },
    { id: "faculty", name: "Faculty", icon: <FaUsers />, href: "/admin/faculty" },
    { id: "news", name: "News & Events", icon: <FaNewspaper />, href: "/admin/news-events" },
    { id: "patents", name: "Patents", icon: <FaCertificate />, href: "/admin/patents" },
    { id: "contacts", name: "Contact Inquiries", icon: <FaEnvelope />, href: "/admin/contacts" },
    { id: "registrations", name: "Registrations", icon: <FaUserGraduate />, href: "/admin/registrations" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-900 to-indigo-900 text-white transition-all duration-300 z-50 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-2xl font-bold">BBIT Admin</h1>
                <p className="text-xs text-blue-300">R&D Cell Portal</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-blue-800 transition"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <div
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                  activeSection === item.id
                    ? "bg-blue-700 text-white"
                    : "hover:bg-blue-800"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </div>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition w-full"
          >
            <FaSignOutAlt className="text-xl" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-md p-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
              <p className="text-sm text-gray-600">
                Welcome back, Admin! Manage your R&D Cell
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">
                  {typeof window !== "undefined" && localStorage.getItem("adminEmail")}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <FaBook className="text-4xl opacity-80" />
                    <span className="text-3xl font-bold">{stats?.publications || 0}</span>
                  </div>
                  <h3 className="text-lg font-semibold">Publications</h3>
                  <p className="text-sm opacity-80">Total research papers</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <FaProjectDiagram className="text-4xl opacity-80" />
                    <span className="text-3xl font-bold">{stats?.projects || 0}</span>
                  </div>
                  <h3 className="text-lg font-semibold">Research Projects</h3>
                  <p className="text-sm opacity-80">Active: {stats?.activeProjects || 0}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <FaUsers className="text-4xl opacity-80" />
                    <span className="text-3xl font-bold">{stats?.faculty || 0}</span>
                  </div>
                  <h3 className="text-lg font-semibold">Faculty Members</h3>
                  <p className="text-sm opacity-80">Research staff</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <FaCertificate className="text-4xl opacity-80" />
                    <span className="text-3xl font-bold">{stats?.patents || 0}</span>
                  </div>
                  <h3 className="text-lg font-semibold">Patents</h3>
                  <p className="text-sm opacity-80">Filed & Granted</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/admin/publications">
                    <button className="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                      <FaPlus className="text-3xl text-blue-600 mb-2" />
                      <span className="text-sm font-semibold text-gray-700">Add Publication</span>
                    </button>
                  </Link>
                  <Link href="/admin/projects">
                    <button className="flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 rounded-lg transition">
                      <FaPlus className="text-3xl text-green-600 mb-2" />
                      <span className="text-sm font-semibold text-gray-700">Add Project</span>
                    </button>
                  </Link>
                  <Link href="/admin/faculty">
                    <button className="flex flex-col items-center justify-center p-6 bg-purple-50 hover:bg-purple-100 rounded-lg transition">
                      <FaPlus className="text-3xl text-purple-600 mb-2" />
                      <span className="text-sm font-semibold text-gray-700">Add Faculty</span>
                    </button>
                  </Link>
                  <Link href="/admin/news-events">
                    <button className="flex flex-col items-center justify-center p-6 bg-orange-50 hover:bg-orange-100 rounded-lg transition">
                      <FaPlus className="text-3xl text-orange-600 mb-2" />
                      <span className="text-sm font-semibold text-gray-700">Add News</span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Publications</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-600">
                      <p className="font-semibold text-gray-800 text-sm">
                        Deep Learning for Healthcare
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Published: 2024</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-600">
                      <p className="font-semibold text-gray-800 text-sm">
                        IoT Smart Campus
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Published: 2024</p>
                    </div>
                  </div>
                  <Link href="/admin/publications">
                    <button className="mt-4 text-blue-600 hover:text-blue-800 font-semibold text-sm">
                      View All →
                    </button>
                  </Link>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Database</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        Connected
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">API Server</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        Running
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Frontend</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
