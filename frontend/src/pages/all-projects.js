import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function AllProjects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const projects = [
    {
      id: 1,
      title: "AI-Powered Healthcare Diagnosis System",
      pi: "Dr. Jayanta Basak",
      coInvestigators: ["Dr. Moumita Paul", "Dr. Sagar Chakraborty"],
      category: "Artificial Intelligence",
      department: "Computer Science",
      funding: "DST-SERB Grant",
      fundingAmount: "₹45 Lakhs",
      duration: "2024-2026",
      startDate: "January 2024",
      status: "Active",
      progress: 45,
      description: "Developing an AI-based diagnostic tool for early detection of cardiovascular diseases using deep learning and medical imaging. The system uses convolutional neural networks to analyze ECG patterns, medical images, and patient data to predict potential cardiac issues.",
      objectives: [
        "Develop deep learning models for ECG analysis",
        "Create a dataset of 50,000+ annotated medical images",
        "Achieve 95%+ accuracy in disease detection",
        "Deploy pilot system in 3 hospitals",
      ],
      outcomes: [
        "Published 2 papers in IEEE journals",
        "Filed 1 patent for the diagnostic algorithm",
        "Collaborated with 2 hospitals for data collection",
      ],
    },
    {
      id: 2,
      title: "Smart Campus IoT Infrastructure",
      pi: "Dr. Sandeep Malik",
      coInvestigators: ["Dr. Uddyalok Chakraborty"],
      category: "IoT & Smart Systems",
      department: "Electronics & Communication",
      funding: "Industry Collaboration - TCS",
      fundingAmount: "₹80 Lakhs",
      duration: "2023-2025",
      startDate: "August 2023",
      status: "Active",
      progress: 70,
      description: "Implementing IoT sensors and analytics for energy optimization, security monitoring, and resource management across campus. The project involves deployment of 500+ sensors, real-time data analytics, and automated control systems.",
      objectives: [
        "Deploy 500+ IoT sensors across campus",
        "Reduce energy consumption by 30%",
        "Implement real-time security monitoring",
        "Create predictive maintenance system",
      ],
      outcomes: [
        "Deployed 350 sensors in Phase 1",
        "Achieved 22% energy reduction so far",
        "Developed mobile app for monitoring",
      ],
    },
    {
      id: 3,
      title: "Blockchain for Supply Chain Transparency",
      pi: "Dr. Munsi Yusuf Alam",
      coInvestigators: ["Dr. Ashok Shaw"],
      category: "Blockchain & Cybersecurity",
      department: "Information Technology",
      funding: "AICTE Research Grant",
      fundingAmount: "₹35 Lakhs",
      duration: "2024-2025",
      startDate: "March 2024",
      status: "Active",
      progress: 55,
      description: "Creating a blockchain-based platform for tracking and verifying product authenticity in pharmaceutical supply chains. The system uses Hyperledger Fabric to create an immutable record of product journey from manufacturer to end consumer.",
      objectives: [
        "Develop blockchain platform using Hyperledger",
        "Integrate with 10 pharmaceutical companies",
        "Create mobile verification app for consumers",
        "Ensure compliance with regulatory standards",
      ],
      outcomes: [
        "Platform architecture completed",
        "3 pilot companies onboarded",
        "Presented at 2 international conferences",
      ],
    },
    {
      id: 4,
      title: "Natural Language Processing for Regional Languages",
      pi: "Dr. Uddyalok Chakraborty",
      coInvestigators: ["Dr. Jayanta Basak"],
      category: "Artificial Intelligence",
      department: "Computer Science",
      funding: "ICSSR Funding",
      fundingAmount: "₹40 Lakhs",
      duration: "2023-2026",
      startDate: "June 2023",
      status: "Active",
      progress: 60,
      description: "Building NLP models and datasets for low-resource Indian languages to enable better digital accessibility. Focus on Bengali, Assamese, and Odia languages with applications in machine translation, sentiment analysis, and text generation.",
      objectives: [
        "Create annotated datasets of 1M+ sentences",
        "Develop transformer models for 3 languages",
        "Build translation system with 90%+ accuracy",
        "Release open-source language models",
      ],
      outcomes: [
        "Released Bengali dataset with 500K sentences",
        "Published 3 papers in ACL conferences",
        "Developed beta version of translation app",
      ],
    },
    {
      id: 5,
      title: "Autonomous Agricultural Robots",
      pi: "Dr. Moumita Paul",
      coInvestigators: ["Dr. Arindom Mitra"],
      category: "Robotics & Automation",
      department: "Mechanical Engineering",
      funding: "DBT-BioCARE Grant",
      fundingAmount: "₹65 Lakhs",
      duration: "2024-2027",
      startDate: "January 2024",
      status: "Active",
      progress: 35,
      description: "Developing autonomous robots for precision agriculture, crop monitoring, and automated harvesting. The robots use computer vision, GPS navigation, and robotic arms to perform various agricultural tasks with minimal human intervention.",
      objectives: [
        "Build 3 prototype robots for different tasks",
        "Implement computer vision for crop health monitoring",
        "Achieve autonomous navigation in fields",
        "Test with 20+ farmers in West Bengal",
      ],
      outcomes: [
        "First prototype robot completed",
        "Filed 1 patent for robotic gripper design",
        "Partnered with 5 farms for field testing",
      ],
    },
    {
      id: 6,
      title: "Smart Grid Energy Management System",
      pi: "Dr. Sandeep Malik",
      coInvestigators: ["Dr. Uddyalok Chakraborty", "Dr. Arindom Mitra"],
      category: "IoT & Smart Systems",
      department: "Electronics & Communication",
      funding: "MNRE Grant",
      fundingAmount: "₹55 Lakhs",
      duration: "2023-2025",
      startDate: "September 2023",
      status: "Active",
      progress: 65,
      description: "Developing an intelligent energy management system for smart grids with renewable energy integration, demand prediction, and load balancing capabilities. The system uses machine learning for energy consumption forecasting and optimization.",
      objectives: [
        "Integrate solar and wind energy sources",
        "Predict energy demand with 95% accuracy",
        "Reduce peak load by 25%",
        "Implement dynamic pricing system",
      ],
      outcomes: [
        "Deployed pilot in university campus",
        "Achieved 92% prediction accuracy",
        "Published 2 papers in energy journals",
      ],
    },
    {
      id: 7,
      title: "Cybersecurity Framework for Critical Infrastructure",
      pi: "Dr. Munsi Yusuf Alam",
      coInvestigators: ["Dr. Sandeep Malik"],
      category: "Blockchain & Cybersecurity",
      department: "Information Technology",
      funding: "MeitY Grant",
      fundingAmount: "₹50 Lakhs",
      duration: "2024-2026",
      startDate: "April 2024",
      status: "Active",
      progress: 40,
      description: "Creating a comprehensive cybersecurity framework for protecting critical infrastructure including power grids, water supply systems, and transportation networks. The framework includes intrusion detection, threat intelligence, and incident response mechanisms.",
      objectives: [
        "Develop AI-based intrusion detection system",
        "Create threat intelligence platform",
        "Build incident response automation",
        "Train 100+ professionals in cybersecurity",
      ],
      outcomes: [
        "Framework architecture designed",
        "IDS prototype tested on campus network",
        "Conducted 2 training workshops",
      ],
    },
    {
      id: 8,
      title: "3D Printing for Customized Medical Implants",
      pi: "Dr. Moumita Paul",
      coInvestigators: ["Dr. Sagar Chakraborty"],
      category: "Biotechnology",
      department: "Mechanical Engineering",
      funding: "BIRAC Grant",
      fundingAmount: "₹70 Lakhs",
      duration: "2023-2026",
      startDate: "July 2023",
      status: "Active",
      progress: 50,
      description: "Using advanced 3D printing technology to create patient-specific medical implants including bone replacements, dental implants, and prosthetics. The project focuses on biocompatible materials and precise customization based on CT/MRI scans.",
      objectives: [
        "Develop biocompatible printing materials",
        "Create 50+ customized implant designs",
        "Achieve regulatory approval for implants",
        "Partner with 5 hospitals for clinical trials",
      ],
      outcomes: [
        "Developed 3 biocompatible materials",
        "Created 20 successful implant prototypes",
        "Published 4 papers in medical journals",
      ],
    },
    {
      id: 9,
      title: "Machine Learning for Climate Change Prediction",
      pi: "Dr. Uddyalok Chakraborty",
      coInvestigators: ["Dr. Arindom Mitra"],
      category: "Environmental Science",
      department: "Computer Science",
      funding: "DST Climate Change Programme",
      fundingAmount: "₹45 Lakhs",
      duration: "2024-2026",
      startDate: "February 2024",
      status: "Active",
      progress: 38,
      description: "Developing machine learning models to predict regional climate patterns, extreme weather events, and their impact on agriculture and water resources. The project uses historical climate data and satellite imagery for training predictive models.",
      objectives: [
        "Build climate prediction models for Eastern India",
        "Predict extreme weather events 7 days in advance",
        "Assess impact on agriculture and water resources",
        "Create early warning system for farmers",
      ],
      outcomes: [
        "Collected 50 years of climate data",
        "Developed baseline prediction models",
        "Collaborated with IMD for data access",
      ],
    },
    {
      id: 10,
      title: "Quantum Computing Applications in Cryptography",
      pi: "Dr. Jayanta Basak",
      coInvestigators: ["Dr. Munsi Yusuf Alam"],
      category: "Emerging Technologies",
      department: "Computer Science",
      funding: "DRDO Project",
      fundingAmount: "₹90 Lakhs",
      duration: "2024-2027",
      startDate: "May 2024",
      status: "Active",
      progress: 25,
      description: "Exploring quantum computing algorithms for cryptographic applications including quantum key distribution, post-quantum cryptography, and quantum random number generation. The project aims to develop quantum-resistant encryption methods.",
      objectives: [
        "Develop quantum cryptography protocols",
        "Implement quantum key distribution system",
        "Create post-quantum encryption algorithms",
        "Build quantum simulator for testing",
      ],
      outcomes: [
        "Quantum simulator setup completed",
        "1 paper published in quantum computing journal",
        "Collaboration established with IIT Delhi",
      ],
    },
    {
      id: 11,
      title: "Smart Water Quality Monitoring System",
      pi: "Dr. Arindom Mitra",
      coInvestigators: ["Dr. Sandeep Malik"],
      category: "Environmental Science",
      department: "Civil Engineering",
      funding: "CPCB Grant",
      fundingAmount: "₹30 Lakhs",
      duration: "2023-2025",
      startDate: "October 2023",
      status: "Active",
      progress: 75,
      description: "IoT-based water quality monitoring system for rivers and lakes with real-time data collection, analysis, and pollution alerts. The system monitors pH, dissolved oxygen, turbidity, and harmful contaminants.",
      objectives: [
        "Deploy 50 monitoring stations across 5 rivers",
        "Provide real-time water quality data",
        "Create pollution alert system",
        "Develop mobile app for public access",
      ],
      outcomes: [
        "40 stations deployed and operational",
        "Mobile app launched with 5000+ users",
        "Identified 12 pollution hotspots",
      ],
    },
    {
      id: 12,
      title: "Virtual Reality for Engineering Education",
      pi: "Dr. Ashok Shaw",
      coInvestigators: ["Dr. Jayanta Basak", "Dr. Moumita Paul"],
      category: "Educational Technology",
      department: "MBA & Computer Science",
      funding: "UGC Innovation Grant",
      fundingAmount: "₹25 Lakhs",
      duration: "2024-2025",
      startDate: "March 2024",
      status: "Active",
      progress: 55,
      description: "Developing VR-based learning modules for engineering education including virtual labs, 3D simulations, and interactive demonstrations. The project aims to enhance practical learning through immersive technology.",
      objectives: [
        "Create 20 VR learning modules",
        "Cover 5 engineering disciplines",
        "Test with 500+ students",
        "Measure learning outcome improvements",
      ],
      outcomes: [
        "12 modules developed and tested",
        "300 students participated in pilot",
        "30% improvement in concept retention",
      ],
    },
  ];

  const categories = [
    "all",
    "Artificial Intelligence",
    "IoT & Smart Systems",
    "Blockchain & Cybersecurity",
    "Robotics & Automation",
    "Biotechnology",
    "Environmental Science",
    "Educational Technology",
    "Emerging Technologies",
  ];

  const statuses = ["all", "Active", "Completed", "Ongoing"];

  const filteredProjects = projects.filter((project) => {
    const categoryMatch =
      selectedCategory === "all" || project.category === selectedCategory;
    const statusMatch =
      selectedStatus === "all" || project.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "Active").length,
    totalFunding: "₹6.5 Cr+",
    publications: 45,
  };

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
            <span>All Research Projects</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Research Projects</h1>
          <p className="text-xl opacity-90">
            Comprehensive overview of all ongoing and completed research initiatives at BBIT
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">
                {stats.total}
              </div>
              <div className="text-gray-600">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-900 mb-2">
                {stats.active}
              </div>
              <div className="text-gray-600">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-900 mb-2">
                {stats.totalFunding}
              </div>
              <div className="text-gray-600">Total Funding</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-900 mb-2">
                {stats.publications}
              </div>
              <div className="text-gray-600">Publications</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Status" : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="space-y-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                        {project.category}
                      </span>
                      <span className="bg-green-400/90 text-green-900 px-3 py-1 rounded-full text-xs font-bold">
                        {project.status}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                    <div className="flex gap-4 text-sm opacity-90">
                      <span>🏢 {project.department}</span>
                      <span>📅 {project.duration}</span>
                      <span>💰 {project.fundingAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Principal Investigator:
                    </h4>
                    <p className="text-blue-700 font-semibold">{project.pi}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Funding Agency:
                    </h4>
                    <p className="text-gray-700">{project.funding}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Start Date:
                    </h4>
                    <p className="text-gray-700">{project.startDate}</p>
                  </div>
                </div>

                {project.coInvestigators && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Co-Investigators:
                    </h4>
                    <p className="text-gray-700">
                      {project.coInvestigators.join(", ")}
                    </p>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Progress:</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {project.progress}%
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Project Description:
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">
                      Key Objectives:
                    </h4>
                    <ul className="space-y-2">
                      {project.objectives.map((obj, idx) => (
                        <li
                          key={idx}
                          className="text-gray-700 flex items-start gap-2"
                        >
                          <span className="text-blue-600 mt-1">🎯</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-900 mb-3">
                      Key Outcomes:
                    </h4>
                    <ul className="space-y-2">
                      {project.outcomes.map((outcome, idx) => (
                        <li
                          key={idx}
                          className="text-gray-700 flex items-start gap-2"
                        >
                          <span className="text-green-600 mt-1">✓</span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Project ID: BBIT-{project.id.toString().padStart(3, "0")}
                  </div>
                  <Link href="/contact-us">
                    <span className="inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                      Contact PI
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Interested in Collaborating?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            We welcome industry partnerships, joint research proposals, and
            academic collaborations on our ongoing projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact-us">
              <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg shadow-xl hover:bg-yellow-300 transition transform hover:scale-105 cursor-pointer">
                Get in Touch
              </span>
            </Link>
            <Link href="/explore-research">
              <span className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition transform hover:scale-105 cursor-pointer">
                Explore Research Areas
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
