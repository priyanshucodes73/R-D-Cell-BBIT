import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";
import useSWR from "swr";
import {
  defaultPublicSettings,
  fetcher,
  getApiBase,
  normalizeSiteSettings,
} from "../lib/siteSettings";

const defaultPartnerships = [
  { country: "🇺🇸 USA", universities: 12, programs: "Student Exchange, Joint Research" },
  { country: "🇬🇧 UK", universities: 8, programs: "Dual Degree, Research Collaboration" },
  { country: "🇨🇦 Canada", universities: 6, programs: "Study Abroad, Internships" },
  { country: "🇦🇺 Australia", universities: 5, programs: "Exchange Programs, Research" },
  { country: "🇩🇪 Germany", universities: 7, programs: "Engineering Exchange, Research" },
  { country: "🇫🇷 France", universities: 4, programs: "Management Programs, Culture Exchange" },
  { country: "🇯🇵 Japan", universities: 5, programs: "Technology Exchange, Research" },
  { country: "🇸🇬 Singapore", universities: 3, programs: "MBA Exchange, Innovation Programs" },
];

const defaultInternationalPrograms = [
  {
    icon: "🎓",
    title: "Student Exchange Programs",
    desc: "Spend a semester or year at our partner universities worldwide",
    features: ["1-2 Semesters Abroad", "Credit Transfer", "Scholarship Opportunities", "Cultural Immersion"],
  },
  {
    icon: "🏆",
    title: "Dual Degree Programs",
    desc: "Earn degrees from BBIT and a partner university simultaneously",
    features: ["2 Degrees in 4-5 Years", "International Exposure", "Enhanced Career Prospects", "Global Network"],
  },
  {
    icon: "🔬",
    title: "Research Collaboration",
    desc: "Work with international faculty on cutting-edge research projects",
    features: ["Joint Publications", "International Conferences", "Research Grants", "Global Recognition"],
  },
  {
    icon: "💼",
    title: "International Internships",
    desc: "Gain work experience at leading companies worldwide",
    features: ["Fortune 500 Companies", "Paid Internships", "3-6 Months Duration", "Career Placement Support"],
  },
  {
    icon: "🌏",
    title: "Study Tours",
    desc: "Short-term academic and cultural immersion programs",
    features: ["1-4 Weeks Duration", "Industry Visits", "Cultural Activities", "Faculty-Led Programs"],
  },
  {
    icon: "🎤",
    title: "Global Conferences",
    desc: "Present your research at international conferences",
    features: ["Travel Grants", "Networking Opportunities", "Publication Support", "Mentorship"],
  },
];

const defaultApplicationSteps = [
  { step: "1", title: "Check Eligibility", desc: "Review program requirements and eligibility criteria" },
  { step: "2", title: "Submit Application", desc: "Complete online application with required documents" },
  { step: "3", title: "Interview", desc: "Attend selection interview with international office" },
  { step: "4", title: "Confirmation", desc: "Receive acceptance and begin visa process" },
];

const defaultTestimonials = [
  {
    name: "Priya Sharma",
    program: "Exchange Program - MIT, USA",
    quote: "The exchange program opened doors to incredible research opportunities and global networking.",
  },
  {
    name: "Rahul Verma",
    program: "Dual Degree - University of Toronto",
    quote: "Earning two degrees from top institutions has significantly accelerated my career growth.",
  },
  {
    name: "Anjali Patel",
    program: "Internship - Google, Singapore",
    quote: "The international internship helped me gain real-world experience at a leading tech company.",
  },
];

export default function International() {
  const apiBase = getApiBase();
  const { data: siteSettingsData } = useSWR(apiBase ? `${apiBase}/api/site-settings` : null, fetcher);
  const siteSettings = { ...defaultPublicSettings, ...normalizeSiteSettings(siteSettingsData) };
  const pageSettings = siteSettings.internationalPage || {};
  const partnerships = pageSettings.partnerships || defaultPartnerships;
  const internationalPrograms = pageSettings.programs || defaultInternationalPrograms;
  const applicationSteps = pageSettings.applicationSteps || defaultApplicationSteps;
  const testimonials = pageSettings.testimonials || defaultTestimonials;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>International</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            {pageSettings.heroTitle || "Global Partnerships & International Programs"}
          </h1>
          <p className="text-xl opacity-90">
            {pageSettings.heroSubtitle || "Connecting BBIT students with world-class institutions worldwide"}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-900 mb-2">50+</div>
              <div className="text-gray-600">Partner Universities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-900 mb-2">25+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-900 mb-2">
                500+
              </div>
              <div className="text-gray-600">Exchange Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-900 mb-2">
                100+
              </div>
              <div className="text-gray-600">Joint Research Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-indigo-900 text-center mb-12">
          International Programs
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {internationalPrograms.map((program, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition"
            >
              <div className="text-6xl mb-4 text-center">{program.icon}</div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-3 text-center">
                {program.title}
              </h3>
              <p className="text-gray-700 mb-6 text-center">{program.desc}</p>
              <ul className="space-y-2">
                {program.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="text-green-600">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-6 bg-indigo-900 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Partner Universities */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-indigo-900 text-center mb-12">
            Our Global Partners
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {partnerships.map((partner, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition"
              >
                <div className="text-4xl mb-3">{partner.country}</div>
                <div className="text-2xl font-bold text-indigo-900 mb-2">
                  {partner.universities}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  Partner Universities
                </div>
                <div className="text-xs text-gray-500">{partner.programs}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-indigo-900 text-center mb-12">
          How to Apply
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {applicationSteps.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-indigo-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-indigo-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
              {idx < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-indigo-300 text-3xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-indigo-900 text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-indigo-800 transition transform hover:scale-105">
            Apply Now
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Student Experiences
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              >
                <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm opacity-75">{testimonial.program}</div>
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
