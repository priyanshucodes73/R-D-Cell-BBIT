import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaArrowLeft, FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { fetchWithAuth } from "../../lib/auth";

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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <button className="p-3 bg-white rounded-lg shadow hover:bg-gray-50">
                <FaArrowLeft />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Research Projects</h1>
              <p className="text-gray-600">Manage research projects</p>
            </div>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
              resetForm();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg"
          >
            <FaPlus /> Add Project
          </button>
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="relative">
            <FaSearch className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">{proj.title}</h3>
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
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    proj.status === "Ongoing"
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
              <div className="col-span-2 text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500 text-lg">No projects found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
