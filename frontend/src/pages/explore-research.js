import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function ExploreResearch() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const researchAreas = [
    {
      category: "AI & Machine Learning",
      icon: "🤖",
      projects: [
        {
          title: "AI-Powered Medical Diagnosis System",
          lead: "Dr. Priya Sharma",
          status: "Ongoing",
          funding: "₹80 Lakhs",
          description: "Developing deep learning models for early detection of diseases using medical imaging and patient data analysis.",
        },
        {
          title: "Natural Language Processing for Regional Languages",
          lead: "Dr. Vikram Singh",
          status: "Ongoing",
          funding: "₹60 Lakhs",
          description: "Building NLP models and datasets for low-resource Indian languages to enable better digital accessibility.",
        },
      ],
    },
    {
      category: "IoT & Smart Systems",
      icon: "🌐",
      projects: [
        {
          title: "Smart Campus Infrastructure Monitoring",
          lead: "Dr. Rajesh Kumar",
          status: "Active",
          funding: "₹1.2 Cr",
          description: "IoT-based real-time monitoring system for campus energy, water, security, and resource management.",
        },
        {
          title: "Industrial IoT for Manufacturing",
          lead: "Prof. Amit Verma",
          status: "Ongoing",
          funding: "₹90 Lakhs",
          description: "Predictive maintenance and quality control system for manufacturing industries using IoT sensors.",
        },
      ],
    },
    {
      category: "Cybersecurity",
      icon: "🔐",
      projects: [
        {
          title: "Blockchain for Supply Chain Security",
          lead: "Dr. Anita Verma",
          status: "Ongoing",
          funding: "₹60 Lakhs",
          description: "Implementing blockchain technology for transparent and secure pharmaceutical supply chain management.",
        },
        {
          title: "Zero Trust Network Architecture",
          lead: "Dr. Suresh Patel",
          status: "Active",
          funding: "₹75 Lakhs",
          description: "Developing secure network architecture framework for enterprise environments with zero trust principles.",
        },
      ],
    },
    {
      category: "Robotics & Automation",
      icon: "🤖",
      projects: [
        {
          title: "Autonomous Agricultural Robots",
          lead: "Dr. Sunita Reddy",
          status: "Ongoing",
          funding: "₹1.5 Cr",
          description: "Developing autonomous robots for precision agriculture, crop monitoring, and automated harvesting.",
        },
        {
          title: "Collaborative Industrial Robots",
          lead: "Dr. Karan Mehta",
          status: "Active",
          funding: "₹85 Lakhs",
          description: "Human-robot collaboration systems for flexible manufacturing and assembly operations.",
        },
      ],
    },
  ];

  const publications = [
    {
      title: "Deep Learning Approaches for Medical Image Analysis",
      authors: "Dr. Priya Sharma, Dr. Rajesh Kumar, et al.",
      journal: "IEEE Transactions on Medical Imaging",
      year: "2024",
      impact: "10.5",
      citations: 45,
    },
    {
      title: "IoT-Enabled Smart Grid Management System",
      authors: "Dr. Rajesh Kumar, Prof. Amit Verma, et al.",
      journal: "Journal of Network and Computer Applications",
      year: "2024",
      impact: "7.2",
      citations: 32,
    },
    {
      title: "Blockchain-Based Secure Data Sharing Framework",
      authors: "Dr. Anita Verma, Dr. Suresh Patel, et al.",
      journal: "Computers & Security",
      year: "2024",
      impact: "5.8",
      citations: 28,
    },
  ];

  const facilities = [
    {
      name: "AI & ML Research Lab",
      description: "High-performance computing cluster with GPU servers for deep learning research",
      equipment: ["NVIDIA A100 GPUs", "Distributed Computing System", "Big Data Analytics Tools"],
      capacity: "50 researchers",
    },
    {
      name: "IoT & Sensor Network Lab",
      description: "Equipped with latest sensors, microcontrollers, and networking equipment",
      equipment: ["Arduino & Raspberry Pi", "Various IoT Sensors", "Network Testing Tools"],
      capacity: "40 researchers",
    },
    {
      name: "Robotics Lab",
      description: "Advanced robotics research facility with industrial-grade equipment",
      equipment: ["Robotic Arms", "3D Printers", "Motion Capture System"],
      capacity: "30 researchers",
    },
    {
      name: "Cybersecurity Lab",
      description: "Dedicated lab for security research with penetration testing tools",
      equipment: ["Security Testing Tools", "Network Simulators", "Forensics Equipment"],
      capacity: "35 researchers",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Explore Research</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Research at BBIT</h1>
          <p className="text-xl opacity-90">
            Cutting-edge research driving innovation and solving real-world challenges
          </p>
        </div>
      </section>

      {/* Research Stats */}
      <section className="bg-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">150+</div>
              <div className="text-gray-600">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-900 mb-2">250+</div>
              <div className="text-gray-600">Publications (2024)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-900 mb-2">35</div>
              <div className="text-gray-600">Patents Filed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-900 mb-2">₹50Cr+</div>
              <div className="text-gray-600">Research Funding</div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas & Projects */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Research Areas & Active Projects
        </h2>

        {researchAreas.map((area, idx) => (
          <div key={idx} className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{area.icon}</div>
                <h3 className="text-3xl font-bold">{area.category}</h3>
              </div>
            </div>
            <div className="bg-white rounded-b-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {area.projects.map((project, projectIdx) => (
                  <div
                    key={projectIdx}
                    className="border-l-4 border-blue-600 pl-6 pr-4 py-4 bg-gray-50 rounded-r-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-xl font-bold text-blue-900">
                        {project.title}
                      </h4>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Principal Investigator:</strong> {project.lead}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Funding:</strong> {project.funding}
                    </p>
                    <p className="text-gray-700">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Recent Publications */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
            Recent Publications
          </h2>
          <div className="space-y-6">
            {publications.map((pub, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-600"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-blue-900 flex-1 pr-4">
                    {pub.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {pub.year}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">
                  <strong>Authors:</strong> {pub.authors}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>
                    <strong>Journal:</strong> {pub.journal}
                  </span>
                  <span>
                    <strong>Impact Factor:</strong> {pub.impact}
                  </span>
                  <span>
                    <strong>Citations:</strong> {pub.citations}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/research-innovation">
              <span className="inline-block bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition cursor-pointer">
                View All Publications
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Research Facilities */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Research Facilities
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {facilities.map((facility, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-3">
                {facility.name}
              </h3>
              <p className="text-gray-700 mb-4">{facility.description}</p>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Key Equipment:</h4>
                <ul className="space-y-1">
                  {facility.equipment.map((item, i) => (
                    <li key={i} className="text-gray-600 flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">
                  <strong>Capacity:</strong> {facility.capacity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collaboration Opportunities */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Research Collaboration Opportunities</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Partner with us on cutting-edge research projects. We welcome industry
            collaboration, joint research proposals, and academic partnerships.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact-us">
              <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg shadow-xl hover:bg-yellow-300 transition transform hover:scale-105 cursor-pointer">
                Partner With Us
              </span>
            </Link>
            <Link href="/join-our-team">
              <span className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition transform hover:scale-105 cursor-pointer">
                Join as Researcher
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
