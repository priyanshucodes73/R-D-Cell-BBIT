import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function ResearchInnovation() {
  const [activeTab, setActiveTab] = useState("overview");

  const researchStats = [
    { label: "Research Projects", value: "150+", icon: "🧪" },
    { label: "Publications (2024)", value: "250+", icon: "📝" },
    { label: "Patents Filed", value: "35", icon: "📜" },
    { label: "Research Grants", value: "₹50Cr+", icon: "💵" },
  ];

  const researchCenters = [
    {
      name: "AI & Machine Learning Lab",
      head: "Dr. Rajesh Kumar",
      focus: "Deep Learning, NLP, Computer Vision",
      projects: 25,
      publications: 45,
      funding: "₹5 Cr",
      icon: "🧠",
    },
    {
      name: "IoT Research Center",
      head: "Dr. Priya Sharma",
      focus: "Smart Cities, Industrial IoT, Edge Computing",
      projects: 20,
      publications: 35,
      funding: "₹4 Cr",
      icon: "📡",
    },
    {
      name: "Cybersecurity Lab",
      head: "Dr. Amit Verma",
      focus: "Blockchain, Ethical Hacking, Data Privacy",
      projects: 18,
      publications: 30,
      funding: "₹3.5 Cr",
      icon: "🔒",
    },
    {
      name: "Robotics & Automation Center",
      head: "Dr. Sunita Reddy",
      focus: "Industrial Robots, Drones, Autonomous Systems",
      projects: 15,
      publications: 28,
      funding: "₹4.5 Cr",
      icon: "🤖",
    },
    {
      name: "Data Science Lab",
      head: "Dr. Vikram Singh",
      focus: "Big Data Analytics, Predictive Modeling, BI",
      projects: 22,
      publications: 40,
      funding: "₹3 Cr",
      icon: "📊",
    },
    {
      name: "Renewable Energy Lab",
      head: "Dr. Meena Joshi",
      focus: "Solar Energy, Wind Power, Energy Storage",
      projects: 12,
      publications: 25,
      funding: "₹6 Cr",
      icon: "⚡",
    },
  ];

  const ongoingProjects = [
    {
      title: "AI-Powered Healthcare Diagnostics",
      pi: "Dr. Rajesh Kumar",
      funding: "SERB - ₹80 Lakhs",
      duration: "2023-2026",
      status: "Ongoing",
      progress: 65,
      desc: "Developing AI models for early detection of diseases using medical imaging",
    },
    {
      title: "Smart City Infrastructure Monitoring",
      pi: "Dr. Priya Sharma",
      funding: "DST - ₹1.2 Cr",
      duration: "2024-2027",
      status: "Ongoing",
      progress: 40,
      desc: "IoT-based real-time monitoring system for urban infrastructure",
    },
    {
      title: "Blockchain for Supply Chain Security",
      pi: "Dr. Amit Verma",
      funding: "ICSSR - ₹60 Lakhs",
      duration: "2023-2025",
      status: "Ongoing",
      progress: 80,
      desc: "Implementing blockchain technology for transparent supply chain management",
    },
    {
      title: "Autonomous Agricultural Robots",
      pi: "Dr. Sunita Reddy",
      funding: "ICAR - ₹1.5 Cr",
      duration: "2024-2028",
      status: "Ongoing",
      progress: 35,
      desc: "Developing autonomous robots for precision agriculture and crop monitoring",
    },
  ];

  const publications = [
    {
      title: "Deep Learning Approaches for Medical Image Analysis",
      authors: "Dr. Rajesh Kumar, et al.",
      journal: "IEEE Transactions on Medical Imaging",
      year: "2024",
      impact: "10.5",
    },
    {
      title: "IoT-Enabled Smart Grid Management System",
      authors: "Dr. Priya Sharma, et al.",
      journal: "Journal of Network and Computer Applications",
      year: "2024",
      impact: "7.2",
    },
    {
      title: "Blockchain-Based Secure Data Sharing Framework",
      authors: "Dr. Amit Verma, et al.",
      journal: "Computers & Security",
      year: "2024",
      impact: "5.8",
    },
    {
      title: "Autonomous Navigation for Mobile Robots",
      authors: "Dr. Sunita Reddy, et al.",
      journal: "Robotics and Autonomous Systems",
      year: "2024",
      impact: "6.5",
    },
  ];

  const patents = [
    {
      title: "AI-Based Disease Prediction System",
      inventors: "Dr. Rajesh Kumar, Dr. Meena Joshi",
      number: "IN 202411023456",
      status: "Granted",
      year: "2024",
    },
    {
      title: "Smart Energy Management Device",
      inventors: "Dr. Priya Sharma, Dr. Vikram Singh",
      number: "IN 202411034567",
      status: "Granted",
      year: "2024",
    },
    {
      title: "Blockchain-Based Authentication System",
      inventors: "Dr. Amit Verma",
      number: "IN 202411045678",
      status: "Filed",
      year: "2024",
    },
    {
      title: "Autonomous Crop Monitoring Robot",
      inventors: "Dr. Sunita Reddy, Dr. Rajesh Kumar",
      number: "IN 202411056789",
      status: "Filed",
      year: "2024",
    },
  ];

  const innovationPrograms = [
    {
      name: "Innovation Hub",
      description:
        "State-of-the-art facility for prototyping and product development",
      capacity: "100 projects",
      equipment: "3D Printers, Laser Cutters, Electronics Lab",
      icon: "💡",
    },
    {
      name: "Startup Incubator",
      description:
        "Support for student and faculty startups with funding and mentorship",
      startups: "25 active",
      funding: "Up to ₹10 Lakhs/startup",
      icon: "🚀",
    },
    {
      name: "Industry Collaboration",
      description:
        "Partnerships with leading companies for joint research projects",
      partners: "50+ companies",
      projects: "80+ collaborative",
      icon: "🤝",
    },
    {
      name: "Research Internships",
      description:
        "Opportunities for students to work on cutting-edge research",
      students: "200+ annually",
      stipend: "₹10K-25K/month",
      icon: "👨‍🔬",
    },
  ];

  const fundingSources = [
    {
      name: "DST (Department of Science & Technology)",
      projects: 25,
      amount: "₹15 Cr",
    },
    {
      name: "SERB (Science & Engineering Research Board)",
      projects: 18,
      amount: "₹8 Cr",
    },
    {
      name: "AICTE (All India Council for Technical Education)",
      projects: 15,
      amount: "₹5 Cr",
    },
    {
      name: "ICSSR (Indian Council of Social Science Research)",
      projects: 10,
      amount: "₹3 Cr",
    },
    { name: "Industry Funded Projects", projects: 35, amount: "₹12 Cr" },
    { name: "International Collaborations", projects: 12, amount: "₹7 Cr" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Research & Innovation</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Research & Innovation</h1>
          <p className="text-xl opacity-90">
            Advancing knowledge through cutting-edge research and fostering
            innovation
          </p>
        </div>
      </section>

      {/* Research Stats */}
      <section className="bg-white py-8 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {researchStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-bold text-indigo-900">
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
          {["overview", "projects", "publications", "innovation"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full font-semibold transition text-lg ${
                activeTab === tab
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
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
            <h2 className="text-3xl font-bold text-indigo-900 text-center mb-8">
              Research Centers & Labs
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {researchCenters.map((center, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 border-t-4 border-indigo-600"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{center.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-indigo-900 mb-1">
                        {center.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Head: {center.head}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">
                      Research Focus:
                    </div>
                    <p className="text-sm text-gray-600">{center.focus}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-indigo-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-indigo-900">
                        {center.projects}
                      </div>
                      <div className="text-xs text-gray-600">Projects</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-purple-900">
                        {center.publications}
                      </div>
                      <div className="text-xs text-gray-600">Papers</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-green-900">
                        {center.funding}
                      </div>
                      <div className="text-xs text-gray-600">Funding</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Funding Sources */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
                Research Funding Sources
              </h3>
              <div className="space-y-4">
                {fundingSources.map((source, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {source.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {source.projects} projects funded
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-indigo-900">
                      {source.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div>
            <h2 className="text-3xl font-bold text-indigo-900 text-center mb-8">
              Ongoing Research Projects
            </h2>
            <div className="space-y-6">
              {ongoingProjects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-indigo-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {project.desc}
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {project.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">👨‍🔬</span>
                      <div>
                        <div className="text-gray-500">
                          Principal Investigator
                        </div>
                        <div className="font-semibold">{project.pi}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💰</span>
                      <div>
                        <div className="text-gray-500">Funding</div>
                        <div className="font-semibold">{project.funding}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📅</span>
                      <div>
                        <div className="text-gray-500">Duration</div>
                        <div className="font-semibold">{project.duration}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-indigo-900">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Patents Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
                Patents & Intellectual Property
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {patents.map((patent, idx) => (
                  <div
                    key={idx}
                    className="p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-400 transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-gray-900 flex-1">
                        {patent.title}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          patent.status === "Granted"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {patent.status}
                      </span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="text-gray-600">
                        <strong>Inventors:</strong> {patent.inventors}
                      </div>
                      <div className="text-gray-600">
                        <strong>Patent No:</strong> {patent.number}
                      </div>
                      <div className="text-gray-600">
                        <strong>Year:</strong> {patent.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Publications Tab */}
        {activeTab === "publications" && (
          <div>
            <h2 className="text-3xl font-bold text-indigo-900 text-center mb-8">
              Recent Publications (2024)
            </h2>
            <div className="space-y-4">
              {publications.map((pub, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">📄</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-indigo-900 mb-2">
                        {pub.title}
                      </h3>
                      <div className="text-sm text-gray-600 mb-3">
                        {pub.authors}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full font-semibold">
                          {pub.journal}
                        </span>
                        <span className="text-gray-600">Year: {pub.year}</span>
                        <span className="text-green-900 font-semibold">
                          Impact Factor: {pub.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
                Publication Statistics 2024
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-3xl font-bold text-indigo-900">250+</div>
                  <div className="text-gray-600 mt-2">Total Publications</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-3xl font-bold text-purple-900">180</div>
                  <div className="text-gray-600 mt-2">Journal Papers</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-3xl font-bold text-blue-900">70</div>
                  <div className="text-gray-600 mt-2">Conference Papers</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-3xl font-bold text-green-900">5.8</div>
                  <div className="text-gray-600 mt-2">Avg Impact Factor</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Innovation Tab */}
        {activeTab === "innovation" && (
          <div>
            <h2 className="text-3xl font-bold text-indigo-900 text-center mb-8">
              Innovation & Entrepreneurship
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {innovationPrograms.map((program, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 border-t-4 border-indigo-600"
                >
                  <div className="text-5xl mb-4 text-center">
                    {program.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-900 mb-3 text-center">
                    {program.name}
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    {program.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {Object.keys(program)
                      .filter(
                        (key) => !["name", "description", "icon"].includes(key)
                      )
                      .map((key, i) => (
                        <div
                          key={i}
                          className="bg-indigo-50 p-3 rounded-lg text-center"
                        >
                          <div className="text-sm text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                          <div className="font-bold text-indigo-900">
                            {program[key]}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Student Innovations */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
                Student Innovation Showcase
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 border-2 border-indigo-200 rounded-lg hover:border-indigo-400 transition">
                  <div className="text-4xl mb-3 text-center">🏥</div>
                  <h4 className="font-bold text-lg mb-2 text-center">
                    HealthTrack AI
                  </h4>
                  <p className="text-sm text-gray-600 text-center mb-3">
                    AI-powered health monitoring wearable for elderly care
                  </p>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold text-center">
                    Funded - ₹5 Lakhs
                  </div>
                </div>
                <div className="p-6 border-2 border-indigo-200 rounded-lg hover:border-indigo-400 transition">
                  <div className="text-4xl mb-3 text-center">🌾</div>
                  <h4 className="font-bold text-lg mb-2 text-center">
                    AgriBot
                  </h4>
                  <p className="text-sm text-gray-600 text-center mb-3">
                    Autonomous robot for smart farming and crop monitoring
                  </p>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold text-center">
                    Funded - ₹8 Lakhs
                  </div>
                </div>
                <div className="p-6 border-2 border-indigo-200 rounded-lg hover:border-indigo-400 transition">
                  <div className="text-4xl mb-3 text-center">📚</div>
                  <h4 className="font-bold text-lg mb-2 text-center">
                    EduConnect
                  </h4>
                  <p className="text-sm text-gray-600 text-center mb-3">
                    Platform connecting students with remote learning resources
                  </p>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold text-center">
                    Funded - ₹3 Lakhs
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Research Community
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of groundbreaking research and innovation at BBIT
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <button className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition shadow-lg">
                Apply for Research Programs
              </button>
            </Link>
            <Link href="/contact-us">
              <button className="bg-white text-indigo-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg">
                Contact Research Cell
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
