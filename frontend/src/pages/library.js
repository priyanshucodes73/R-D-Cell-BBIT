import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import {
  defaultPublicSettings,
  fetcher,
  getApiBase,
  normalizeSiteSettings,
} from "../lib/siteSettings";

const defaultLibraryStats = [
  { value: "100,000+", label: "Books" },
  { value: "10,000+", label: "E-Journals" },
  { value: "500+", label: "Seating Capacity" },
  { value: "24/7", label: "Digital Access" },
  { value: "50+", label: "Databases" },
];

const defaultPhysicalCollections = [
  { icon: "📚", title: "Text Books", count: "50,000+", desc: "Comprehensive collection of prescribed textbooks for all programs" },
  { icon: "📖", title: "Reference Books", count: "20,000+", desc: "Encyclopedias, dictionaries, handbooks, and reference materials" },
  { icon: "📰", title: "Journals & Magazines", count: "500+", desc: "Print subscriptions to national and international journals" },
  { icon: "📜", title: "Theses & Dissertations", count: "5,000+", desc: "Archive of research work by BBIT students and faculty" },
  { icon: "🗞️", title: "Newspapers", count: "25+", desc: "Daily newspapers in English, Hindi, and regional languages" },
  { icon: "🎬", title: "Audio-Visual Materials", count: "1,000+", desc: "Educational DVDs, CDs, and multimedia resources" },
];

const defaultDigitalDatabases = [
  { name: "IEEE Xplore Digital Library", desc: "Access to millions of technical documents in engineering and computer science", type: "Engineering" },
  { name: "Springer Link", desc: "Full-text access to journals, books, and protocols in science and technology", type: "Science" },
  { name: "ScienceDirect (Elsevier)", desc: "Leading full-text scientific database covering all science disciplines", type: "Multidisciplinary" },
  { name: "JSTOR", desc: "Digital library of academic journals, books, and primary sources", type: "Arts & Sciences" },
  { name: "ProQuest Central", desc: "Comprehensive database spanning business, health, science, and more", type: "Multidisciplinary" },
  { name: "ACM Digital Library", desc: "Full-text collection of ACM publications in computing and IT", type: "Computer Science" },
  { name: "Emerald Insight", desc: "Management, business, and economics journals and books", type: "Management" },
  { name: "EBSCO Host", desc: "Academic research databases covering multiple subjects", type: "Multidisciplinary" },
];

const defaultServices = [
  { icon: "📋", title: "Issue & Return", desc: "Borrow up to 10 books for 15 days" },
  { icon: "🔍", title: "Reference Service", desc: "Help finding specific information" },
  { icon: "📤", title: "Inter-Library Loan", desc: "Access books from other libraries" },
  { icon: "📊", title: "Research Support", desc: "Assistance with research methodology" },
  { icon: "🎓", title: "Information Literacy", desc: "Training on database searching" },
  { icon: "📸", title: "Photocopy & Scan", desc: "Document reproduction services" },
  { icon: "💻", title: "Computer Access", desc: "Internet-enabled workstations" },
  { icon: "📚", title: "Book Reservation", desc: "Reserve books currently on loan" },
];

const defaultTimings = [
  { day: "Monday - Friday", time: "8:00 AM - 10:00 PM" },
  { day: "Saturday", time: "9:00 AM - 6:00 PM" },
  { day: "Sunday", time: "10:00 AM - 4:00 PM" },
  { day: "Digital Resources", time: "24/7 Access" },
];

const defaultRules = [
  "Carry your library card at all times",
  "Maintain silence in reading areas",
  "Mobile phones on silent mode",
  "No food or beverages inside",
  "Return books by due date to avoid fines",
  "Handle books and materials with care",
  "Report damaged or lost books immediately",
  "Use designated areas for group discussions",
];

const defaultContact = [
  { icon: "📧", value: "library@bbit.edu.in" },
  { icon: "📞", value: "+91-11-2345-6789" },
  { icon: "💬", value: "Live Chat Support" },
];

export default function Library({ fallback }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("physical");
  const apiBase = getApiBase();
  const { data: siteSettingsData } = useSWR(apiBase ? `${apiBase}/api/site-settings` : null, fetcher);
  const siteSettings = { ...defaultPublicSettings, ...normalizeSiteSettings(siteSettingsData) };
  const pageSettings = siteSettings.libraryPage || {};
  const libraryStats = pageSettings.stats || defaultLibraryStats;
  const physicalCollections = pageSettings.physicalCollections || defaultPhysicalCollections;
  const digitalDatabases = pageSettings.digitalDatabases || defaultDigitalDatabases;
  const services = pageSettings.services || defaultServices;
  const timings = pageSettings.timings || defaultTimings;
  const rules = pageSettings.rules || defaultRules;
  const contact = pageSettings.contact || defaultContact;

  return (
    <SWRConfig value={{ fallback }}>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 to-pink-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Library</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">{pageSettings.heroTitle || "BBIT Central Library"}</h1>
          <p className="text-xl opacity-90">{pageSettings.heroSubtitle || "Your gateway to knowledge and research excellence"}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {libraryStats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-purple-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
            Search Library Catalog
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by title, author, ISBN, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-purple-900 focus:outline-none text-lg"
            />
            <button className="bg-purple-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-800 transition">
              Search
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <button className="text-sm text-purple-700 hover:underline">
              Advanced Search
            </button>
            <button className="text-sm text-purple-700 hover:underline">
              Browse by Category
            </button>
            <button className="text-sm text-purple-700 hover:underline">
              New Arrivals
            </button>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-purple-900 text-center mb-12">
          Library Collections
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("physical")}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              activeTab === "physical"
                ? "bg-purple-900 text-white"
                : "bg-white text-purple-900 border-2 border-purple-900"
            }`}
          >
            Physical Resources
          </button>
          <button
            onClick={() => setActiveTab("digital")}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              activeTab === "digital"
                ? "bg-purple-900 text-white"
                : "bg-white text-purple-900 border-2 border-purple-900"
            }`}
          >
            Digital Resources
          </button>
        </div>

        {/* Physical Resources */}
        {activeTab === "physical" && (
          <div className="grid md:grid-cols-3 gap-8">
            {physicalCollections.map((collection, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
              >
                <div className="text-5xl mb-4 text-center">
                  {collection.icon}
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2 text-center">
                  {collection.title}
                </h3>
                <div className="text-2xl font-bold text-center text-pink-600 mb-3">
                  {collection.count}
                </div>
                <p className="text-gray-600 text-sm text-center">
                  {collection.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Digital Resources */}
        {activeTab === "digital" && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-purple-900 mb-6">
                E-Resources & Databases
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {digitalDatabases.map((db, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-purple-600 pl-4 py-3"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-purple-900">{db.name}</h4>
                      <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
                        {db.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{db.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                <div className="text-4xl mb-3">📱</div>
                <h4 className="text-xl font-bold text-purple-900 mb-2">
                  Mobile Access
                </h4>
                <p className="text-gray-700 text-sm">
                  Access e-resources anytime, anywhere via mobile app
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                <div className="text-4xl mb-3">🔐</div>
                <h4 className="text-xl font-bold text-purple-900 mb-2">
                  Remote Access
                </h4>
                <p className="text-gray-700 text-sm">
                  Off-campus access with institutional login credentials
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                <div className="text-4xl mb-3">📥</div>
                <h4 className="text-xl font-bold text-purple-900 mb-2">
                  Download & Save
                </h4>
                <p className="text-gray-700 text-sm">
                  Download articles and resources for offline reading
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Services */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-purple-900 text-center mb-12">
            Library Services
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition"
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-bold text-purple-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timings & Rules */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-purple-900 mb-6">
              Library Timings
            </h3>
            <div className="space-y-4">
              {timings.map((item, idx) => (
                <div key={idx} className="flex justify-between border-b pb-3 last:border-b-0 last:pb-0">
                  <span className="font-semibold text-gray-700">{item.day}</span>
                  <span className="text-purple-900 font-bold">{item.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Extended hours during examination
                periods. Holidays and special closures will be notified in
                advance.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-purple-900 mb-6">
              Library Rules
            </h3>
            <ul className="space-y-3">
              {rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-purple-600 text-xl">•</span>
                  <span className="text-gray-700">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Need Help?</h2>
          <p className="text-xl mb-8">
            Our librarians are here to assist you with research, resources, and
            any queries.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {contact.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          <button className="mt-8 bg-white text-purple-900 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
            Ask a Librarian
          </button>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";
  try {
    const res = await fetch(`${apiBase}/api/site-settings`);
    const siteSettingsData = await (res.ok ? res.json() : null);
    const fallback = {};
    if (siteSettingsData) fallback[apiBase + "/api/site-settings"] = siteSettingsData;
    return { props: { fallback } };
  } catch (e) {
    return { props: { fallback: {} } };
  }
}
