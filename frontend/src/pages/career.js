import useSWR, { SWRConfig } from "swr";
import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";
import { defaultPublicSettings, fetcher, getApiBase, normalizeSiteSettings } from "../lib/siteSettings";

export default function Career({ fallback }) {
  const [selectedTab, setSelectedTab] = useState("placements");
  const apiBase = getApiBase();
  const { data: siteSettingsData } = useSWR(apiBase + "/api/site-settings", fetcher);
  const siteSettings = { ...defaultPublicSettings, ...normalizeSiteSettings(siteSettingsData) };
  const careerPage = siteSettings.careerPage || defaultPublicSettings.careerPage;

  return (
    <SWRConfig value={{ fallback }}>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-900 to-teal-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Career</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">{careerPage.heroTitle}</h1>
          <p className="text-xl opacity-90">{careerPage.heroSubtitle}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {(careerPage.stats || []).map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-green-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-center gap-4 mb-12">
          {[
            { id: "placements", label: "Placements" },
            { id: "recruiters", label: "Top Recruiters" },
            { id: "training", label: "Training & Development" },
            { id: "internships", label: "Internships" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-8 py-3 rounded-lg font-semibold transition ${
                selectedTab === tab.id
                  ? "bg-green-900 text-white"
                  : "bg-white text-green-900 border-2 border-green-900 hover:bg-green-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Placements Tab */}
        {selectedTab === "placements" && (
          <div className="space-y-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-green-900 mb-6">
                Placement Highlights 2024
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-4">
                    Engineering & Technology
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-700">Computer Science</span>
                      <span className="font-bold text-green-900">
                        ₹15 LPA (Avg)
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-700">Electronics & Comm</span>
                      <span className="font-bold text-green-900">
                        ₹11 LPA (Avg)
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-700">Mechanical</span>
                      <span className="font-bold text-green-900">
                        ₹9 LPA (Avg)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Civil</span>
                      <span className="font-bold text-green-900">
                        ₹8 LPA (Avg)
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-4">
                    Management & Others
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-700">MBA</span>
                      <span className="font-bold text-green-900">
                        ₹14 LPA (Avg)
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-700">BBA</span>
                      <span className="font-bold text-green-900">
                        ₹6 LPA (Avg)
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-700">M.Tech</span>
                      <span className="font-bold text-green-900">
                        ₹13 LPA (Avg)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">MCA</span>
                      <span className="font-bold text-green-900">
                        ₹10 LPA (Avg)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Dream Offers",
                  desc: "Packages above ₹20 LPA",
                  count: "150+",
                  color: "from-yellow-50 to-orange-50",
                },
                {
                  title: "Super Dream Offers",
                  desc: "Packages above ₹30 LPA",
                  count: "50+",
                  color: "from-blue-50 to-cyan-50",
                },
                {
                  title: "International Offers",
                  desc: "Global placements",
                  count: "25+",
                  color: "from-purple-50 to-pink-50",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${stat.color} p-8 rounded-xl shadow-lg text-center`}
                >
                  <div className="text-5xl font-bold text-green-900 mb-2">
                    {stat.count}
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-gray-600">{stat.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-6">
                Success Stories
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Rahul Kumar",
                    branch: "B.Tech CSE, 2024",
                    company: "Google",
                    package: "₹45 LPA",
                    quote:
                      "The rigorous training and placement support helped me secure my dream job.",
                  },
                  {
                    name: "Priya Sharma",
                    branch: "MBA, 2024",
                    company: "McKinsey & Company",
                    package: "₹38 LPA",
                    quote:
                      "BBIT's career guidance and industry connections made all the difference.",
                  },
                  {
                    name: "Amit Patel",
                    branch: "B.Tech ECE, 2024",
                    company: "Microsoft",
                    package: "₹42 LPA",
                    quote:
                      "The placement cell went above and beyond to prepare us for interviews.",
                  },
                  {
                    name: "Sneha Verma",
                    branch: "MCA, 2024",
                    company: "Amazon",
                    package: "₹35 LPA",
                    quote:
                      "From resume building to final rounds, the support was exceptional.",
                  },
                ].map((story, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-green-600 pl-6 py-4 bg-green-50"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-green-900 text-lg">
                          {story.name}
                        </h4>
                        <div className="text-sm text-gray-600">
                          {story.branch}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-900">
                          {story.company}
                        </div>
                        <div className="text-lg font-bold text-orange-600">
                          {story.package}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      "{story.quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recruiters Tab */}
        {selectedTab === "recruiters" && (
          <div>
            <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">
              Our Esteemed Recruiters
            </h2>
            <div className="grid md:grid-cols-5 gap-6 mb-12">
              {[
                "Google",
                "Microsoft",
                "Amazon",
                "Apple",
                "Meta",
                "TCS",
                "Infosys",
                "Wipro",
                "Accenture",
                "Cognizant",
                "Deloitte",
                "PwC",
                "EY",
                "KPMG",
                "Goldman Sachs",
                "Morgan Stanley",
                "Citibank",
                "HDFC Bank",
                "ICICI",
                "Axis Bank",
                "Flipkart",
                "Paytm",
                "Zomato",
                "Swiggy",
                "Ola",
              ].map((company, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-lg text-center font-bold text-green-900 hover:shadow-2xl transition"
                >
                  {company}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">
                Industry Sectors
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: "💻", sector: "IT & Software", companies: "150+" },
                  { icon: "🏦", sector: "Banking & Finance", companies: "50+" },
                  { icon: "🏭", sector: "Core Engineering", companies: "40+" },
                  { icon: "📊", sector: "Consulting", companies: "30+" },
                  { icon: "🛒", sector: "E-commerce", companies: "25+" },
                  { icon: "🏥", sector: "Healthcare Tech", companies: "20+" },
                  { icon: "🚗", sector: "Automotive", companies: "15+" },
                  { icon: "🎓", sector: "EdTech", companies: "10+" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow text-center"
                  >
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h4 className="font-bold text-green-900 mb-2">
                      {item.sector}
                    </h4>
                    <div className="text-2xl font-bold text-green-600">
                      {item.companies}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Training Tab */}
        {selectedTab === "training" && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-green-900 mb-6">
                Career Development Programs
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Aptitude & Reasoning Training",
                    desc: "Comprehensive training for quantitative aptitude, logical reasoning, and verbal ability",
                    duration: "6 Months",
                    features: [
                      "Mock Tests",
                      "Online Practice",
                      "Doubt Sessions",
                      "Performance Tracking",
                    ],
                  },
                  {
                    title: "Technical Skills Development",
                    desc: "Industry-relevant programming, data structures, algorithms, and domain skills",
                    duration: "Ongoing",
                    features: [
                      "Coding Bootcamps",
                      "Project Work",
                      "Hackathons",
                      "Certification Prep",
                    ],
                  },
                  {
                    title: "Soft Skills & Communication",
                    desc: "Enhance communication, presentation, teamwork, and leadership abilities",
                    duration: "4 Months",
                    features: [
                      "Group Discussions",
                      "Public Speaking",
                      "Team Activities",
                      "Personality Dev",
                    ],
                  },
                  {
                    title: "Interview Preparation",
                    desc: "Mock interviews, HR rounds, technical rounds, and case study preparation",
                    duration: "3 Months",
                    features: [
                      "1-on-1 Mocks",
                      "Panel Interviews",
                      "Video Interviews",
                      "Feedback Sessions",
                    ],
                  },
                ].map((program, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-green-600 pl-6 py-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-green-900">
                        {program.title}
                      </h3>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {program.duration}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{program.desc}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {program.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <span className="text-green-600">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "📝",
                  title: "Resume Building",
                  desc: "Professional resume review and creation",
                },
                {
                  icon: "💼",
                  title: "LinkedIn Profile",
                  desc: "Optimize your professional presence",
                },
                {
                  icon: "🎯",
                  title: "Career Counseling",
                  desc: "One-on-one career guidance sessions",
                },
                {
                  icon: "🏆",
                  title: "Competitive Exams",
                  desc: "Prep for GATE, CAT, GRE, etc.",
                },
                {
                  icon: "📊",
                  title: "Industry Seminars",
                  desc: "Regular talks by industry leaders",
                },
                {
                  icon: "🤝",
                  title: "Alumni Network",
                  desc: "Connect with successful alumni",
                },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internships Tab */}
        {selectedTab === "internships" && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-green-900 mb-6">
                Internship Opportunities
              </h2>
              <p className="text-gray-700 mb-8 text-lg">
                BBIT's Internship Cell connects students with leading companies
                for summer internships, winter training, and industrial projects
                to gain practical experience.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-4xl font-bold text-green-900 mb-2">
                    1500+
                  </div>
                  <div className="text-gray-600">Internships (2024)</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-4xl font-bold text-green-900 mb-2">
                    200+
                  </div>
                  <div className="text-gray-600">Partner Companies</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-4xl font-bold text-green-900 mb-2">
                    ₹25K
                  </div>
                  <div className="text-gray-600">Average Stipend</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-green-900 mb-6">
                  Types of Internships
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      type: "Summer Internships",
                      duration: "2-3 Months",
                      timing: "May - July",
                    },
                    {
                      type: "Winter Internships",
                      duration: "1-2 Months",
                      timing: "Dec - Jan",
                    },
                    {
                      type: "Industrial Training",
                      duration: "6 Months",
                      timing: "Final Year",
                    },
                    {
                      type: "Research Internships",
                      duration: "2-6 Months",
                      timing: "Flexible",
                    },
                  ].map((intern, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center border-b pb-3"
                    >
                      <div>
                        <div className="font-bold text-green-900">
                          {intern.type}
                        </div>
                        <div className="text-sm text-gray-600">
                          {intern.timing}
                        </div>
                      </div>
                      <div className="text-green-700 font-semibold">
                        {intern.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-green-900 mb-6">
                  Application Process
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Browse Opportunities",
                      desc: "Check portal for openings",
                    },
                    {
                      step: "2",
                      title: "Apply Online",
                      desc: "Submit resume & cover letter",
                    },
                    {
                      step: "3",
                      title: "Interview",
                      desc: "Company conducts selection",
                    },
                    {
                      step: "4",
                      title: "Confirmation",
                      desc: "Receive offer letter",
                    },
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-green-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <div className="font-bold text-green-900">
                          {step.title}
                        </div>
                        <div className="text-sm text-gray-600">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-900 to-teal-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Launch Your Career?
          </h2>
          <p className="text-xl mb-8">
            Register with our placement cell and get access to exclusive
            opportunities, training programs, and career guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-green-900 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition transform hover:scale-105">
              Register for Placements
            </button>
            <button className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white/20 transition transform hover:scale-105">
              Contact Placement Cell
            </button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span>📧</span>
              <span>placements@bbit.edu.in</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>+91-11-2345-6750</span>
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
