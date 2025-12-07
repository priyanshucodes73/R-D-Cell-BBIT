import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function InnovationEntrepreneurship() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Innovation & Entrepreneurship</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Innovation & Entrepreneurship at BBIT
          </h1>
          <p className="text-xl opacity-90">
            Empowering creative minds to transform ideas into viable business
            opportunities
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Hub of Excellence
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg mb-4">
              BBIT has firmly established itself as a rapidly rising hub of
              excellence for innovation and entrepreneurship. We actively
              nurture and empower creative ideas across diverse fields,
              transforming them into valuable and viable business opportunities.
              Our institution fosters a culture where innovation thrives and
              entrepreneurial spirit flourishes.
            </p>
            <p className="text-gray-700 text-lg mb-4">
              Through our comprehensive ecosystem, we provide students and
              faculty with the resources, mentorship, and infrastructure needed
              to turn their innovative concepts into successful ventures. From
              ideation to commercialization, we support every stage of the
              entrepreneurial journey.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-blue-900 mb-2">50+</div>
            <div className="text-gray-700">Startups Incubated</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-green-900 mb-2">₹25Cr+</div>
            <div className="text-gray-700">Funding Raised</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-purple-900 mb-2">100+</div>
            <div className="text-gray-700">Patents Filed</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-yellow-900 mb-2">30+</div>
            <div className="text-gray-700">Industry Partners</div>
          </div>
        </div>

        {/* Our Facilities */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Innovation Infrastructure
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">
                Incubation Center
              </h3>
              <p className="text-gray-700 mb-4">
                State-of-the-art incubation facility with modern workspaces,
                meeting rooms, and collaborative areas. Our center provides
                24/7 access, high-speed internet, and all necessary
                infrastructure for startups to grow.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Co-working spaces for 50+ startups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Private cabins and meeting rooms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>High-speed fiber optic connectivity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>24/7 access and security</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-purple-900 mb-3">
                Maker Lab
              </h3>
              <p className="text-gray-700 mb-4">
                Fully equipped prototyping laboratory with cutting-edge tools
                and equipment. Students and entrepreneurs can bring their ideas
                to life with access to 3D printers, electronics workbenches,
                and fabrication tools.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>3D printing and rapid prototyping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>Electronics and IoT lab</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>Woodworking and fabrication tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>Testing and measurement equipment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Programs & Support */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Entrepreneurship Programs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                Pre-Incubation Support
              </h3>
              <p className="text-gray-700 mb-3">
                For early-stage ideas and concepts still in development phase.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Idea validation workshops</li>
                <li>• Market research support</li>
                <li>• Initial mentorship</li>
                <li>• Access to maker lab</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="text-xl font-bold text-green-900 mb-3">
                Incubation Program
              </h3>
              <p className="text-gray-700 mb-3">
                Comprehensive support for startups ready to scale and grow.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Seed funding up to ₹10 lakhs</li>
                <li>• Dedicated workspace</li>
                <li>• Expert mentorship</li>
                <li>• Legal & accounting support</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                Acceleration Program
              </h3>
              <p className="text-gray-700 mb-3">
                Fast-track program for startups with proven business models.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Growth funding opportunities</li>
                <li>• Investor connections</li>
                <li>• International exposure</li>
                <li>• Market expansion support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  ET
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900">
                    EduTech Solutions
                  </h3>
                  <p className="text-sm text-gray-600">Founded by Rahul Verma & Priya Singh</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                AI-powered personalized learning platform for K-12 students.
                Raised ₹5 crore in Series A funding and currently serving
                100,000+ students across India.
              </p>
              <div className="flex gap-4 text-sm">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                  Funded
                </span>
                <span className="text-gray-600">Year: 2023</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  AS
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900">
                    AgriSense
                  </h3>
                  <p className="text-sm text-gray-600">Founded by Amit Kumar & Sneha Patel</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                IoT-based crop monitoring and precision agriculture system.
                Winner of National Startup Award 2024 and currently deployed on
                5,000+ acres of farmland.
              </p>
              <div className="flex gap-4 text-sm">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">
                  Award Winner
                </span>
                <span className="text-gray-600">Year: 2024</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  HC
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-900">
                    HealthConnect
                  </h3>
                  <p className="text-sm text-gray-600">Founded by Neha Sharma & Vikram Reddy</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Telemedicine platform connecting rural patients with doctors.
                Received angel investment of ₹2 crore and serving 50+ villages
                with quality healthcare access.
              </p>
              <div className="flex gap-4 text-sm">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                  Angel Funded
                </span>
                <span className="text-gray-600">Year: 2023</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  GE
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-900">
                    GreenEnergy Tech
                  </h3>
                  <p className="text-sm text-gray-600">Founded by Karan Mehta & Anjali Gupta</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Smart energy management system for residential buildings.
                Deployed in 200+ apartments, reducing energy consumption by 35%
                and saving residents over ₹50 lakhs annually.
              </p>
              <div className="flex gap-4 text-sm">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                  Market Ready
                </span>
                <span className="text-gray-600">Year: 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mentorship */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Expert Mentorship Network
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Access to industry veterans, successful entrepreneurs, and domain
            experts who guide startups through challenges and opportunities.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center text-blue-900 font-bold text-2xl">
                50+
              </div>
              <div className="font-semibold text-gray-800">Industry Mentors</div>
            </div>
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center text-green-900 font-bold text-2xl">
                25+
              </div>
              <div className="font-semibold text-gray-800">Angel Investors</div>
            </div>
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center text-purple-900 font-bold text-2xl">
                100+
              </div>
              <div className="font-semibold text-gray-800">Mentoring Sessions/Year</div>
            </div>
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-yellow-100 rounded-full mx-auto mb-3 flex items-center justify-center text-yellow-900 font-bold text-2xl">
                15+
              </div>
              <div className="font-semibold text-gray-800">Workshops/Month</div>
            </div>
          </div>
        </div>

        {/* Events & Activities */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Events & Activities
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl">🎯</div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Startup Pitch Competition
                </h3>
                <p className="text-gray-700">
                  Annual event where students pitch their business ideas to a
                  panel of investors and industry experts. Winners receive seed
                  funding and incubation support.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <div className="text-3xl">💼</div>
              <div>
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  Entrepreneur Meetups
                </h3>
                <p className="text-gray-700">
                  Monthly networking sessions bringing together student
                  entrepreneurs, alumni founders, and industry professionals to
                  share experiences and build connections.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl">🚀</div>
              <div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  Innovation Hackathons
                </h3>
                <p className="text-gray-700">
                  48-hour intensive coding and prototyping events focused on
                  solving real-world problems. Sponsored by leading tech
                  companies with exciting prizes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl">📚</div>
              <div>
                <h3 className="text-xl font-bold text-yellow-900 mb-2">
                  Startup Bootcamps
                </h3>
                <p className="text-gray-700">
                  Intensive 2-week programs covering business model canvas,
                  financial planning, marketing strategies, and legal
                  frameworks for aspiring entrepreneurs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-xl shadow-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join BBIT's Innovation & Entrepreneurship ecosystem and turn your
            ideas into reality
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg shadow-xl hover:bg-yellow-300 transition transform hover:scale-105 cursor-pointer">
                Apply for Incubation
              </span>
            </Link>
            <Link href="/contact-us">
              <span className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition transform hover:scale-105 cursor-pointer">
                Contact Us
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
