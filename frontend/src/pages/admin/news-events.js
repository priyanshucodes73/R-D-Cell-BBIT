import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { fetchWithAuth } from "../../lib/auth";
import AdminPageShell from "../../components/admin/AdminPageShell";

export default function NewsEventsManager() {
  const router = useRouter();
  const [newsEvents, setNewsEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    type: "News",
    date: "",
    description: "",
    content: "",
    location: "",
    organizer: "",
    featured: false,
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
    fetchNewsEvents();
  }, []);

  const fetchNewsEvents = async () => {
    try {
      const response = await fetch(`${apiBase}/api/news-events`);
      const data = await response.json();
      setNewsEvents(data);
    } catch (error) {
      console.error("Error fetching news & events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editMode
        ? `${apiBase}/api/news-events/${formData.id}`
        : `${apiBase}/api/news-events`;
      const method = editMode ? "PUT" : "POST";

      const response = await fetchWithAuth(url.replace(apiBase, ""), {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`${formData.type} ${editMode ? "updated" : "added"} successfully!`);
        setShowForm(false);
        setEditMode(false);
        resetForm();
        fetchNewsEvents();
      }
    } catch (error) {
      console.error("Error saving news/event:", error);
      alert("Failed to save news/event");
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetchWithAuth(`/api/news-events/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Item deleted successfully!");
        fetchNewsEvents();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "News",
      date: "",
      description: "",
      content: "",
      location: "",
      organizer: "",
      featured: false,
    });
  };

  const filteredItems = newsEvents.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminPageShell
      title="News & Events"
      description="Publish announcements and event updates in a cleaner admin workspace."
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchPlaceholder="Search news & events..."
      summary={[
        { label: "Total", value: String(newsEvents.length), note: "All published news and event items." },
        { label: "Filtered", value: String(filteredItems.length), note: "Items matching your search." },
        { label: "Focus", value: "Publishing", note: "Keep announcements timely and visible." },
      ]}
      loading={loading}
      onRefresh={fetchNewsEvents}
      primaryAction={
        <button
          onClick={() => {
            setShowForm(true);
            setEditMode(false);
            resetForm();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 px-4 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          <FaPlus /> Add News/Event
        </button>
      }
    >
      <div className="space-y-6">
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
              <div className="p-6 border-b bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-xl">
                <h2 className="text-2xl font-bold">
                  {editMode ? "Edit Item" : "Add News/Event"}
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
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                    >
                      <option>News</option>
                      <option>Event</option>
                      <option>Workshop</option>
                      <option>Seminar</option>
                      <option>Conference</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Organizer</label>
                    <input
                      type="text"
                      value={formData.organizer}
                      onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Content</label>
                    <textarea
                      rows="5"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700 font-semibold">Featured</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 font-semibold"
                  >
                    {editMode ? "Update" : "Add"}
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
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-orange-600" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredItems.map((item) => (
              <div key={item.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.type === "News"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.type}
                      </span>
                      {item.featured && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                    <div className="flex gap-4 text-xs text-gray-500 mt-3">
                      <span>📅 {item.date}</span>
                      {item.location && <span>📍 {item.location}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-2 rounded-[1.75rem] border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                <p className="text-lg text-slate-500">No news or events found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminPageShell>
  );
}
