import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { fetchWithAuth } from "../../lib/auth";
import AdminPageShell from "../../components/admin/AdminPageShell";

export default function PatentsManager() {
  const router = useRouter();
  const [patents, setPatents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    inventors: "",
    application_number: "",
    filing_date: "",
    status: "Filed",
    patent_number: "",
    grant_date: "",
    description: "",
    category: "",
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
    fetchPatents();
  }, []);

  const fetchPatents = async () => {
    try {
      const response = await fetch(`${apiBase}/api/patents`);
      const data = await response.json();
      setPatents(data);
    } catch (error) {
      console.error("Error fetching patents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editMode
        ? `${apiBase}/api/patents/${formData.id}`
        : `${apiBase}/api/patents`;
      const method = editMode ? "PUT" : "POST";

      const response = await fetchWithAuth(url.replace(apiBase, ""), {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Patent ${editMode ? "updated" : "added"} successfully!`);
        setShowForm(false);
        setEditMode(false);
        resetForm();
        fetchPatents();
      }
    } catch (error) {
      console.error("Error saving patent:", error);
      alert("Failed to save patent");
    }
  };

  const handleEdit = (patent) => {
    setFormData(patent);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this patent?")) return;

    try {
      const response = await fetchWithAuth(`/api/patents/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Patent deleted successfully!");
        fetchPatents();
      }
    } catch (error) {
      console.error("Error deleting patent:", error);
      alert("Failed to delete patent");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      inventors: "",
      application_number: "",
      filing_date: "",
      status: "Filed",
      patent_number: "",
      grant_date: "",
      description: "",
      category: "",
    });
  };

  const filteredPatents = patents.filter((patent) =>
    patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patent.inventors.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminPageShell
      title="Patents Management"
      description="Track intellectual property records in a cleaner, more serious workspace."
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchPlaceholder="Search patents..."
      summary={[
        { label: "Total", value: String(patents.length), note: "All patent records in the system." },
        { label: "Filtered", value: String(filteredPatents.length), note: "Records matching your search." },
        { label: "Focus", value: "IP tracking", note: "Keep filing, status, and grants visible." },
      ]}
      loading={loading}
      onRefresh={fetchPatents}
      primaryAction={
        <button
          onClick={() => {
            setShowForm(true);
            setEditMode(false);
            resetForm();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          <FaPlus /> Add Patent
        </button>
      }
    >
      <div className="space-y-6">
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
              <div className="p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-xl">
                <h2 className="text-2xl font-bold">
                  {editMode ? "Edit Patent" : "Add New Patent"}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Patent Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Inventors *</label>
                    <input
                      type="text"
                      required
                      value={formData.inventors}
                      onChange={(e) => setFormData({ ...formData, inventors: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                      placeholder="John Doe, Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Application Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.application_number}
                      onChange={(e) => setFormData({ ...formData, application_number: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Patent Number</label>
                    <input
                      type="text"
                      value={formData.patent_number}
                      onChange={(e) => setFormData({ ...formData, patent_number: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Filing Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.filing_date}
                      onChange={(e) => setFormData({ ...formData, filing_date: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Grant Date</label>
                    <input
                      type="date"
                      value={formData.grant_date}
                      onChange={(e) => setFormData({ ...formData, grant_date: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    >
                      <option>Filed</option>
                      <option>Published</option>
                      <option>Granted</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                      rows="5"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-semibold"
                  >
                    {editMode ? "Update Patent" : "Add Patent"}
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
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
          </div>
        ) : (
          <div className="table-wrap">
            <div className="grid gap-4 md:grid-cols-2 responsive-cards">
              {filteredPatents.map((patent) => (
                <div key={patent.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${patent.status === "Granted"
                            ? "bg-green-100 text-green-800"
                            : patent.status === "Published"
                              ? "bg-blue-100 text-blue-800"
                              : patent.status === "Filed"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                      >
                        {patent.status}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 mt-3">{patent.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Inventors:</strong> {patent.inventors}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Application No:</strong> {patent.application_number}
                      </p>
                      {patent.patent_number && (
                        <p className="text-sm text-gray-600">
                          <strong>Patent No:</strong> {patent.patent_number}
                        </p>
                      )}
                      <div className="flex gap-4 text-xs text-gray-500 mt-3">
                        <span>📅 Filed: {patent.filing_date}</span>
                        {patent.grant_date && <span>✅ Granted: {patent.grant_date}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(patent)}
                        className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(patent.id)}
                        className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPatents.length === 0 && (
                <div className="col-span-2 rounded-[1.75rem] border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                  <p className="text-lg text-slate-500">No patents found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminPageShell>
  );
}
