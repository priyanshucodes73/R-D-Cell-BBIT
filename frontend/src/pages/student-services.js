import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function StudentServices() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-900 to-cyan-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Student Services</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Student Services</h1>
          <p className="text-xl opacity-90">
            Supporting your academic journey and personal growth
          </p>
        </div>
      </section>

      {/* Quick Access */}
      <section className="bg-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🎓", label: "Academic Support", href: "#academic" },
              { icon: "🏥", label: "Health Services", href: "#health" },
              { icon: "🏠", label: "Hostel Services", href: "#hostel" },
              { icon: "💰", label: "Financial Aid", href: "#financial" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="flex flex-col items-center gap-3 p-6 bg-teal-50 rounded-xl hover:bg-teal-100 transition text-center"
              >
                <div className="text-4xl">{item.icon}</div>
                <div className="font-semibold text-teal-900">{item.label}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Support */}
      <section id="academic" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
          Academic Support Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "📚",
              title: "Academic Advising",
              desc: "One-on-one guidance for course selection, academic planning, and career pathways",
              features: [
                "Personal Academic Advisor",
                "Degree Progress Tracking",
                "Course Planning",
                "Major/Minor Selection",
              ],
            },
            {
              icon: "✍️",
              title: "Writing Center",
              desc: "Support for improving academic writing, research papers, and documentation",
              features: [
                "Essay Review",
                "Citation Help",
                "Research Guidance",
                "Grammar & Style",
              ],
            },
            {
              icon: "🧮",
              title: "Tutoring Services",
              desc: "Free peer tutoring and subject-specific help in mathematics, sciences, and more",
              features: [
                "Peer Tutors",
                "Group Study Sessions",
                "Online Tutoring",
                "Exam Preparation",
              ],
            },
            {
              icon: "🗣️",
              title: "Language Lab",
              desc: "Resources for improving communication skills and learning foreign languages",
              features: [
                "English Proficiency",
                "Foreign Languages",
                "Presentation Skills",
                "Public Speaking",
              ],
            },
            {
              icon: "💻",
              title: "IT Support",
              desc: "Technical assistance for software, systems, and online learning platforms",
              features: [
                "24/7 Help Desk",
                "Software Access",
                "Account Support",
                "Network Issues",
              ],
            },
            {
              icon: "🎯",
              title: "Career Counseling",
              desc: "Guidance for career planning, resume building, and interview preparation",
              features: [
                "Career Assessment",
                "Resume Reviews",
                "Mock Interviews",
                "Job Search Help",
              ],
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
            >
              <div className="text-5xl mb-4 text-center">{service.icon}</div>
              <h3 className="text-xl font-bold text-teal-900 mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-4 text-sm">{service.desc}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="text-green-600">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Health & Wellness */}
      <section
        id="health"
        className="bg-gradient-to-br from-teal-50 to-cyan-50 py-16"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
            Health & Wellness Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-5xl mb-4">🏥</div>
              <h3 className="text-2xl font-bold text-teal-900 mb-4">
                Medical Center
              </h3>
              <ul className="space-y-3">
                {[
                  "24/7 Emergency Medical Services",
                  "General Physician Consultation",
                  "Dental Services",
                  "Pharmacy with Essential Medicines",
                  "Annual Health Check-ups",
                  "Vaccinations & Immunizations",
                  "First Aid Training",
                  "Health Insurance Assistance",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-6 bg-teal-900 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition">
                Book Appointment
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-5xl mb-4">🧘</div>
              <h3 className="text-2xl font-bold text-teal-900 mb-4">
                Counseling & Mental Health
              </h3>
              <ul className="space-y-3">
                {[
                  "Professional Counseling Services",
                  "Stress Management Programs",
                  "Peer Support Groups",
                  "Workshops on Mental Wellness",
                  "Crisis Intervention",
                  "Confidential Sessions",
                  "Meditation & Yoga Classes",
                  "Online Counseling Available",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-6 bg-teal-900 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition">
                Schedule Counseling
              </button>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-4 gap-6">
            {[
              {
                icon: "🏋️",
                title: "Fitness Center",
                desc: "Gym with modern equipment",
              },
              {
                icon: "🏊",
                title: "Swimming Pool",
                desc: "Olympic-size pool facility",
              },
              {
                icon: "⚽",
                title: "Sports Complex",
                desc: "Multiple indoor & outdoor sports",
              },
              {
                icon: "🍎",
                title: "Nutrition Advice",
                desc: "Dietary consultation available",
              },
            ].map((facility, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="text-4xl mb-3">{facility.icon}</div>
                <h4 className="font-bold text-teal-900 mb-2">
                  {facility.title}
                </h4>
                <p className="text-sm text-gray-600">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hostel Services */}
      <section id="hostel" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
          Hostel & Accommodation
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-teal-900 mb-6">
              Boys Hostel
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Capacity</span>
                <span className="font-bold text-teal-900">2,000 Students</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Room Types</span>
                <span className="font-bold text-teal-900">
                  Single / Double / Triple
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">AC/Non-AC</span>
                <span className="font-bold text-teal-900">Both Available</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-red-50 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-teal-900 mb-6">
              Girls Hostel
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Capacity</span>
                <span className="font-bold text-teal-900">1,500 Students</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Room Types</span>
                <span className="font-bold text-teal-900">
                  Single / Double / Triple
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">AC/Non-AC</span>
                <span className="font-bold text-teal-900">Both Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-teal-900 mb-6">
            Hostel Facilities & Amenities
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🛏️",
                title: "Furnished Rooms",
                desc: "Bed, study table, chair, wardrobe",
              },
              {
                icon: "🍽️",
                title: "Mess Facility",
                desc: "Hygienic food with varied menu",
              },
              {
                icon: "📶",
                title: "Wi-Fi & Internet",
                desc: "High-speed connectivity 24/7",
              },
              {
                icon: "🔐",
                title: "Security",
                desc: "24/7 security with CCTV surveillance",
              },
              {
                icon: "🧺",
                title: "Laundry",
                desc: "Washing machine & drying facilities",
              },
              {
                icon: "📺",
                title: "Common Rooms",
                desc: "TV, indoor games, and recreation",
              },
              {
                icon: "💧",
                title: "Water Purifiers",
                desc: "RO water on all floors",
              },
              { icon: "🚿", title: "Hot Water", desc: "24/7 hot water supply" },
              {
                icon: "🏥",
                title: "Medical Room",
                desc: "First aid and emergency care",
              },
            ].map((amenity, idx) => (
              <div key={idx} className="border-l-4 border-teal-600 pl-4 py-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{amenity.icon}</span>
                  <h4 className="font-bold text-teal-900">{amenity.title}</h4>
                </div>
                <p className="text-sm text-gray-600">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Aid */}
      <section
        id="financial"
        className="bg-gradient-to-br from-yellow-50 to-orange-50 py-16"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
            Financial Aid & Scholarships
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Merit Scholarships",
                amount: "Up to 100% Tuition Fee Waiver",
                criteria: [
                  "Academic Excellence (90%+ in Class 12)",
                  "Top Performers in Entrance Exams",
                  "State/National Level Achievements",
                ],
                icon: "🏆",
              },
              {
                title: "Need-Based Aid",
                amount: "₹50,000 - ₹2 Lakhs per year",
                criteria: [
                  "Family Income < ₹4.5 Lakhs",
                  "Documentation Required",
                  "Renewable Each Year",
                ],
                icon: "💰",
              },
              {
                title: "Sports Scholarships",
                amount: "Up to 50% Fee Waiver",
                criteria: [
                  "National/State Level Sports Achievements",
                  "Participation in University Teams",
                  "Maintain Academic Standards",
                ],
                icon: "⚽",
              },
              {
                title: "SC/ST/OBC Scholarships",
                amount: "As per Government Norms",
                criteria: [
                  "Valid Caste Certificate",
                  "Government Scholarship Portal Registration",
                  "Income Certificate",
                ],
                icon: "📜",
              },
            ].map((scholarship, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-5xl mb-4 text-center">
                  {scholarship.icon}
                </div>
                <h3 className="text-2xl font-bold text-teal-900 mb-3 text-center">
                  {scholarship.title}
                </h3>
                <div className="text-xl font-bold text-orange-600 mb-4 text-center">
                  {scholarship.amount}
                </div>
                <div className="text-sm font-semibold text-gray-700 mb-3">
                  Eligibility Criteria:
                </div>
                <ul className="space-y-2">
                  {scholarship.criteria.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-green-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 bg-teal-900 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
          Additional Student Services
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              icon: "🚌",
              title: "Transport",
              desc: "Bus service across the city",
            },
            {
              icon: "🏦",
              title: "Banking",
              desc: "On-campus ATM & bank branch",
            },
            {
              icon: "📮",
              title: "Post Office",
              desc: "Postal & courier services",
            },
            {
              icon: "🍕",
              title: "Food Court",
              desc: "Multiple cuisine options",
            },
            { icon: "📖", title: "Stationery", desc: "Books & supplies store" },
            {
              icon: "☕",
              title: "Cafeteria",
              desc: "Coffee shops & snack bars",
            },
            {
              icon: "🖨️",
              title: "Print Shop",
              desc: "Printing & photocopying",
            },
            {
              icon: "🎨",
              title: "Student Clubs",
              desc: "50+ clubs & societies",
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-bold text-teal-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gradient-to-r from-teal-900 to-cyan-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Need Assistance?</h2>
          <p className="text-xl mb-8">
            Our student services team is here to help you with any questions or
            concerns.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <span>📧</span>
              <span>studentservices@bbit.edu.in</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>+91-11-2345-6700</span>
            </div>
          </div>
          <button className="bg-white text-teal-900 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
            Contact Student Services
          </button>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
