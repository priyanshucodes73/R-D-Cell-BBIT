import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";
import {
  FaUniversity,
  FaHandshake,
  FaPercent,
  FaFileContract,
  FaRupeeSign,
  FaCheckCircle,
} from "react-icons/fa";

export default function EducationLoan() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white py-20">
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
            <span>Education Loan</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Education Loan Assistance</h1>
          <p className="text-xl opacity-90">
            Easy financing options to support your academic dreams at BBIT
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Partner Banks
        </h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {
              name: "State Bank of India",
              rate: "8.50%",
              amount: "Up to ₹40 lakhs",
            },
            { name: "HDFC Bank", rate: "9.00%", amount: "Up to ₹30 lakhs" },
            { name: "ICICI Bank", rate: "9.25%", amount: "Up to ₹35 lakhs" },
            { name: "Axis Bank", rate: "9.50%", amount: "Up to ₹25 lakhs" },
            {
              name: "Punjab National Bank",
              rate: "8.75%",
              amount: "Up to ₹30 lakhs",
            },
            {
              name: "Bank of Baroda",
              rate: "8.65%",
              amount: "Up to ₹30 lakhs",
            },
            { name: "Canara Bank", rate: "8.90%", amount: "Up to ₹20 lakhs" },
            { name: "Union Bank", rate: "9.00%", amount: "Up to ₹25 lakhs" },
          ].map((bank, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600"
            >
              <FaUniversity className="text-4xl text-blue-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">{bank.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-bold text-green-600">{bank.rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-bold">{bank.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Loan Features & Benefits
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaPercent />,
                title: "Competitive Rates",
                desc: "Starting from 8.50% per annum",
              },
              {
                icon: <FaRupeeSign />,
                title: "100% Finance",
                desc: "No margin for loans up to ₹7.5 lakhs",
              },
              {
                icon: <FaFileContract />,
                title: "Quick Processing",
                desc: "Loan approval within 7-10 days",
              },
              {
                icon: <FaHandshake />,
                title: "No Collateral",
                desc: "For loans up to ₹7.5 lakhs",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-5xl text-yellow-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-sm opacity-90">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Eligibility Criteria
        </h2>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <ul className="space-y-3 text-lg">
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 text-xl" />
              <span>Indian citizen with confirmed admission to BBIT</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 text-xl" />
              <span>Co-applicant with stable income required</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 text-xl" />
              <span>Age between 18-35 years</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 text-xl" />
              <span>Good academic record</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">
            Need Help with Education Loan?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact our finance assistance team
          </p>
          <Link href="/register">
            <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 cursor-pointer shadow-lg">
              APPLY FOR LOAN ASSISTANCE →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
