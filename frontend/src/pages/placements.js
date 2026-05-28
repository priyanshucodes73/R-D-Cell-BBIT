import useSWR, { SWRConfig } from "swr";
import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";
import { defaultPublicSettings, fetcher, getApiBase, normalizeSiteSettings } from "../lib/siteSettings";

export default function Placements({ fallback }) {
  const [activeTab, setActiveTab] = useState("overview");
  const apiBase = getApiBase();
  const { data: siteSettingsData } = useSWR(apiBase + "/api/site-settings", fetcher);
  const siteSettings = { ...defaultPublicSettings, ...normalizeSiteSettings(siteSettingsData) };
  const placementsPage = siteSettings.placementsPage || defaultPublicSettings.placementsPage;

  const placementStats = placementsPage.placementStats || [];

  const topRecruiters = [
    { name: "Google", logo: "🔵", package: "₹45 LPA", offers: 8 },
    { name: "Microsoft", logo: "💻", package: "₹42 LPA", offers: 12 },
    { name: "Amazon", logo: "📦", package: "₹38 LPA", offers: 15 },
    { name: "Goldman Sachs", logo: "💼", package: "₹40 LPA", offers: 6 },
    { name: "Deloitte", logo: "🟢", package: "₹15 LPA", offers: 25 },
    { name: "TCS", logo: "💎", package: "₹7 LPA", offers: 120 },
    { name: "Infosys", logo: "🔷", package: "₹6.5 LPA", offers: 100 },
    { name: "Wipro", logo: "🟠", package: "₹6 LPA", offers: 90 },
    { name: "Cognizant", logo: "🔵", package: "₹7.5 LPA", offers: 80 },
    { name: "Accenture", logo: "🟣", package: "₹8 LPA", offers: 70 },
    { name: "IBM", logo: "🔷", package: "₹9 LPA", offers: 45 },
    { name: "Adobe", logo: "🔴", package: "₹25 LPA", offers: 10 },
    { name: "Intel", logo: "🔵", package: "₹22 LPA", offers: 8 },
    { name: "NVIDIA", logo: "🟢", package: "₹35 LPA", offers: 5 },
    { name: "Cisco", logo: "🔵", package: "₹18 LPA", offers: 12 },
  ];

  const placementProcess = placementsPage.placementProcess || [];

  const industryWise = placementsPage.industryWise || [];

  const successStories = placementsPage.successStories || [];

  const placementTeam = placementsPage.placementTeam || [];

  return (
    <SWRConfig value={{ fallback }}>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-900 via-teal-900 to-green-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Placements</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">{placementsPage.heroTitle}</h1>
          <p className="text-xl opacity-90">{placementsPage.heroSubtitle}</p>
        </div>
      </section>

      {/* Placement Stats Banner */}
      <section className="bg-white py-8 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {placementStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className={`text-4xl font-bold text-${stat.color}-900`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["overview", "recruiters", "process", "success"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full font-semibold transition text-lg ${
                activeTab === tab
                  ? "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <h2 className="text-3xl font-bold text-green-900 text-center mb-8">
              Placement Overview 2024
            </h2>

            {/* Industry-wise Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-green-900 mb-6">
                Industry-wise Placement Data
              </h3>
              <div className="space-y-4">
                {industryWise.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition"
                  >
                    <div>
                      <div className="text-sm text-gray-600">Industry</div>
                      <div className="font-bold text-green-900">
                        {item.industry}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Companies</div>
                      <div className="font-bold">{item.companies}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Avg Package</div>
                      <div className="font-bold text-blue-900">
                        {item.avgPackage}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Placements</div>
                      <div className="font-bold text-purple-900">
                        {item.placements}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Placement Highlights */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-600">
                <div className="text-4xl mb-4 text-center">🎯</div>
                <h3 className="text-xl font-bold text-green-900 mb-3 text-center">
                  Placement Training
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>6-month comprehensive training program</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Aptitude, technical, and soft skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Industry expert sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Mock interviews and group discussions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-600">
                <div className="text-4xl mb-4 text-center">💼</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3 text-center">
                  Industry Connect
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>300+ recruiting companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>MoUs with leading corporations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Industry visits and internships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Alumni mentorship program</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-600">
                <div className="text-4xl mb-4 text-center">🌟</div>
                <h3 className="text-xl font-bold text-purple-900 mb-3 text-center">
                  Career Support
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✓</span>
                    <span>Dedicated placement cell</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✓</span>
                    <span>Resume building workshops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✓</span>
                    <span>Career counseling sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✓</span>
                    <span>Job portal access and updates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Recruiters Tab */}
        {activeTab === "recruiters" && (
          <div>
            <h2 className="text-3xl font-bold text-green-900 text-center mb-8">
              Our Top Recruiters
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {topRecruiters.map((company, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition text-center"
                >
                  <div className="text-5xl mb-3">{company.logo}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {company.name}
                  </h3>
                  <div className="text-sm mb-2">
                    <span className="text-green-900 font-semibold">
                      {company.package}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {company.offers} offers
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">
                Why Companies Choose BBIT?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🎓</div>
                  <div className="font-bold mb-2">Quality Education</div>
                  <div className="text-sm text-gray-700">
                    Industry-aligned curriculum with practical focus
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💪</div>
                  <div className="font-bold mb-2">Job-Ready Skills</div>
                  <div className="text-sm text-gray-700">
                    Comprehensive training and project experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <div className="font-bold mb-2">Strong Work Ethic</div>
                  <div className="text-sm text-gray-700">
                    Professional attitude and commitment
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Process Tab */}
        {activeTab === "process" && (
          <div>
            <h2 className="text-3xl font-bold text-green-900 text-center mb-8">
              Placement Process
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {placementProcess.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-green-900">
                        {step.title}
                      </h3>
                      <div className="text-xs text-gray-500">
                        {step.duration}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Placement Team */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">
                Training & Placement Team
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {placementTeam.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg text-gray-900">
                        {member.name}
                      </div>
                      <div className="text-sm text-green-900 font-semibold">
                        {member.designation}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {member.experience} | {member.specialization}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Success Stories Tab */}
        {activeTab === "success" && (
          <div>
            <h2 className="text-3xl font-bold text-green-900 text-center mb-8">
              Success Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {successStories.map((story, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                >
                  <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-green-900 font-bold text-3xl">
                      {story.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-center">
                      {story.name}
                    </h3>
                    <div className="text-center text-sm opacity-90 mt-2">
                      {story.branch} | {story.year}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-green-900">
                        {story.package}
                      </div>
                      <div className="text-sm text-gray-600">
                        at {story.company}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic text-center">
                      "{story.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">
                Placement Statistics Over Years
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-sm text-gray-600 mb-2">2024</div>
                  <div className="text-3xl font-bold text-green-900">95%</div>
                  <div className="text-sm text-gray-600 mt-2">
                    Placement Rate
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-sm text-gray-600 mb-2">2023</div>
                  <div className="text-3xl font-bold text-green-900">93%</div>
                  <div className="text-sm text-gray-600 mt-2">
                    Placement Rate
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-sm text-gray-600 mb-2">2022</div>
                  <div className="text-3xl font-bold text-green-900">91%</div>
                  <div className="text-sm text-gray-600 mt-2">
                    Placement Rate
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-sm text-gray-600 mb-2">2021</div>
                  <div className="text-3xl font-bold text-green-900">88%</div>
                  <div className="text-sm text-gray-600 mt-2">
                    Placement Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-900 to-teal-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Launch Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join BBIT and get access to top placement opportunities with leading
            companies
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <button className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition shadow-lg">
                Register Now
              </button>
            </Link>
            <Link href="/contact-us">
              <button className="bg-white text-green-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg">
                Contact Placement Cell
              </button>
            </Link>
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
