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
  FaUserPlus,
  FaEdit,
  FaUpload,
  FaMoneyCheckAlt,
  FaCheckCircle,
  FaDownload,
} from "react-icons/fa";

const defaultProcessSteps = [
  {
    step: 1,
    icon: <FaUserPlus />,
    title: "Step 1: Register Online",
    color: "blue",
    details: [
      "Visit the BBIT admissions portal at www.bbit.edu.in",
      "Click on 'New Registration' button",
      "Enter your basic details: Name, Email, Mobile Number",
      "Create a strong password for your account",
      "Verify your email and mobile number via OTP",
      "Your Login credentials will be sent to your registered email",
    ],
  },
  {
    step: 2,
    icon: <FaEdit />,
    title: "Step 2: Fill Application Form",
    color: "green",
    details: [
      "Login using your credentials",
      "Fill personal details: Date of Birth, Gender, Category",
      "Enter academic information: 10th, 12th marks and subjects",
      "Provide parent/guardian information",
      "Select your preferred program and specialization",
      "Enter entrance exam details (JEE/WBJEE/GATE score)",
      "Fill contact details and permanent address",
    ],
  },
  {
    step: 3,
    icon: <FaUpload />,
    title: "Step 3: Upload Documents",
    color: "purple",
    details: [
      "Recent passport-size photograph (JPG, max 200KB)",
      "Scanned signature (JPG, max 100KB)",
      "10th mark sheet and certificate (PDF, max 500KB)",
      "12th mark sheet and certificate (PDF, max 500KB)",
      "JEE/WBJEE/GATE scorecard (if applicable)",
      "Aadhar card (PDF, max 300KB)",
      "Category certificate (SC/ST/OBC, if applicable)",
      "Migration certificate (for students from other boards)",
    ],
  },
  {
    step: 4,
    icon: <FaMoneyCheckAlt />,
    title: "Step 4: Pay Application Fee",
    color: "orange",
    details: [
      "Application Fee: ₹1,000 for General/OBC candidates",
      "Application Fee: ₹500 for SC/ST/PWD candidates",
      "Payment methods: Credit Card, Debit Card, Net Banking, UPI",
      "Keep the transaction ID for future reference",
      "Download the payment receipt",
      "Fee once paid is non-refundable",
    ],
  },
  {
    step: 5,
    icon: <FaCheckCircle />,
    title: "Step 5: Submit & Download",
    color: "teal",
    details: [
      "Review all entered information carefully",
      "Check for any errors or missing information",
      "Click on 'Final Submit' button",
      "Download the application form",
      "Take a printout for your records",
      "Note down your application number",
      "You will receive confirmation email with application details",
    ],
  },
];

const defaultDocuments = [
  "Recent Passport Size Photograph",
  "Scanned Signature",
  "10th Mark Sheet & Certificate",
  "12th Mark Sheet & Certificate",
  "Transfer Certificate",
  "Migration Certificate",
  "JEE Main/WBJEE Scorecard",
  "Aadhar Card",
  "Category Certificate (if applicable)",
  "Income Certificate (for scholarship)",
  "Domicile Certificate",
  "Character Certificate",
];

const defaultNotes = [
  "Ensure all information entered is correct. No changes will be allowed after final submission.",
  "Upload clear and legible scanned copies of documents in the specified format.",
  "Application fee is non-refundable under any circumstances.",
  "Keep your login credentials safe for future reference.",
  "Incomplete applications will be automatically rejected.",
  "Candidates must regularly check their email and admission portal for updates.",
];

export default function HowToApply({ fallback }) {
  const apiBase = getApiBase();
  const { data: siteSettingsData } = useSWR(
    apiBase ? `${apiBase}/api/site-settings` : null,
    fetcher
  );
  const siteSettings = {
    ...defaultPublicSettings,
    ...normalizeSiteSettings(siteSettingsData),
  };
  const pageSettings = siteSettings.howToApplyPage || {};
  const pageContentHtml = pageSettings.pageContentHtml || "";
  const processSteps = pageSettings.processSteps || defaultProcessSteps;
  const documentChecklist = pageSettings.documents || defaultDocuments;
  const notes = pageSettings.notes || defaultNotes;

  if (pageContentHtml) {
    return (
      <SWRConfig value={{ fallback }}>
        <div className="min-h-screen bg-gray-50">
          <section className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white py-20">
            <div className="max-w-6xl mx-auto px-4">
              <h1 className="text-5xl font-bold mb-4">{pageSettings.heroTitle || "How To Apply"}</h1>
              <p className="text-xl opacity-90">{pageSettings.heroSubtitle || "Step-by-step application process"}</p>
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
      <section className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white py-20">
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
            <span>How to Apply</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            {pageSettings.heroTitle || "How to Apply"}
          </h1>
          <p className="text-xl opacity-90">
            {pageSettings.heroSubtitle ||
              "Complete step-by-step guide to apply for BBIT programs"}
          </p>
        </div>
      </section>

      {/* Application Process */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Application Process
        </h2>

        <div className="space-y-8">
          {processSteps.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-8 border-${item.color}-500`}
            >
              <div
                className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 p-6 text-white`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{item.icon}</div>
                  <div>
                    <div className="text-sm opacity-90">STEP {item.step}</div>
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {item.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Required Documents */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Required Documents Checklist
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentChecklist.map((doc, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />
                  <span className="font-medium">{doc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Important Notes
        </h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-8 rounded-lg">
          <ul className="space-y-3">
            {notes.map((note, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your application now and join BBIT family
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                START APPLICATION →
              </span>
            </Link>
            <Link href="/admissions">
              <span className="inline-block bg-white text-green-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                VIEW ADMISSION DETAILS
              </span>
            </Link>
          </div>
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
