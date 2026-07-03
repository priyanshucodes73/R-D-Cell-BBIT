import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { fetchWithAuth } from "../../lib/auth";
import AdminPageShell from "../../components/admin/AdminPageShell";

export default function PublicationsManager() {
  const router = useRouter();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    journal: "",
    year: new Date().getFullYear(),
    doi: "",
    citation_count: 0,
    type: "Journal",
    abstract: "",
    keywords: "",
    impactFactor: "",
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
      setIsAuthenticated(true);
      fetchPublications();
    }
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await fetch(`${apiBase}/api/publications`);
      const data = await response.json();
      setPublications(data);
    } catch (error) {
      console.error("Error fetching publications:", error);
      alert("Failed to fetch publications");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editMode
        ? `${apiBase}/api/publications/${formData.id}`
        : `${apiBase}/api/publications`;
      const method = editMode ? "PUT" : "POST";

      const payload = {
        title: formData.title,
        authors: formData.authors,
        journal: formData.journal,
        year: parseInt(formData.year, 10) || new Date().getFullYear(),
        doi: formData.doi,
        citation_count: parseInt(formData.citation_count, 10) || 0,
        type: formData.type,
        abstract: formData.abstract,
        keywords: formData.keywords,
        impactFactor: formData.impactFactor || undefined,
        featured: formData.featured || false,
      };

      const response = await fetchWithAuth(url.replace(apiBase, ""), {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();

        // If a file was selected, upload and attach using dedicated endpoint
        if (formData.file) {
          try {
            const fd = new FormData();
            fd.append("file", formData.file);
            fd.append("featured", formData.featured ? "true" : "false");
            if (formData.impactFactor) fd.append("impactFactor", String(formData.impactFactor));
            const upRes = await fetchWithAuth(`/api/publications/${data.id}/image`, {
              method: "POST",
              body: fd,
            });
            if (!upRes.ok) {
              console.error("Image attach failed", await upRes.text());
              alert("Publication saved but image upload failed");
            }
          } catch (err) {
            console.error("Upload error", err);
            alert("Publication saved but image upload failed");
          }
        }

        alert(`Publication ${editMode ? "updated" : "added"} successfully!`);
        setShowForm(false);
        setEditMode(false);
        resetForm();
        fetchPublications();
      }
    } catch (error) {
      console.error("Error saving publication:", error);
      alert("Failed to save publication");
    }
  };

  const handleEdit = (publication) => {
    setFormData({
      id: publication.id,
      title: publication.title || "",
      authors: publication.authors || "",
      journal: publication.journal || "",
      year: publication.year || new Date().getFullYear(),
      doi: publication.doi || "",
      citation_count: publication.citation_count ?? publication.citations ?? 0,
      type: publication.type || "Journal",
      abstract: publication.abstract || "",
      keywords: publication.keywords || "",
      impactFactor: publication.impactFactor || "",
      featured: !!publication.featured,
      file: null,
    });
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;

    try {
      const response = await fetchWithAuth(`/api/publications/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Publication deleted successfully!");
        fetchPublications();
      }
    } catch (error) {
      console.error("Error deleting publication:", error);
      alert("Failed to delete publication");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      authors: "",
      journal: "",
      year: new Date().getFullYear(),
      doi: "",
      citation_count: 0,
      type: "Journal",
      abstract: "",
      keywords: "",
    });
  };

  const filteredPublications = publications.filter((pub) =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.authors.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminPageShell
      title="Publications Management"
      description="Manage research publications from a more polished, operational dashboard."
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchPlaceholder="Search publications by title or authors..."
      summary={[
        { label: "Total", value: String(publications.length), note: "All publication records in the system." },
        { label: "Filtered", value: String(filteredPublications.length), note: "Records matching your search query." },
        { label: "Focus", value: "Research output", note: "Keep research records current and visible." },
      ]}
      loading={loading}
      onRefresh={fetchPublications}
      primaryAction={
        <button
          onClick={() => {
            setShowForm(true);
            setEditMode(false);
            resetForm();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <FaPlus /> Add Publication
        </button>
      }
    >
      <div className="space-y-6">
        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
              <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
                <h2 className="text-2xl font-bold">
                  {editMode ? "Edit Publication" : "Add New Publication"}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Authors *</label>
                    <input
                      type="text"
                      required
                      value={formData.authors}
                      onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="John Doe, Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Journal *</label>
                    <input
                      type="text"
                      required
                      value={formData.journal}
                      onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Year *</label>
                    <input
                      type="number"
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option>Journal</option>
                      <option>Conference</option>
                      <option>Book Chapter</option>
                      <option>Patent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">DOI</label>
                    <input
                      type="text"
                      value={formData.doi}
                      onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Citation Count</label>
                    <input
                      type="number"
                      value={formData.citation_count}
                      onChange={(e) => setFormData({ ...formData, citation_count: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Impact Factor</label>
                    <input
                      type="text"
                      value={formData.impactFactor}
                      onChange={(e) => setFormData({ ...formData, impactFactor: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="e.g. 7.2"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={!!formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                      <span className="text-sm text-gray-700">Featured</span>
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Image</label>
                    <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0] || null; e.target.value = ''; setFormData({ ...formData, file: f }); }} />
                    {formData.file && <div className="text-xs text-gray-500 mt-1">Selected: {formData.file.name}</div>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Keywords</label>
                    <input
                      type="text"
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="AI, Machine Learning"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Abstract</label>
                    <textarea
                      rows="4"
                      value={formData.abstract}
                      onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    {editMode ? "Update Publication" : "Add Publication"}
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

        {/* Publications List */}
        {loading ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white/70">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          </div>
        ) : (
          <div className="table-wrap">
            <div className="space-y-4 responsive-cards">
              {filteredPublications.map((pub) => (
                <div key={pub.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        {pub.imageUrl ? (
                          <img src={pub.imageUrl} alt={pub.title} className="h-20 w-20 object-cover rounded-md mr-4" />
                        ) : (
                          <div className="h-20 w-20 bg-gray-100 rounded-md mr-4 flex items-center justify-center text-xs text-gray-400">No Image</div>
                        )}
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{pub.title}</h3>
                          {pub.featured && <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold mr-2">Featured</span>}
                          {pub.impactFactor && <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-semibold">IF: {pub.impactFactor}</span>}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2"><strong>Authors:</strong> {pub.authors}</p>
                      <p className="text-gray-600 mb-2"><strong>Journal:</strong> {pub.journal}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>📅 {pub.year}</span>
                        <span>📊 {pub.type}</span>
                        {pub.doi && <span>🔗 DOI: {pub.doi}</span>}
                        <span>📈 Citations: {pub.citation_count}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(pub)}
                        className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(pub.id)}
                        className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPublications.length === 0 && (
                <div className="rounded-[1.75rem] border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                  <p className="text-lg text-slate-500">No publications found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminPageShell>
  );
}
