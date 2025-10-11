import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaFileAlt,
  FaUserGraduate,
  FaRupeeSign,
} from "react-icons/fa";

export default function Admissions() {
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
            <span>Admissions</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">BBIT Admissions 2025</h1>
          <p className="text-xl opacity-90">
            Begin your journey to excellence. Join BBIT's world-class academic
            programs
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/how-to-apply">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border-t-4 border-blue-600">
              <FaFileAlt className="text-4xl text-blue-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">How to Apply</h3>
              <p className="text-sm text-gray-600">
                Step-by-step application process
              </p>
            </div>
          </Link>
          <Link href="/scholarship">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border-t-4 border-green-600">
              <FaRupeeSign className="text-4xl text-green-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">Scholarships</h3>
              <p className="text-sm text-gray-600">
                Financial aid options available
              </p>
            </div>
          </Link>
          <Link href="/education-loan">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border-t-4 border-purple-600">
              <FaRupeeSign className="text-4xl text-purple-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">Education Loan</h3>
              <p className="text-sm text-gray-600">Easy financing options</p>
            </div>
          </Link>
          <Link href="/register">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 text-white">
              <FaUserGraduate className="text-4xl mb-3" />
              <h3 className="font-bold text-lg mb-2">Apply Now</h3>
              <p className="text-sm">Start your application today</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Admission Process */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Admission Process
        </h2>
        <div className="grid md:grid-cols-5 gap-6">
          {[
            {
              step: "1",
              title: "Registration",
              desc: "Create your account and fill the application form online",
            },
            {
              step: "2",
              title: "Entrance Exam",
              desc: "Appear for JEE Main/WBJEE or BBIT entrance test",
            },
            {
              step: "3",
              title: "Counseling",
              desc: "Participate in counseling process based on your rank",
            },
            {
              step: "4",
              title: "Document Verification",
              desc: "Submit all required documents for verification",
            },
            {
              step: "5",
              title: "Fee Payment",
              desc: "Complete admission by paying the fees",
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              {index < 4 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-blue-600 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Programs Offered */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
            Programs Offered
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                level: "B.Tech",
                programs: [
                  "Computer Science",
                  "Electronics",
                  "Mechanical",
                  "Civil",
                  "Electrical",
                  "IT",
                ],
                seats: 60,
              },
              {
                level: "M.Tech",
                programs: ["CSE", "ECE", "Mechanical", "Structural"],
                seats: 18,
              },
              {
                level: "MBA",
                programs: ["General Management", "Marketing", "Finance", "HR"],
                seats: 120,
              },
              {
                level: "MCA",
                programs: ["Computer Applications", "Data Science"],
                seats: 60,
              },
              {
                level: "B.Sc",
                programs: ["Physics", "Chemistry", "Mathematics"],
                seats: 40,
              },
              {
                level: "M.Sc",
                programs: ["Physics", "Chemistry", "Mathematics"],
                seats: 20,
              },
            ].map((program, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-600"
              >
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  {program.level}
                </h3>
                <div className="space-y-2 mb-4">
                  {program.programs.map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{p}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-blue-200">
                  <span className="text-sm text-gray-600">
                    Intake Capacity:
                  </span>
                  <span className="ml-2 font-bold text-blue-900">
                    {program.seats} seats
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Eligibility Criteria
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              For B.Tech Programs
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>
                  Passed 10+2 with Physics, Chemistry, and Mathematics
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Minimum 45% aggregate (40% for SC/ST)</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Valid JEE Main or WBJEE score</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              For M.Tech Programs
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>B.Tech/B.E. degree in relevant discipline</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Minimum 50% aggregate (45% for SC/ST)</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Valid GATE score or BBIT entrance test</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Important Dates 2025
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { event: "Application Start", date: "January 15, 2025" },
              { event: "Application Deadline", date: "June 30, 2025" },
              { event: "Entrance Exam", date: "July 15-20, 2025" },
              { event: "Result Declaration", date: "July 30, 2025" },
              { event: "Counseling Dates", date: "August 5-15, 2025" },
              { event: "Classes Begin", date: "August 25, 2025" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FaCalendarAlt className="text-yellow-400 text-2xl" />
                  <h3 className="font-bold text-lg">{item.event}</h3>
                </div>
                <p className="text-yellow-400 font-semibold text-xl">
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">
            Need Help with Admissions?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our admission team is here to assist you
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="font-bold mb-2">Call Us</h3>
              <p className="text-2xl font-bold">8420123333</p>
              <p className="text-2xl font-bold">9836888444</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Toll Free</h3>
              <p className="text-2xl font-bold">1800 1212 88800</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-xl">admissions@bbitmail.in</p>
            </div>
          </div>
          <Link href="/register">
            <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              START YOUR APPLICATION NOW →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
