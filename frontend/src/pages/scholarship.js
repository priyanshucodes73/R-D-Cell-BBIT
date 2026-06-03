import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import {
  defaultPublicSettings,
  fetcher,
  getApiBase,
  normalizeSiteSettings,
} from "../lib/siteSettings";
import {
  FaGraduationCap,
  FaRupeeSign,
  FaAward,
  FaTrophy,
  FaHandHoldingUsd,
} from "react-icons/fa";

const defaultScholarshipStats = [
  { value: "₹50 Cr+", label: "Total Scholarships Awarded", border: "purple", text: "purple" },
  { value: "5,000+", label: "Students Benefited", border: "blue", text: "blue" },
  { value: "15+", label: "Scholarship Programs", border: "green", text: "green" },
  { value: "100%", label: "Tuition Fee Waivers Available", border: "orange", text: "orange" },
];

const defaultMeritScholarships = [
  { name: "BBIT Excellence Scholarship", icon: <FaTrophy />, amount: "100% Tuition Fee Waiver", color: "yellow", criteria: ["JEE Main rank under 5,000", "WBJEE rank under 1,000", "98%+ in 12th Board Exams", "For entire duration of the program"] },
  { name: "BBIT Merit Scholarship", icon: <FaAward />, amount: "50% Tuition Fee Waiver", color: "blue", criteria: ["JEE Main rank 5,000-15,000", "WBJEE rank 1,000-3,000", "95%+ in 12th Board Exams", "Renewable annually based on CGPA"] },
  { name: "Academic Achievement Award", icon: <FaGraduationCap />, amount: "₹50,000 per year", color: "green", criteria: ["JEE Main rank 15,000-30,000", "WBJEE rank 3,000-5,000", "90%+ in 12th Board Exams", "Maintain 8.5+ CGPA"] },
  { name: "Toppers Scholarship", icon: <FaTrophy />, amount: "₹25,000 per year", color: "purple", criteria: ["Board exam district/state topper", "85%+ in 12th Board Exams", "Valid entrance exam score", "Merit-based continuation"] },
];

const defaultNeedAid = [
  { name: "Financial Assistance Scheme", amount: "Up to 75% Fee Waiver", criteria: "Annual family income < ₹5 lakhs" },
  { name: "EWS Scholarship", amount: "Up to 50% Fee Waiver", criteria: "Economically Weaker Section certificate holders" },
  { name: "Single Parent Support", amount: "Up to 40% Fee Waiver", criteria: "For students from single-parent families" },
];

const defaultGovernmentScholarships = [
  { name: "National Scholarship Portal (NSP)", amount: "Variable", category: "SC/ST/OBC/Minority" },
  { name: "Post-Matric Scholarship", amount: "₹10,000-15,000/year", category: "SC/ST Students" },
  { name: "OBC Scholarship", amount: "₹3,000-5,000/year", category: "OBC Students" },
  { name: "Minority Scholarship", amount: "₹5,000-12,000/year", category: "Minority Communities" },
  { name: "Girl Child Scholarship", amount: "₹2,000-8,000/year", category: "Female Students" },
  { name: "PWD Scholarship", amount: "₹10,000-20,000/year", category: "Persons with Disabilities" },
];

const defaultSpecialScholarships = [
  {
    title: "Sports Excellence Scholarship",
    amount: "₹30,000 - ₹100,000/year",
    items: ["National level sports participation", "State level championship winners", "University sports team members", "Olympic/Asian Games participants"],
  },
  {
    title: "Cultural Talent Scholarship",
    amount: "₹15,000 - ₹50,000/year",
    items: ["National level cultural competitions", "State level awards in arts/music", "Theatre and performing arts excellence", "Literary achievements and publications"],
  },
];

const defaultApplicationSteps = [
  { step: "1", title: "Apply for Admission", desc: "Complete your BBIT admission application process first" },
  { step: "2", title: "Fill Scholarship Form", desc: "Submit scholarship application form with required documents" },
  { step: "3", title: "Verification & Award", desc: "Documents verified and scholarship awarded within 15 days" },
];

const defaultRequiredDocuments = [
  "Scholarship application form",
  "Income certificate (for need-based)",
  "Caste certificate (if applicable)",
  "10th & 12th mark sheets",
  "Entrance exam scorecard",
  "Aadhar card copy",
  "Bank account details",
  "Passport size photographs",
  "Sports/Cultural certificates (if applicable)",
  "EWS certificate (if applicable)",
  "Disability certificate (if applicable)",
  "Parent's income proof",
];

export default function Scholarship({ fallback }) {
  const apiBase = getApiBase();
  const { data: siteSettingsData } = useSWR(apiBase ? `${apiBase}/api/site-settings` : null, fetcher);
  const siteSettings = { ...defaultPublicSettings, ...normalizeSiteSettings(siteSettingsData) };
  const pageSettings = siteSettings.scholarshipPage || {};
  const pageContentHtml = pageSettings.pageContentHtml || "";
  const scholarshipStats = pageSettings.stats || defaultScholarshipStats;
  const meritScholarships = pageSettings.meritScholarships || defaultMeritScholarships;
  const needAid = pageSettings.needBasedAid || defaultNeedAid;
  const governmentScholarships = pageSettings.governmentScholarships || defaultGovernmentScholarships;
  const specialScholarships = pageSettings.specialScholarships || defaultSpecialScholarships;
  const applicationSteps = pageSettings.applicationSteps || defaultApplicationSteps;
  const requiredDocuments = pageSettings.requiredDocuments || defaultRequiredDocuments;

  if (pageContentHtml) {
    return (
      <SWRConfig value={{ fallback }}>
        <div className="min-h-screen bg-gray-50">
          <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-20">
            <div className="max-w-6xl mx-auto px-4">
              <h1 className="text-5xl font-bold mb-4">{pageSettings.heroTitle || "Scholarships"}</h1>
              <p className="text-xl opacity-90">{pageSettings.heroSubtitle || "Financial aid and scholarships"}</p>
            </div>
          </section>
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: pageContentHtml }} />
            </div>
          </section>
          <Footer />
          <Chatbot />
        </div>
      </SWRConfig>
    );
  }

  return (
    <SWRConfig value={{ fallback }}>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-300 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/admissions"
              className="text-yellow-300 hover:underline"
            >
              Admissions
            </Link>
            <span className="mx-2">/</span>
            <span>Scholarships</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            {pageSettings.heroTitle || "BBIT Scholarships 2025"}
          </h1>
          <p className="text-xl opacity-90">
            {pageSettings.heroSubtitle || "Financial assistance for meritorious and deserving students"}
          </p>
        </div>
      </section>

      {/* Scholarship Stats */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid md:grid-cols-4 gap-6">
          {scholarshipStats.map((stat, index) => (
            <div key={index} className={`bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-${stat.border}-600`}>
              <div className={`text-4xl font-bold text-${stat.text}-600 mb-2`}>{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Merit-Based Scholarships */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Merit-Based Scholarships
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {meritScholarships.map((scholarship, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-${scholarship.color}-500 hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`bg-gradient-to-r from-${scholarship.color}-500 to-${scholarship.color}-600 p-6 text-white`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{scholarship.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{scholarship.name}</h3>
                    <p className="text-3xl font-bold mt-2">
                      {scholarship.amount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-3 text-gray-800">
                  Eligibility Criteria:
                </h4>
                <ul className="space-y-2">
                  {scholarship.criteria.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Need-Based Scholarships */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Need-Based Financial Aid
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {needAid.map((aid, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <FaHandHoldingUsd className="text-5xl text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{aid.name}</h3>
                <p className="text-2xl font-bold text-yellow-400 mb-4">
                  {aid.amount}
                </p>
                <p className="text-sm opacity-90">{aid.criteria}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Scholarships */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Government Scholarships
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {governmentScholarships.map((scheme, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-600"
            >
              <h3 className="font-bold text-lg mb-2 text-blue-900">
                {scheme.name}
              </h3>
              <div className="mb-3">
                <span className="text-2xl font-bold text-green-600">
                  {scheme.amount}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">For:</span> {scheme.category}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sports & Cultural Scholarships */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Sports & Cultural Scholarships
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {specialScholarships.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-3xl font-bold text-yellow-300 mb-4">{item.amount}</p>
                <ul className="space-y-2">
                  {item.items.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>• {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          How to Apply for Scholarships
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {applicationSteps.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Required Documents */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            Required Documents
          </h2>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                {requiredDocuments.slice(0, 6).map((doc, index) => <li key={index} className="flex items-center gap-2">✓ {doc}</li>)}
              </ul>
              <ul className="space-y-3">
                {requiredDocuments.slice(6).map((doc, index) => <li key={index} className="flex items-center gap-2">✓ {doc}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">
            {pageSettings.ctaTitle || "Don't Let Finance Stop Your Dreams!"}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {pageSettings.ctaSubtitle || "Apply for scholarships and get financial support for your education"}
          </p>
          <Link href="/register">
            <span className="inline-block bg-yellow-400 text-purple-900 font-bold px-8 py-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              APPLY FOR SCHOLARSHIP NOW →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";
  try {
    const res = await fetch(`${apiBase}/api/site-settings`);
    const siteSettingsData = await (res.ok ? res.json() : null);
    const fallback = {};
    if (siteSettingsData) fallback[apiBase + "/api/site-settings"] = siteSettingsData;
    return { props: { fallback } };
  } catch (e) {
    return { props: { fallback: {} } };
  }
}
