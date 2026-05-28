import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(`${apiBase}/api/projects`);
        const data = await response.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [apiBase]);

  const normalizedProjects = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        principalInvestigator: project.principalInvestigator || project.principal_investigator || "",
        fundingAgency: project.fundingAgency || project.funding_agency || "",
        fundingAmount: project.fundingAmount || project.amount || "",
        startDate: project.startDate || project.start_date || "",
        endDate: project.endDate || project.end_date || "",
        description: project.description || "",
      })),
    [projects]
  );

  const departments = ["all", ...new Set(normalizedProjects.map((project) => project.department).filter(Boolean))];
  const statuses = ["all", ...new Set(normalizedProjects.map((project) => project.status).filter(Boolean))];

  const filteredProjects = normalizedProjects.filter((project) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      [project.title, project.principalInvestigator, project.department, project.fundingAgency, project.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    const matchesDepartment = selectedDepartment === "all" || project.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const stats = {
    total: normalizedProjects.length,
    active: normalizedProjects.filter((project) => String(project.status).toLowerCase() === "ongoing" || String(project.status).toLowerCase() === "active").length,
    completed: normalizedProjects.filter((project) => String(project.status).toLowerCase() === "completed").length,
  };

  const formatDate = (value) => {
    if (!value) return "Not set";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-blue-200 hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Projects</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Research Projects</h1>
          <p className="text-xl opacity-90">Live project data from the admin-managed research database.</p>
        </div>
      </section>

      <section className="bg-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div><div className="text-4xl font-bold text-blue-700">{stats.total}</div><div className="text-gray-600">Total Projects</div></div>
          <div><div className="text-4xl font-bold text-green-600">{stats.active}</div><div className="text-gray-600">Active Projects</div></div>
          <div><div className="text-4xl font-bold text-purple-600">{stats.completed}</div><div className="text-gray-600">Completed Projects</div></div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <input className="md:col-span-2 w-full px-4 py-3 border rounded-lg" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <select className="w-full px-4 py-3 border rounded-lg" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            {departments.map((department) => <option key={department} value={department}>{department === "all" ? "All Departments" : department}</option>)}
          </select>
          <select className="w-full px-4 py-3 border rounded-lg" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            {statuses.map((status) => <option key={status} value={status}>{status === "all" ? "All Statuses" : status}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-600">Loading projects...</div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-900">{project.title}</h2>
                    <p className="text-gray-600">{project.principalInvestigator || "Not set"}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">{project.status || "Unknown"}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
                  <div><span className="font-semibold">Department:</span> {project.department || "Not set"}</div>
                  <div><span className="font-semibold">Funding:</span> {project.fundingAgency || "Not set"}</div>
                  <div><span className="font-semibold">Amount:</span> {project.fundingAmount || "Not set"}</div>
                  <div><span className="font-semibold">Timeline:</span> {formatDate(project.startDate)} - {formatDate(project.endDate)}</div>
                </div>
                <p className="text-gray-700 leading-relaxed">{project.description || "No description available."}</p>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-16 text-gray-600">No projects match the selected filters.</div>
        )}
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
                    project.principalInvestigator || project.principal_investigator || "",
                  fundingAgency: project.fundingAgency || project.funding_agency || "",
                  fundingAmount: project.fundingAmount || project.amount || "",
                  startDate: project.startDate || project.start_date || "",
                  endDate: project.endDate || project.end_date || "",
                  description: project.description || "",
                })),
              [projects]
            );

            const departments = ["all", ...new Set(normalizedProjects.map((project) => project.department).filter(Boolean))];
            const statuses = ["all", ...new Set(normalizedProjects.map((project) => project.status).filter(Boolean))];

            const filteredProjects = normalizedProjects.filter((project) => {
              const query = searchQuery.toLowerCase();
              const matchesSearch =
                !query ||
                [project.title, project.principalInvestigator, project.department, project.fundingAgency, project.status]
                  .filter(Boolean)
                  .some((value) => String(value).toLowerCase().includes(query));
              const matchesDepartment = selectedDepartment === "all" || project.department === selectedDepartment;
              const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
              return matchesSearch && matchesDepartment && matchesStatus;
            });

            const stats = {
              total: normalizedProjects.length,
              active: normalizedProjects.filter((project) => String(project.status).toLowerCase() === "ongoing" || String(project.status).toLowerCase() === "active").length,
              completed: normalizedProjects.filter((project) => String(project.status).toLowerCase() === "completed").length,
            };

            const formatDate = (value) => {
              if (!value) return "Not set";
              const date = new Date(value);
              return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
            };

            return (
              <div className="min-h-screen bg-gray-50">
                <section className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white py-20">
                  <div className="max-w-6xl mx-auto px-4">
                    <div className="mb-4">
                      <Link href="/" className="text-blue-200 hover:underline">Home</Link>
                      <span className="mx-2">/</span>
                      <span>Projects</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-4">Research Projects</h1>
                    <p className="text-xl opacity-90">Live project data from the admin-managed research database.</p>
                  </div>
                </section>

                <section className="bg-white py-12 shadow-md">
                  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div><div className="text-4xl font-bold text-blue-700">{stats.total}</div><div className="text-gray-600">Total Projects</div></div>
                    <div><div className="text-4xl font-bold text-green-600">{stats.active}</div><div className="text-gray-600">Active Projects</div></div>
                    <div><div className="text-4xl font-bold text-purple-600">{stats.completed}</div><div className="text-gray-600">Completed Projects</div></div>
                  </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 py-10">
                  <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <input className="md:col-span-2 w-full px-4 py-3 border rounded-lg" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <select className="w-full px-4 py-3 border rounded-lg" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                      {departments.map((department) => <option key={department} value={department}>{department === "all" ? "All Departments" : department}</option>)}
                    </select>
                    <select className="w-full px-4 py-3 border rounded-lg" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                      {statuses.map((status) => <option key={status} value={status}>{status === "all" ? "All Statuses" : status}</option>)}
                    </select>
                  </div>

                  {loading ? (
                    <div className="text-center py-16 text-gray-600">Loading projects...</div>
                  ) : (
                    <div className="grid lg:grid-cols-2 gap-6">
                      {filteredProjects.map((project) => (
                        <div key={project.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h2 className="text-2xl font-bold text-blue-900">{project.title}</h2>
                              <p className="text-gray-600">{project.principalInvestigator || "Not set"}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">{project.status || "Unknown"}</span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
                            <div><span className="font-semibold">Department:</span> {project.department || "Not set"}</div>
                            <div><span className="font-semibold">Funding:</span> {project.fundingAgency || "Not set"}</div>
                            <div><span className="font-semibold">Amount:</span> {project.fundingAmount || "Not set"}</div>
                            <div><span className="font-semibold">Timeline:</span> {formatDate(project.startDate)} - {formatDate(project.endDate)}</div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{project.description || "No description available."}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {!loading && filteredProjects.length === 0 && (
                    <div className="text-center py-16 text-gray-600">No projects match the selected filters.</div>
                  )}
                </section>

                <Footer />
                <Chatbot />
              </div>
            );
                      {project.coInvestigators.join(", ")}
