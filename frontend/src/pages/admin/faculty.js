import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { fetchWithAuth } from "../../lib/auth";
import AdminPageShell from "../../components/admin/AdminPageShell";

export default function FacultyManager() {
  const router = useRouter();
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    department: "",
    email: "",
    phone: "",
    research_interests: "",
    qualifications: "",
    experience_years: 0,
    publications_count: 0,
    projects_count: 0,
    bio: "",
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
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await fetch(`${apiBase}/api/faculty`);
      const data = await response.json();
      setFaculty(data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editMode
        ? `${apiBase}/api/faculty/${formData.id}`
        : `${apiBase}/api/faculty`;
      const method = editMode ? "PUT" : "POST";

      // Map admin form fields to backend model fields
      const payload = {
        name: formData.name,
        designation: formData.designation,
        department: formData.department,
        email: formData.email,
        phone: formData.phone,
        qualifications: formData.qualifications,
        experience: parseInt(formData.experience_years) || 0,
        publications: parseInt(formData.publications_count) || 0,
        projects: parseInt(formData.projects_count) || 0,
        researchInterests: formData.research_interests,
        bio: formData.bio,
      };

      const response = await fetchWithAuth(url.replace(apiBase, ""), {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(`Faculty ${editMode ? "updated" : "added"} successfully!`);
        setShowForm(false);
        setEditMode(false);
        resetForm();
        fetchFaculty();
      }
    } catch (error) {
      console.error("Error saving faculty:", error);
      alert("Failed to save faculty");
    }
  };

  const handleEdit = (member) => {
    // Map backend member fields into admin form shape
    setFormData({
      id: member.id,
      name: member.name || "",
      designation: member.designation || "",
      department: member.department || "",
      email: member.email || "",
      phone: member.phone || "",
      qualifications: member.qualifications || "",
      experience_years: member.experience || 0,
      publications_count: member.publications || 0,
      projects_count: member.projects || 0,
      research_interests: member.researchInterests || "",
      bio: member.bio || "",
    });
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this faculty member?")) return;

    try {
      const response = await fetchWithAuth(`/api/faculty/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Faculty member deleted successfully!");
        fetchFaculty();
      }
    } catch (error) {
      console.error("Error deleting faculty:", error);
      alert("Failed to delete faculty");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      designation: "",
      department: "",
      email: "",
      phone: "",
      research_interests: "",
      qualifications: "",
      experience_years: 0,
      publications_count: 0,
      projects_count: 0,
      bio: "",
    });
  };

  const filteredFaculty = faculty.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminPageShell
      title="Faculty Management"
      description="Maintain faculty profiles in a cleaner, more professional control surface."
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchPlaceholder="Search faculty..."
      summary={[
        { label: "Total", value: String(faculty.length), note: "All faculty records currently available." },
        { label: "Filtered", value: String(filteredFaculty.length), note: "Records matching your search." },
        { label: "Focus", value: "Profiles", note: "Keep roles, research, and bios updated." },
      ]}
      loading={loading}
      onRefresh={fetchFaculty}
      primaryAction={
        <button
          onClick={() => {
            setShowForm(true);
            setEditMode(false);
            resetForm();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700"
        >
          <FaPlus /> Add Faculty
        </button>
      }
    >
      <div className="space-y-6">
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
              <div className="p-6 border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl">
                <h2 className="text-2xl font-bold">
                  {editMode ? "Edit Faculty" : "Add New Faculty"}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Designation *</label>
                    <input
                      type="text"
                      required
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Department *</label>
                    <input
                      type="text"
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Qualifications</label>
                    <input
                      type="text"
                      value={formData.qualifications}
                      onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="Ph.D., M.Tech"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Experience (Years)</label>
                    <input
                      type="number"
                      value={formData.experience_years}
                      onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Publications Count</label>
                    <input
                      type="number"
                      value={formData.publications_count}
                      onChange={(e) => setFormData({ ...formData, publications_count: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Projects Count</label>
                    <input
                      type="number"
                      value={formData.projects_count}
                      onChange={(e) => setFormData({ ...formData, projects_count: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Research Interests</label>
                    <input
                      type="text"
                      value={formData.research_interests}
                      onChange={(e) => setFormData({ ...formData, research_interests: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="AI, Machine Learning, IoT"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Bio</label>
                    <textarea
                      rows="4"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold"
                  >
                    {editMode ? "Update Faculty" : "Add Faculty"}
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
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-purple-600" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredFaculty.map((f) => (
              <div key={f.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {f.name.charAt(0)}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(f)}
                      className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800">{f.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{f.designation}</p>
                <p className="text-sm text-gray-600 mb-2">{f.department}</p>
                <p className="text-sm text-blue-600 mb-2">{f.email}</p>
                <div className="flex gap-4 text-xs text-gray-500 mt-3">
                  <span>📚 {f.publications || f.publications_count || 0} Pubs</span>
                  <span>📊 {f.projects || f.projects_count || 0} Projects</span>
                  <span>⏱️ {f.experience || f.experience_years || 0}y Exp</span>
                </div>
              </div>
            ))}
            {filteredFaculty.length === 0 && (
              <div className="col-span-3 rounded-[1.75rem] border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                <p className="text-lg text-slate-500">No faculty members found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminPageShell>
  );
}
