import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { fetchWithAuth } from "../../lib/auth";
import AdminPageShell from "../../components/admin/AdminPageShell";

export default function ProjectsManager() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    principal_investigator: "",
    co_investigators: "",
    funding_agency: "",
    amount: "",
    start_date: "",
    end_date: "",
    status: "Ongoing",
    department: "",
    description: "",
    objectives: "",
    outcomes: "",
    featured: false,
    file: null,
  });

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("adminToken");
      if (!isAuth) {
        router.push("/admin/login");
        return;
      }
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${apiBase}/api/projects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editMode
        ? `${apiBase}/api/projects/${formData.id}`
        : `${apiBase}/api/projects`;
      const method = editMode ? "PUT" : "POST";

      const payload = {
        title: formData.title,
        principalInvestigator: formData.principal_investigator,
        department: formData.department,
        fundingAgency: formData.funding_agency,
        fundingAmount: formData.amount,
        startDate: formData.start_date || null,
        endDate: formData.end_date || null,
        status: formData.status,
        description: formData.description,
        progress: parseInt(formData.progress, 10) || 0,
      };

      const response = await fetchWithAuth(url.replace(apiBase, ""), {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        if (formData.file) {
          try {
            const fd = new FormData();
            fd.append("file", formData.file);
            fd.append("featured", formData.featured ? "true" : "false");
            const upRes = await fetchWithAuth(`/api/projects/${data.id}/image`, { method: "POST", body: fd });
            if (!upRes.ok) {
              console.error("Project image attach failed", await upRes.text());
              alert("Project saved but image upload failed");
            }
          } catch (err) {
            console.error("Upload error", err);
            alert("Project saved but image upload failed");
          }
        }

        alert(`Project ${editMode ? "updated" : "added"} successfully!`);
        setShowForm(false);
        setEditMode(false);
        resetForm();
        fetchProjects();
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project");
    }
  };

  const handleEdit = (project) => {
    setFormData({
      id: project.id,
      title: project.title || "",
      principal_investigator: project.principalInvestigator || project.principal_investigator || "",
      co_investigators: project.co_investigators || project.coInvestigators || "",
      funding_agency: project.fundingAgency || project.funding_agency || "",
      amount: project.fundingAmount || project.amount || "",
      start_date: project.startDate || project.start_date || "",
      end_date: project.endDate || project.end_date || "",
      status: project.status || "Ongoing",
      department: project.department || "",
      description: project.description || "",
      objectives: project.objectives || "",
      outcomes: project.outcomes || "",
      progress: project.progress || 0,
      featured: !!project.featured,
      file: null,
    });
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetchWithAuth(`/api/projects/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Project deleted successfully!");
        fetchProjects();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      principal_investigator: "",
      co_investigators: "",
      funding_agency: "",
      amount: "",
      start_date: "",
      end_date: "",
      status: "Ongoing",
      department: "",
      description: "",
      objectives: "",
      outcomes: "",
    });
  };

  const filteredProjects = projects.filter((proj) =>
    proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proj.principal_investigator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminPageShell
      title="Research Projects"
      description="Track research projects with a cleaner control layout and faster access to records."
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchPlaceholder="Search projects..."
      summary={[
        { label: "Total", value: String(projects.length), note: "All project records in the system." },
        { label: "Filtered", value: String(filteredProjects.length), note: "Projects matching your search query." },
        { label: "Focus", value: "Research delivery", note: "Keep active work visible and organized." },
      ]}
      loading={loading}
      onRefresh={fetchProjects}
      primaryAction={
        <button
          onClick={() => {
            setShowForm(true);
            setEditMode(false);
            resetForm();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          <FaPlus /> Add Project
        </button>
      }
    >
      <div className="space-y-6">
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
              <div className="p-6 border-b bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-xl">
                <h2 className="text-2xl font-bold">
                  {editMode ? "Edit Project" : "Add New Project"}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Principal Investigator *</label>
                    <input
                      type="text"
                      required
                      value={formData.principal_investigator}
                      onChange={(e) => setFormData({ ...formData, principal_investigator: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Co-Investigators</label>
                    <input
                      type="text"
                      value={formData.co_investigators}
                      onChange={(e) => setFormData({ ...formData, co_investigators: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Funding Agency *</label>
                    <input
                      type="text"
                      required
                      value={formData.funding_agency}
                      onChange={(e) => setFormData({ ...formData, funding_agency: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Amount (₹)</label>
                    <input
                      type="text"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Department</label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    >
                      <option>Ongoing</option>
                      <option>Completed</option>
                      <option>Planned</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">End Date</label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Image</label>
                    <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={!!formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                      <span className="text-sm text-gray-700">Featured</span>
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Objectives</label>
                    <textarea
                      rows="3"
                      value={formData.objectives}
                      onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Outcomes</label>
                    <textarea
                      rows="3"
                      value={formData.outcomes}
                      onChange={(e) => setFormData({ ...formData, outcomes: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
                  >
                    {editMode ? "Update Project" : "Add Project"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditMode(false);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white/70">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
          </div>
        ) : (
          <div className="table-wrap">
            <div className="grid md:grid-cols-2 gap-4 responsive-cards">
              {filteredProjects.map((proj) => (
                <div key={proj.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      {proj.imageUrl ? (
                        <img src={proj.imageUrl} alt={proj.title} className="h-16 w-16 object-cover rounded-md mr-2" />
                      ) : (
                        <div className="h-16 w-16 bg-gray-100 rounded-md mr-2 flex items-center justify-center text-xs text-gray-400">No Img</div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{proj.title}</h3>
                        {proj.featured && <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">Featured</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(proj)}
                        className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>PI:</strong> {proj.principal_investigator}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Agency:</strong> {proj.funding_agency}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Amount:</strong> {proj.amount}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${proj.status === "Ongoing"
                        ? "bg-green-100 text-green-800"
                        : proj.status === "Completed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {proj.status}
                  </span>
                </div>
              ))}
              {filteredProjects.length === 0 && (
                <div className="col-span-2 rounded-[1.75rem] border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                  <p className="text-lg text-slate-500">No projects found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminPageShell>
  );
}
