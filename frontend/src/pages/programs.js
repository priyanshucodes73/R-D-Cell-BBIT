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

export default function Programs({ fallback }) {
  const [selectedLevel, setSelectedLevel] = useState("undergraduate");
  const [selectedDomain, setSelectedDomain] = useState("engineering");

  const apiBase = getApiBase();
  const { data: siteSettingsData } = useSWR(apiBase ? `${apiBase}/api/site-settings` : null, fetcher);
  const siteSettings = { ...defaultPublicSettings, ...normalizeSiteSettings(siteSettingsData) };
  const pageSettings = siteSettings.programsPage || {};

  const programLevels = pageSettings.programLevels || [
    { id: "undergraduate", name: "Undergraduate", icon: "🎓" },
    { id: "postgraduate", name: "Postgraduate", icon: "📚" },
    { id: "doctoral", name: "Doctoral", icon: "🔬" },
    { id: "diploma", name: "Diploma", icon: "📜" },
  ];

  const defaultProgramsCatalog = {
    undergraduate: {
      engineering: [
        {
          name: "B.Tech Computer Science & Engineering",
          duration: "4 Years",
          seats: 120,
          highlights: [
            "AI/ML Specialization",
            "Industry Projects",
            "99% Placement",
          ],
          accreditation: "NBA Accredited",
        },
        {
          name: "B.Tech Electronics & Communication",
          duration: "4 Years",
          seats: 60,
          highlights: ["IoT Lab", "VLSI Design", "International Internships"],
          accreditation: "NBA Accredited",
        },
        {
          name: "B.Tech Mechanical Engineering",
          duration: "4 Years",
          seats: 60,
          highlights: ["CAD/CAM Lab", "Robotics", "Industry Tie-ups"],
          accreditation: "NBA Accredited",
        },
        {
          name: "B.Tech Civil Engineering",
          duration: "4 Years",
          seats: 60,
          highlights: ["Smart Cities Focus", "AutoCAD Training", "Site Visits"],
          accreditation: "NBA Accredited",
        },
        {
          name: "B.Tech Artificial Intelligence",
          duration: "4 Years",
          seats: 60,
          highlights: ["Deep Learning", "NLP Projects", "Research Focus"],
          accreditation: "New Program",
        },
      ],
      management: [
        {
          name: "BBA - Business Administration",
          duration: "3 Years",
          seats: 60,
          highlights: [
            "Industry Mentorship",
            "Case Studies",
            "Entrepreneurship Cell",
          ],
          accreditation: "UGC Approved",
        },
      ],
      science: [
        {
          name: "B.Sc Computer Science",
          duration: "3 Years",
          seats: 60,
          highlights: ["Programming Focus", "Research Projects", "Tech Fests"],
          accreditation: "UGC Approved",
        },
        {
          name: "B.Sc Data Science",
          duration: "3 Years",
          seats: 40,
          highlights: ["Big Data", "Analytics", "Industry Projects"],
          accreditation: "New Program",
        },
      ],
    },
    postgraduate: {
      engineering: [
        {
          name: "M.Tech Computer Science & Engineering",
          duration: "2 Years",
          seats: 30,
          highlights: ["Research Focus", "Publications", "Advanced AI"],
          accreditation: "AICTE Approved",
        },
        {
          name: "M.Tech Data Science",
          duration: "2 Years",
          seats: 30,
          highlights: [
            "Industry Projects",
            "ML Specialization",
            "High Stipends",
          ],
          accreditation: "AICTE Approved",
        },
      ],
      management: [
        {
          name: "MBA - Master of Business Administration",
          duration: "2 Years",
          seats: 120,
          highlights: [
            "Dual Specialization",
            "International Exposure",
            "CXO Mentorship",
          ],
          accreditation: "AICTE Approved",
        },
        {
          name: "MBA in Digital Marketing",
          duration: "2 Years",
          seats: 60,
          highlights: [
            "Live Projects",
            "Google Certification",
            "Startup Internships",
          ],
          accreditation: "AICTE Approved",
        },
      ],
      science: [
        {
          name: "MCA - Master of Computer Applications",
          duration: "2 Years",
          seats: 60,
          highlights: [
            "Full Stack Development",
            "Cloud Computing",
            "100% Placement",
          ],
          accreditation: "AICTE Approved",
        },
        {
          name: "M.Sc Data Science",
          duration: "2 Years",
          seats: 30,
          highlights: [
            "Research Focus",
            "Industry Collaboration",
            "High Packages",
          ],
          accreditation: "UGC Approved",
        },
      ],
    },
    doctoral: {
      engineering: [
        {
          name: "Ph.D. in Computer Science",
          duration: "3-5 Years",
          seats: 15,
          highlights: [
            "Funded Positions",
            "International Collaborations",
            "Top Publications",
          ],
          accreditation: "UGC Approved",
        },
        {
          name: "Ph.D. in Electronics & Communication",
          duration: "3-5 Years",
          seats: 10,
          highlights: [
            "Research Grants",
            "Conference Support",
            "Patent Filing",
          ],
          accreditation: "UGC Approved",
        },
      ],
      management: [
        {
          name: "Ph.D. in Management",
          duration: "3-5 Years",
          seats: 10,
          highlights: [
            "Industry Research",
            "Publication Support",
            "Teaching Opportunities",
          ],
          accreditation: "UGC Approved",
        },
      ],
      science: [
        {
          name: "Ph.D. in Mathematics",
          duration: "3-5 Years",
          seats: 8,
          highlights: [
            "Research Facilities",
            "International Journals",
            "Fellowships",
          ],
          accreditation: "UGC Approved",
        },
      ],
    },
    diploma: {
      engineering: [
        {
          name: "Diploma in Computer Applications",
          duration: "1 Year",
          seats: 40,
          highlights: [
            "Job-Ready Skills",
            "Industry Training",
            "Placement Support",
          ],
          accreditation: "State Board",
        },
        {
          name: "Diploma in Digital Marketing",
          duration: "6 Months",
          seats: 30,
          highlights: [
            "Google Certified",
            "Live Projects",
            "Freelance Opportunities",
          ],
          accreditation: "Industry Recognized",
        },
      ],
    },
  };

  const programs = pageSettings.programsCatalog || defaultProgramsCatalog;
  const currentPrograms = programs[selectedLevel]?.[selectedDomain] || [];

  return (
    <SWRConfig value={{ fallback }}>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Programs</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            {pageSettings.heroTitle || "Academic Programs"}
          </h1>
          <p className="text-xl opacity-90">
            {pageSettings.heroSubtitle || "Explore our diverse range of programs designed to shape future leaders and innovators"}
          </p>
        </div>
      </section>

      {/* Program Stats */}
      <section className="bg-white py-8 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900">50+</div>
              <div className="text-gray-600 mt-2">Programs Offered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900">15,000+</div>
              <div className="text-gray-600 mt-2">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900">98%</div>
              <div className="text-gray-600 mt-2">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900">₹12 LPA</div>
              <div className="text-gray-600 mt-2">Avg. Package</div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Level Selection */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
          Select Program Level
        </h2>
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {programLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`p-6 rounded-xl shadow-lg transition transform hover:scale-105 ${
                selectedLevel === level.id
                  ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-2xl"
                  : "bg-white text-gray-700 hover:shadow-xl"
              }`}
            >
              <div className="text-5xl mb-3">{level.icon}</div>
              <div className="font-bold text-lg">{level.name}</div>
            </button>
          ))}
        </div>

        {/* Domain Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.keys(programs[selectedLevel] || {}).map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                selectedDomain === domain
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              {domain.charAt(0).toUpperCase() + domain.slice(1)}
            </button>
          ))}
        </div>

        {/* Programs List */}
        <div className="grid md:grid-cols-2 gap-6">
          {currentPrograms.map((program, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 border-t-4 border-blue-600"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-blue-900 flex-1">
                  {program.name}
                </h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {program.accreditation}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <div className="text-gray-500">Duration</div>
                    <div className="font-semibold">{program.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  <div>
                    <div className="text-gray-500">Seats</div>
                    <div className="font-semibold">{program.seats}</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="font-semibold text-gray-700 mb-2">
                  Program Highlights:
                </div>
                <div className="space-y-2">
                  {program.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <span className="text-blue-600">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Link href="/register" className="flex-1">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Apply Now
                  </button>
                </Link>
                <button className="px-6 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {currentPrograms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-600 text-lg">
              No programs available in this category yet.
            </p>
          </div>
        )}
      </section>

      {/* Why Choose Our Programs */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Why Choose BBIT Programs?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                Industry-Aligned Curriculum
              </h3>
              <p className="text-gray-600">
                Our programs are designed in collaboration with industry experts
                to ensure graduates are job-ready.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                Expert Faculty
              </h3>
              <p className="text-gray-600">
                Learn from experienced professors and industry professionals
                with proven track records.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                Global Exposure
              </h3>
              <p className="text-gray-600">
                International partnerships, exchange programs, and global
                internship opportunities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                State-of-the-Art Facilities
              </h3>
              <p className="text-gray-600">
                Modern labs, research centers, and infrastructure to support
                hands-on learning.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                Excellent Placements
              </h3>
              <p className="text-gray-600">
                95%+ placement record with top companies offering competitive
                packages.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                Scholarships Available
              </h3>
              <p className="text-gray-600">
                Merit-based and need-based scholarships to support deserving
                students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
          Admission Process
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-bold text-lg mb-2">Apply Online</h3>
            <p className="text-gray-600 text-sm">
              Fill the application form with required details
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-bold text-lg mb-2">Entrance Exam</h3>
            <p className="text-gray-600 text-sm">
              Appear for entrance test or submit scores
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-bold text-lg mb-2">Interview</h3>
            <p className="text-gray-600 text-sm">
              Personal interview and document verification
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="font-bold text-lg mb-2">Enrollment</h3>
            <p className="text-gray-600 text-sm">
              Complete admission formalities and join
            </p>
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
