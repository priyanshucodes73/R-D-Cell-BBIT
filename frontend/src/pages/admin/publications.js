import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaArrowLeft, FaEdit, FaTrash, FaPlus, FaEye, FaSearch } from "react-icons/fa";

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

      const token = localStorage.getItem("adminToken");
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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
    setFormData(publication);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${apiBase}/api/publications/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <button className="p-3 bg-white rounded-lg shadow hover:bg-gray-50">
                <FaArrowLeft />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Publications Management</h1>
              <p className="text-gray-600">Manage research publications</p>
            </div>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
              resetForm();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
          >
            <FaPlus /> Add Publication
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="relative">
            <FaSearch className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search publications by title or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPublications.map((pub) => (
              <div key={pub.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{pub.title}</h3>
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
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500 text-lg">No publications found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
