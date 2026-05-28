import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function AllPublications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${apiBase}/api/publications`);
        const data = await response.json();
        setPublications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading publications:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [apiBase]);

  const normalizedPublications = useMemo(
    () =>
      publications.map((publication) => ({
        ...publication,
        citations: publication.citations ?? publication.citation_count ?? 0,
        keywords: Array.isArray(publication.keywords)
          ? publication.keywords
          : String(publication.keywords || "").split(",").map((keyword) => keyword.trim()).filter(Boolean),
      })),
    [publications]
  );

  const years = ["all", ...new Set(normalizedPublications.map((publication) => publication.year).filter(Boolean).sort((a, b) => b - a))];
  const types = ["all", ...new Set(normalizedPublications.map((publication) => publication.type).filter(Boolean))];

  const filteredPublications = normalizedPublications.filter((publication) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      [publication.title, publication.authors, publication.journal, publication.abstract]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    const matchesYear = selectedYear === "all" || String(publication.year) === String(selectedYear);
    const matchesType = selectedType === "all" || publication.type === selectedType;
    return matchesSearch && matchesYear && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-purple-200 hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Publications</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Research Publications</h1>
          <p className="text-xl opacity-90">Live publications from the admin-managed research database.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <input
            className="md:col-span-2 w-full px-4 py-3 border rounded-lg"
            placeholder="Search publications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select className="w-full px-4 py-3 border rounded-lg" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {years.map((year) => <option key={year} value={year}>{year === "all" ? "All Years" : year}</option>)}
          </select>
          <select className="w-full px-4 py-3 border rounded-lg" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            {types.map((type) => <option key={type} value={type}>{type === "all" ? "All Types" : type}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-600">Loading publications...</div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredPublications.map((publication) => (
              <div key={publication.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="text-2xl font-bold text-purple-900">{publication.title}</h2>
                    <p className="text-gray-600">{publication.authors || "Authors not set"}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">{publication.type || "Publication"}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
                  <div><span className="font-semibold">Journal/Conference:</span> {publication.journal || "Not set"}</div>
                  <div><span className="font-semibold">Year:</span> {publication.year || "Not set"}</div>
                  <div><span className="font-semibold">Citations:</span> {publication.citations}</div>
                  <div><span className="font-semibold">DOI:</span> {publication.doi || "Not set"}</div>
                </div>
                {publication.abstract && <p className="text-gray-700 leading-relaxed mb-4">{publication.abstract}</p>}
                {publication.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {publication.keywords.map((keyword) => (
                      <span key={keyword} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">{keyword}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && filteredPublications.length === 0 && (
          <div className="text-center py-16 text-gray-600">No publications match the selected filters.</div>
        )}
      </section>

      <section className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Collaborate with Our Researchers</h2>
          <p className="text-xl mb-8 opacity-90">
            Interested in joint publications or research collaboration? Get in touch with our faculty members.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact-us">
              <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg shadow-xl hover:bg-yellow-300 transition transform hover:scale-105 cursor-pointer">
                Contact Us
              </span>
            </Link>
            <Link href="/explore-research">
              <span className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition transform hover:scale-105 cursor-pointer">
                Explore Research
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
