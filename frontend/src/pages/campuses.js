import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function Campuses() {
  const [selectedCampus, setSelectedCampus] = useState(0);

  const campuses = [
    {
      name: "Main Campus - Delhi",
      location: "Sector 15, New Delhi - 110001",
      area: "150 Acres",
      established: "1995",
      students: "15,000+",
      image: "🏛️",
      description:
        "Our flagship campus in the heart of Delhi features state-of-the-art infrastructure, including modern laboratories, libraries, sports facilities, and student amenities.",
      facilities: [
        "Central Library with 100,000+ books",
        "50+ Advanced Research Labs",
        "Olympic-size Swimming Pool",
        "Indoor Sports Complex",
        "300-seater Auditorium",
        "24/7 Wi-Fi Campus",
        "Food Court with Multiple Cuisines",
        "On-campus Hospital",
      ],
      departments: [
        "Engineering",
        "Management",
        "Sciences",
        "Architecture",
        "Design",
      ],
    },
    {
      name: "Greater Noida Campus",
      location: "Knowledge Park, Greater Noida - 201310",
      area: "75 Acres",
      established: "2008",
      students: "8,000+",
      image: "🏫",
      description:
        "Modern campus with focus on technology and innovation, featuring cutting-edge facilities and collaborative learning spaces.",
      facilities: [
        "Innovation & Startup Hub",
        "30+ Specialized Labs",
        "Digital Library",
        "Cafeteria & Food Courts",
        "Sports Ground",
        "Smart Classrooms",
        "Co-working Spaces",
        "Transportation Facility",
      ],
      departments: ["Computer Science", "IT", "Electronics", "Biotechnology"],
    },
    {
      name: "Gurgaon Campus",
      location: "Golf Course Road, Gurgaon - 122001",
      area: "50 Acres",
      established: "2015",
      students: "5,000+",
      image: "🌆",
      description:
        "Contemporary campus designed for executive education and management programs with strong industry connections.",
      facilities: [
        "Executive MBA Center",
        "Business Incubation Hub",
        "Conference Facilities",
        "Industry Interface Center",
        "Lounge & Recreation",
        "Premium Dining",
        "Fitness Center",
        "Guest House",
      ],
      departments: ["MBA", "Executive Programs", "Corporate Training"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Breadcrumb */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Campuses</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Our Campuses</h1>
          <p className="text-xl opacity-90">
            World-class infrastructure spread across strategic locations
          </p>
        </div>
      </section>

      {/* Campus Overview Stats */}
      <section className="bg-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">3</div>
              <div className="text-gray-600">Campuses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">275+</div>
              <div className="text-gray-600">Acres</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">
                28,000+
              </div>
              <div className="text-gray-600">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">150+</div>
              <div className="text-gray-600">Labs & Facilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Selector */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {campuses.map((campus, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCampus(idx)}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 ${
                selectedCampus === idx
                  ? "bg-blue-900 text-white shadow-xl"
                  : "bg-white text-blue-900 border-2 border-blue-900 hover:bg-blue-50"
              }`}
            >
              {campus.name}
            </button>
          ))}
        </div>

        {/* Selected Campus Details */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 text-center">
            <div className="text-8xl mb-4">
              {campuses[selectedCampus].image}
            </div>
            <h2 className="text-4xl font-bold mb-2">
              {campuses[selectedCampus].name}
            </h2>
            <p className="text-xl opacity-90">
              📍 {campuses[selectedCampus].location}
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {campuses[selectedCampus].area}
                </div>
                <div className="text-sm text-gray-600">Total Area</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {campuses[selectedCampus].established}
                </div>
                <div className="text-sm text-gray-600">Established</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {campuses[selectedCampus].students}
                </div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {campuses[selectedCampus].departments.length}
                </div>
                <div className="text-sm text-gray-600">Departments</div>
              </div>
            </div>

            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              {campuses[selectedCampus].description}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Key Facilities
                </h3>
                <ul className="space-y-3">
                  {campuses[selectedCampus].facilities.map((facility, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-600 text-xl">✓</span>
                      <span className="text-gray-700">{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Academic Departments
                </h3>
                <div className="space-y-3">
                  {campuses[selectedCampus].departments.map((dept, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-600"
                    >
                      <div className="font-semibold text-blue-900">{dept}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              <a
                href="#"
                className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Schedule Campus Visit
              </a>
              <a
                href="#"
                className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Virtual Tour
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Life Highlights */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">
            Campus Life Highlights
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎓",
                title: "Academic Excellence",
                desc: "State-of-the-art classrooms and laboratories",
              },
              {
                icon: "🏆",
                title: "Sports & Fitness",
                desc: "Modern sports facilities and fitness centers",
              },
              {
                icon: "🎭",
                title: "Cultural Activities",
                desc: "Vibrant cultural clubs and annual festivals",
              },
              {
                icon: "🍔",
                title: "Dining Options",
                desc: "Multiple food courts and cafeterias",
              },
              {
                icon: "🏠",
                title: "Hostel Facilities",
                desc: "Comfortable and secure accommodation",
              },
              {
                icon: "🚌",
                title: "Transportation",
                desc: "Campus-wide shuttle and city connectivity",
              },
            ].map((highlight, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition"
              >
                <div className="text-5xl mb-4">{highlight.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
