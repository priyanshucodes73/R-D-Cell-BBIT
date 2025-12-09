import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function Campuses() {
  const [selectedCampus, setSelectedCampus] = useState(0);

  const campuses = [
    {
      name: "BBIT Campus - Kolkata",
      location: "Nischintapur, Budge Budge, Kolkata - 700138, West Bengal, India",
      area: "Spacious Campus",
      established: "Affiliated to MAKAUT",
      students: "15,000+",
      image: "🏛️",
      description:
        "Budge Budge Institute of Technology (BBIT) is a premier engineering institution located in Budge Budge, Kolkata. The institute is accredited by NBA (CSE, EE, ECE, ME) & NAAC, affiliated to MAKAUT & WBSCTVESD and recognized by UGC. Our campus features state-of-the-art infrastructure with modern facilities designed for comprehensive technical education and research.",
      facilities: [
        "Fully Wi-Fi Campus with High-Speed Connectivity",
        "Central Library with Extensive Collection",
        "Well-equipped Laboratories for All Departments",
        "Audio-Visual Classrooms",
        "Computing Center with Latest Technology",
        "Central Workshop",
        "Seminar Hall",
        "Air-Conditioned Conference Hall",
        "Placement Assistance Cell",
        "Sports Facilities",
        "Campus Security 24/7",
        "Hostel Accommodation",
      ],
      departments: [
        "Computer Science & Engineering (CSE)",
        "Electrical Engineering (EE)",
        "Electronics & Communication Engineering (ECE)",
        "Mechanical Engineering (ME)",
        "Information Technology (IT)",
        "Civil Engineering",
        "MBA Program",
        "M.Tech Programs",
        "Polytechnic Courses",
      ],
      accreditations: [
        "NBA Accredited (CSE, EE, ECE, ME)",
        "NAAC Accredited",
        "Affiliated to MAKAUT (Maulana Abul Kalam Azad University of Technology)",
        "Affiliated to WBSCTVESD",
        "Recognized by UGC (University Grants Commission)",
      ],
      contact: {
        phone: "033 2482 0641",
        mobile: "8420123333 / 9836888444",
        email: "contact@bbit.edu.in",
      },
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
          <h1 className="text-5xl font-bold mb-4">Our Campus</h1>
          <p className="text-xl opacity-90">
            Premier Engineering Institute in Kolkata - NBA & NAAC Accredited
          </p>
        </div>
      </section>

      {/* Campus Overview Stats */}
      <section className="bg-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">15,000+</div>
              <div className="text-gray-600">Students Studied</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">10,500+</div>
              <div className="text-gray-600">Students Placed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">
                135+
              </div>
              <div className="text-gray-600">Recruiters</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">14+</div>
              <div className="text-gray-600">Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Details */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {/* Selected Campus Details */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 text-center">
            <div className="text-8xl mb-4">
              {campuses[0].image}
            </div>
            <h2 className="text-4xl font-bold mb-2">
              {campuses[0].name}
            </h2>
            <p className="text-xl opacity-90">
              📍 {campuses[0].location}
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {campuses[0].area}
                </div>
                <div className="text-sm text-gray-600">Campus Area</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {campuses[0].established}
                </div>
                <div className="text-sm text-gray-600">Affiliation</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {campuses[0].students}
                </div>
                <div className="text-sm text-gray-600">Students Studied</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {campuses[0].departments.length}
                </div>
                <div className="text-sm text-gray-600">Programs</div>
              </div>
            </div>

            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              {campuses[0].description}
            </p>

            {/* Accreditations Section */}
            <div className="mb-8 bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
              <h3 className="text-2xl font-bold text-green-900 mb-4">
                Accreditations & Recognition
              </h3>
              <ul className="space-y-3">
                {campuses[0].accreditations.map((accr, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">🏆</span>
                    <span className="text-gray-700 font-semibold">{accr}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Campus Facilities
                </h3>
                <ul className="space-y-3">
                  {campuses[0].facilities.map((facility, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-600 text-xl">✓</span>
                      <span className="text-gray-700">{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Academic Programs
                </h3>
                <div className="space-y-3">
                  {campuses[0].departments.map((dept, idx) => (
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

            {/* Contact Information */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Contact Information
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="text-lg font-semibold text-blue-900">
                    {campuses[0].contact.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Mobile</p>
                  <p className="text-lg font-semibold text-blue-900">
                    {campuses[0].contact.mobile}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-lg font-semibold text-blue-900">
                    {campuses[0].contact.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              <Link
                href="/contact-us"
                className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Contact Us
              </Link>
              <Link
                href="/admissions"
                className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Apply for Admission
              </Link>
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
