import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function AllNewsEvents() {
  const [newsEvents, setNewsEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${apiBase}/api/news-events`);
        const data = await response.json();
        setNewsEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading news and events:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [apiBase]);

  const normalizedNewsEvents = useMemo(
    () =>
      newsEvents.map((item) => ({
        ...item,
        date: item.date || item.createdAt || "",
        location: item.venue || item.location || "",
        image: item.imageUrl || "📰",
      })),
    [newsEvents]
  );

  const categories = ["all", ...new Set(normalizedNewsEvents.map((item) => item.category).filter(Boolean))];
  const years = [
    "all",
    ...new Set(
      normalizedNewsEvents
        .map((item) => {
          const year = new Date(item.date).getFullYear();
          return Number.isNaN(year) ? null : year;
        })
        .filter(Boolean)
        .sort((a, b) => b - a)
    ),
  ];

  const filteredNewsEvents = normalizedNewsEvents.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      [item.title, item.description, item.organizer, item.location]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesYear = selectedYear === "all" || String(new Date(item.date).getFullYear()) === String(selectedYear);
    return matchesSearch && matchesCategory && matchesYear;
  });

  const stats = {
    total: normalizedNewsEvents.length,
    events: normalizedNewsEvents.filter((item) => ["Event", "Workshop", "Conference"].includes(item.category)).length,
    awards: normalizedNewsEvents.filter((item) => ["Award", "Achievement"].includes(item.category)).length,
    collaborations: normalizedNewsEvents.filter((item) => item.category === "Collaboration").length,
  };

  const formatDate = (value) => {
    if (!value) return "Not set";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-200 hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>News & Events</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Latest News & Events</h1>
          <p className="text-xl opacity-90">Live updates from the admin-managed news and events database.</p>
        </div>
      </section>

      <section className="bg-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><div className="text-4xl font-bold text-orange-600 mb-2">{stats.total}</div><div className="text-gray-600">Total Updates</div></div>
          <div><div className="text-4xl font-bold text-blue-600 mb-2">{stats.events}</div><div className="text-gray-600">Events & Workshops</div></div>
          <div><div className="text-4xl font-bold text-green-600 mb-2">{stats.awards}</div><div className="text-gray-600">Awards & Achievements</div></div>
          <div><div className="text-4xl font-bold text-purple-600 mb-2">{stats.collaborations}</div><div className="text-gray-600">Collaborations</div></div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <input
            className="md:col-span-2 w-full px-4 py-3 border rounded-lg"
            placeholder="Search news and events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select className="w-full px-4 py-3 border rounded-lg" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((category) => <option key={category} value={category}>{category === "all" ? "All Categories" : category}</option>)}
          </select>
          <select className="w-full px-4 py-3 border rounded-lg" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {years.map((year) => <option key={year} value={year}>{year === "all" ? "All Years" : year}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-600">Loading news and events...</div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredNewsEvents.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="text-4xl mb-2">{item.image}</div>
                    <h2 className="text-2xl font-bold text-orange-900">{item.title}</h2>
                    <p className="text-gray-500 text-sm">{formatDate(item.date)}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">{item.category || "Update"}</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{item.description || "No description available."}</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div><span className="font-semibold">Location:</span> {item.location || "Not set"}</div>
                  <div><span className="font-semibold">Organizer:</span> {item.organizer || "Not set"}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredNewsEvents.length === 0 && (
          <div className="text-center py-16 text-gray-600">No news or events match the selected filters.</div>
        )}
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
