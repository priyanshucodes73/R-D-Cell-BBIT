import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function Academics() {
  const [activeTab, setActiveTab] = useState("departments");

  const departments = [
    {
      name: "Computer Science & Engineering",
      hod: "Dr. Rajesh Kumar",
      faculty: 25,
      labs: 8,
      research: "AI/ML, Cloud Computing, Cybersecurity",
      icon: "💻",
    },
    {
      name: "Electronics & Communication",
      hod: "Dr. Priya Sharma",
      faculty: 18,
      labs: 6,
      research: "IoT, VLSI Design, Signal Processing",
      icon: "📡",
    },
    {
      name: "Mechanical Engineering",
      hod: "Dr. Amit Verma",
      faculty: 20,
      labs: 7,
      research: "Robotics, Manufacturing, Thermal Systems",
      icon: "⚙️",
    },
    {
      name: "Civil Engineering",
      hod: "Dr. Sunita Reddy",
      faculty: 15,
      labs: 5,
      research: "Smart Cities, Structural Engineering",
      icon: "🏗️",
    },
    {
      name: "Management Studies",
      hod: "Dr. Vikram Singh",
      faculty: 22,
      labs: 3,
      research: "Digital Marketing, Entrepreneurship",
      icon: "📊",
    },
    {
      name: "Applied Sciences",
      hod: "Dr. Meena Joshi",
      faculty: 16,
      labs: 6,
      research: "Data Science, Mathematics, Physics",
      icon: "🔬",
    },
  ];

  const academicCalendar = [
    { event: "Odd Semester Begins", date: "August 1, 2025" },
    { event: "Mid-Term Examinations", date: "September 20-30, 2025" },
    { event: "End Semester Exams", date: "December 10-25, 2025" },
    { event: "Winter Break", date: "December 26 - January 5" },
    { event: "Even Semester Begins", date: "January 6, 2026" },
    { event: "Mid-Term Examinations", date: "March 15-25, 2026" },
    { event: "End Semester Exams", date: "May 10-25, 2026" },
    { event: "Summer Break", date: "May 26 - July 31, 2026" },
  ];

  const facilities = [
    {
      name: "Central Library",
      description: "100,000+ books, 10,000+ e-journals, 24/7 digital access",
      icon: "📚",
      capacity: "500 students",
    },
    {
      name: "Computer Labs",
      description: "15 labs with 800+ high-end computers, licensed software",
      icon: "💻",
      capacity: "800 systems",
    },
    {
      name: "Research Centers",
      description: "Dedicated centers for AI, IoT, Robotics, and Data Science",
      icon: "🔬",
      capacity: "8 centers",
    },
    {
      name: "Innovation Hub",
      description: "Maker space, 3D printing, prototyping, startup incubation",
      icon: "💡",
      capacity: "100 projects",
    },
    {
      name: "Language Lab",
      description:
        "Advanced communication skills training with latest software",
      icon: "🗣️",
      capacity: "60 seats",
    },
    {
      name: "Seminar Halls",
      description: "Modern auditoriums with audio-visual facilities",
      icon: "🎤",
      capacity: "5 halls",
    },
    {
      name: "Smart Classrooms",
      description: "150+ digitally enabled classrooms with smart boards",
      icon: "🖥️",
      capacity: "150 rooms",
    },
    {
      name: "Workshop & Labs",
      description: "Industry-grade equipment for hands-on practical training",
      icon: "🔧",
      capacity: "12 workshops",
    },
  ];

  const examSystem = [
    {
      title: "Continuous Assessment",
      points: [
        "Internal assessments: 30% weightage",
        "Assignments and projects: 10% weightage",
        "Mid-term exams: Regular intervals",
        "Quiz and class participation",
      ],
    },
    {
      title: "End Semester Exams",
      points: [
        "End semester: 60% weightage",
        "Theory and practical exams",
        "Comprehensive evaluation",
        "External examination board",
      ],
    },
    {
      title: "Grading System",
      points: [
        "10-point CGPA scale",
        "Absolute grading system",
        "Grade cards every semester",
        "Transcripts available online",
      ],
    },
    {
      title: "Examination Rules",
      points: [
        "75% minimum attendance required",
        "Re-examination for failed subjects",
        "Strict anti-plagiarism policy",
        "Online exam management system",
      ],
    },
  ];

  const facultyAchievements = [
    { metric: "Ph.D. Faculty", value: "85%", icon: "🎓" },
    { metric: "Publications (2024)", value: "250+", icon: "📄" },
    { metric: "Research Projects", value: "120+", icon: "🔬" },
    { metric: "Patents Filed", value: "35", icon: "⚖️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Academics</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Academic Excellence</h1>
          <p className="text-xl opacity-90">
            Comprehensive academic programs with world-class faculty and
            infrastructure
          </p>
        </div>
      </section>

      {/* Academic Stats */}
      <section className="bg-white py-8 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {facultyAchievements.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="text-3xl font-bold text-blue-900">
                  {item.value}
                </div>
                <div className="text-gray-600 mt-2">{item.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["departments", "calendar", "facilities", "examination"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full font-semibold transition text-lg ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Departments Tab */}
        {activeTab === "departments" && (
          <div>
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
              Our Departments
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {departments.map((dept, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 border-l-4 border-blue-600"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{dept.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-900 mb-2">
                        {dept.name}
                      </h3>
                      <p className="text-gray-600 text-sm">Head: {dept.hod}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-blue-900">
                        {dept.faculty}
                      </div>
                      <div className="text-sm text-gray-600">
                        Faculty Members
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-900">
                        {dept.labs}
                      </div>
                      <div className="text-sm text-gray-600">
                        Specialized Labs
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="font-semibold text-gray-700 mb-2">
                      Research Areas:
                    </div>
                    <p className="text-sm text-gray-600">{dept.research}</p>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    View Department
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Academic Calendar Tab */}
        {activeTab === "calendar" && (
          <div>
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
              Academic Calendar 2025-26
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
              <div className="space-y-4">
                {academicCalendar.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {item.event}
                        </div>
                        <div className="text-sm text-gray-600">{item.date}</div>
                      </div>
                    </div>
                    <div className="text-2xl">📅</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Dates are subject to change. Students
                  are advised to regularly check the official portal for updates
                  and notifications.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Facilities Tab */}
        {activeTab === "facilities" && (
          <div>
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
              Academic Facilities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 text-center"
                >
                  <div className="text-5xl mb-4">{facility.icon}</div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">
                    {facility.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {facility.description}
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Capacity</div>
                    <div className="font-bold text-blue-900">
                      {facility.capacity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Examination Tab */}
        {activeTab === "examination" && (
          <div>
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
              Examination System
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {examSystem.map((system, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600"
                >
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">
                    {system.title}
                  </h3>
                  <ul className="space-y-3">
                    {system.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                Online Examination Portal
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl mb-3">🖥️</div>
                  <div className="font-semibold">Online Registration</div>
                  <div className="text-sm text-gray-600 mt-2">
                    Register for exams online
                  </div>
                </div>
                <div>
                  <div className="text-4xl mb-3">📊</div>
                  <div className="font-semibold">Result Portal</div>
                  <div className="text-sm text-gray-600 mt-2">
                    Check results instantly
                  </div>
                </div>
                <div>
                  <div className="text-4xl mb-3">📄</div>
                  <div className="font-semibold">Download Transcripts</div>
                  <div className="text-sm text-gray-600 mt-2">
                    Get official documents
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Academic Support Services */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Academic Support Services
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="font-bold text-lg mb-2">Academic Advising</h3>
              <p className="text-gray-600 text-sm">
                Personalized guidance from faculty advisors
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="font-bold text-lg mb-2">Writing Center</h3>
              <p className="text-gray-600 text-sm">
                Help with academic writing and research papers
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-bold text-lg mb-2">Tutoring Services</h3>
              <p className="text-gray-600 text-sm">
                Free peer and professional tutoring
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="font-bold text-lg mb-2">Learning Management</h3>
              <p className="text-gray-600 text-sm">
                24/7 access to course materials online
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
