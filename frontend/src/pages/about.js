import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function About() {
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
            <span>About Us</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">About BBIT</h1>
          <p className="text-xl opacity-90">
            Building future leaders through excellence in education, research,
            and innovation
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Overview</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg mb-4">
              Budge Budge Institute of Technology (BBIT) is a premier technical
              institution located in Nischintapur, Budge Budge, Kolkata. We are
              proud to be accredited by NBA (for CSE, EE, ECE, ME departments)
              and NAAC, affiliated to MAKAUT (Maulana Abul Kalam Azad University
              of Technology) and WBSCTVESD (West Bengal State Council of
              Technical & Vocational Education and Skill Development), and
              recognized by UGC.
            </p>
            <p className="text-gray-700 text-lg mb-4">
              With over 15,000+ students who have studied at BBIT and 10,500+
              students successfully placed across 135 top recruiters, we have
              established ourselves as a leading institution in technical
              education. Our commitment to excellence is reflected in our
              state-of-the-art infrastructure, including spacious multimedia
              classrooms, well-equipped laboratories, modern library, high-speed
              Wi-Fi campus, and dedicated training facilities.
            </p>
            <p className="text-gray-700 text-lg mb-4">
              BBIT has promoted significant research and development activities
              with a vision to continue and promote research excellence. We
              maintain strong industry tie-ups for student training, ensuring
              that knowledge gained in the institute is fruitfully utilized in
              real-world applications.
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 border-t-4 border-blue-600">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-700">
              To be a globally recognized institution of higher learning,
              fostering innovation, research excellence, and holistic
              development, producing leaders who contribute positively to
              society and drive technological advancement.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-lg p-8 border-t-4 border-green-600">
            <div className="text-5xl mb-4">🧭</div>
            <h3 className="text-2xl font-bold text-green-900 mb-4">
              Our Mission
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>
                  Provide quality education with emphasis on practical learning
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Foster research and innovation culture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Develop industry-ready professionals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Promote ethical values and social responsibility</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-bold text-lg mb-2">Excellence</h3>
              <p className="text-sm text-gray-600">
                Striving for the highest standards in everything we do
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-bold text-lg mb-2">Integrity</h3>
              <p className="text-sm text-gray-600">
                Upholding honesty, transparency, and ethical conduct
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="font-bold text-lg mb-2">Innovation</h3>
              <p className="text-sm text-gray-600">
                Encouraging creativity and out-of-the-box thinking
              </p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold text-lg mb-2">Learning</h3>
              <p className="text-sm text-gray-600">
                Fostering continuous learning and development
              </p>
            </div>
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <div className="text-4xl mb-3">🌎</div>
              <h3 className="font-bold text-lg mb-2">Diversity</h3>
              <p className="text-sm text-gray-600">
                Celebrating inclusive and multicultural environment
              </p>
            </div>
            <div className="text-center p-6 bg-indigo-50 rounded-lg">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-bold text-lg mb-2">Responsibility</h3>
              <p className="text-sm text-gray-600">
                Contributing positively to society and environment
              </p>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Our Leadership
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                JG
              </div>
              <h3 className="font-bold text-xl mb-1">Shri Jagannath Gupta</h3>
              <p className="text-blue-600 font-semibold mb-2">Chairman</p>
              <p className="text-sm text-gray-600">
                Visionary leader with extensive experience in education
                management
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                SG
              </div>
              <h3 className="font-bold text-xl mb-1">Dr. Shubhangi Gupta</h3>
              <p className="text-green-600 font-semibold mb-2">
                Executive Director
              </p>
              <p className="text-sm text-gray-600">
                Leading institution's strategic growth and academic excellence
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                SM
              </div>
              <h3 className="font-bold text-xl mb-1">
                Prof. (Dr.) Sandeep Malik
              </h3>
              <p className="text-purple-600 font-semibold mb-2">Principal</p>
              <p className="text-sm text-gray-600">
                Dedicated to fostering academic excellence and student
                development
              </p>
            </div>
          </div>
        </div>

        {/* Recognition & Approvals */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Recognition & Accreditations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="text-4xl">🏆</div>
              <div>
                <h3 className="font-bold text-lg">NBA Accredited</h3>
                <p className="text-sm text-gray-600">
                  CSE, EE, ECE, ME departments accredited by National Board of
                  Accreditation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="text-4xl">⭐</div>
              <div>
                <h3 className="font-bold text-lg">NAAC Accredited</h3>
                <p className="text-sm text-gray-600">
                  National Assessment and Accreditation Council
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="text-4xl">🎓</div>
              <div>
                <h3 className="font-bold text-lg">MAKAUT Affiliated</h3>
                <p className="text-sm text-gray-600">
                  Maulana Abul Kalam Azad University of Technology
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="text-4xl">📜</div>
              <div>
                <h3 className="font-bold text-lg">WBSCTVESD Affiliated</h3>
                <p className="text-sm text-gray-600">
                  West Bengal State Council of Technical & Vocational Education
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="text-4xl">✓</div>
              <div>
                <h3 className="font-bold text-lg">UGC Recognized</h3>
                <p className="text-sm text-gray-600">
                  University Grants Commission
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Rankings */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Awards & Rankings
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <h3 className="font-bold text-lg mb-1">
                Best Engineering College 2024
              </h3>
              <p className="text-sm text-gray-600">
                Times Engineering Excellence Awards
              </p>
            </div>
            <div className="border-l-4 border-green-600 pl-4 py-2">
              <h3 className="font-bold text-lg mb-1">
                Top 50 Engineering Colleges in India
              </h3>
              <p className="text-sm text-gray-600">NIRF Ranking 2024</p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4 py-2">
              <h3 className="font-bold text-lg mb-1">
                Excellence in Research Award
              </h3>
              <p className="text-sm text-gray-600">
                Indian Education Congress 2023
              </p>
            </div>
            <div className="border-l-4 border-orange-600 pl-4 py-2">
              <h3 className="font-bold text-lg mb-1">Best Placement Record</h3>
              <p className="text-sm text-gray-600">
                Higher Education Forum 2024
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">
            BBIT at a Glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <div className="text-sm opacity-90">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Faculty Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-sm opacity-90">Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-sm opacity-90">Research Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">300+</div>
              <div className="text-sm opacity-90">Industry Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-sm opacity-90">Alumni Network</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-sm opacity-90">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
