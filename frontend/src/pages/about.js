import useSWR, { SWRConfig } from "swr";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";
import { defaultPublicSettings, fetcher, getApiBase, normalizeSiteSettings } from "../lib/siteSettings";

export default function About({ fallback }) {
  const apiBase = getApiBase();
  const { data: siteSettingsData } = useSWR(apiBase + "/api/site-settings", fetcher);
  const siteSettings = { ...defaultPublicSettings, ...normalizeSiteSettings(siteSettingsData) };
  const aboutPage = siteSettings.aboutPage || defaultPublicSettings.aboutPage;

  return (
    <SWRConfig value={{ fallback }}>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>About Us</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">{aboutPage.heroTitle}</h1>
          <p className="text-xl opacity-90">{aboutPage.heroSubtitle}</p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Overview</h2>
          <div className="prose max-w-none">
            {aboutPage.overview.map((paragraph) => (
              <p key={paragraph} className="text-gray-700 text-lg mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 border-t-4 border-blue-600">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-700">{aboutPage.vision}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-lg p-8 border-t-4 border-green-600">
            <div className="text-5xl mb-4">🧭</div>
            <h3 className="text-2xl font-bold text-green-900 mb-4">
              Our Mission
            </h3>
            <ul className="space-y-2 text-gray-700">
              {aboutPage.mission.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Aims and Objectives */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Aims and Objectives
          </h2>
          <ul className="space-y-3 text-gray-700">
            {aboutPage.aims.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">◦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {aboutPage.values.map((value, index) => (
              <div key={value.title} className={`text-center p-6 rounded-lg ${index % 2 === 0 ? "bg-blue-50" : index % 3 === 0 ? "bg-yellow-50" : index % 3 === 1 ? "bg-green-50" : "bg-purple-50"}`}>
                <div className="text-4xl mb-3">{["⭐", "🤝", "💡", "📚", "🌎", "🤝"][index % 6]}</div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Our Leadership
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                JG
              </div>
              <h3 className="font-bold text-xl mb-1">Shri Jagannath Gupta</h3>
              <p className="text-blue-600 font-semibold mb-2">Chairman</p>
              <p className="text-sm text-gray-600">
                Visionary leader with extensive experience in education
                management
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                SG
              </div>
              <h3 className="font-bold text-xl mb-1">Dr. Shubhangi Gupta</h3>
              <p className="text-green-600 font-semibold mb-2">
                Executive Director
              </p>
              <p className="text-sm text-gray-600">
                Leading institution's strategic growth and academic excellence
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                SM
              </div>
              <h3 className="font-bold text-xl mb-1">
                Prof. (Dr.) Sandeep Malik
              </h3>
              <p className="text-purple-600 font-semibold mb-2">Principal</p>
              <p className="text-sm text-gray-600">
                Dedicated to fostering academic excellence and student
                development
              </p>
            </div>
          </div>
        </div>

        {/* Recognition & Approvals */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Recognition & Accreditations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="text-4xl">🏆</div>
              <div>
                <h3 className="font-bold text-lg">NBA Accredited</h3>
                <p className="text-sm text-gray-600">
                  CSE, EE, ECE, ME departments accredited by National Board of
                  Accreditation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="text-4xl">⭐</div>
              <div>
                <h3 className="font-bold text-lg">NAAC Accredited</h3>
                <p className="text-sm text-gray-600">
                  National Assessment and Accreditation Council
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="text-4xl">🎓</div>
              <div>
                <h3 className="font-bold text-lg">MAKAUT Affiliated</h3>
                <p className="text-sm text-gray-600">
                  Maulana Abul Kalam Azad University of Technology
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="text-4xl">📜</div>
              <div>
                <h3 className="font-bold text-lg">WBSCTVESD Affiliated</h3>
                <p className="text-sm text-gray-600">
                  West Bengal State Council of Technical & Vocational Education
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="text-4xl">✓</div>
              <div>
                <h3 className="font-bold text-lg">UGC Recognized</h3>
                <p className="text-sm text-gray-600">
                  University Grants Commission
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Rankings */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Awards & Rankings
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <h3 className="font-bold text-lg mb-1">
                Best Engineering College 2024
              </h3>
              <p className="text-sm text-gray-600">
                Times Engineering Excellence Awards
              </p>
            </div>
            <div className="border-l-4 border-green-600 pl-4 py-2">
              <h3 className="font-bold text-lg mb-1">
                Top 50 Engineering Colleges in India
              </h3>
              <p className="text-sm text-gray-600">NIRF Ranking 2024</p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4 py-2">
              <h3 className="font-bold text-lg mb-1">
                Excellence in Research Award
              </h3>
              <p className="text-sm text-gray-600">
                Indian Education Congress 2023
              </p>
            </div>
            <div className="border-l-4 border-orange-600 pl-4 py-2">
              <h3 className="font-bold text-lg mb-1">Best Placement Record</h3>
              <p className="text-sm text-gray-600">
                Higher Education Forum 2024
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">
            BBIT at a Glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <div className="text-sm opacity-90">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Faculty Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-sm opacity-90">Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-sm opacity-90">Research Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">300+</div>
              <div className="text-sm opacity-90">Industry Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-sm opacity-90">Alumni Network</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-sm opacity-90">Years of Excellence</div>
            </div>
          </div>
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
