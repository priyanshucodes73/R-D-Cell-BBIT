import Footer from "../../components/Footer";
import Chatbot from "../../components/Chatbot";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaInfoCircle } from "react-icons/fa";

// Page content mapping
const pageContent = {
  "admission-office": {
    title: "BBIT Admission Office",
    subtitle: "Centralized admission support and guidance",
    gradient: "from-blue-600 to-indigo-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Office Hours</h2>
        <p className="mb-4">Monday - Friday: 9:00 AM - 5:00 PM</p>
        <p className="mb-4">Saturday: 9:00 AM - 1:00 PM</p>
        <p className="mb-8">Sunday & Holidays: Closed</p>
        <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
        <p className="mb-2">
          <strong>Email:</strong> admissions@bbitmail.in
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> 8420123333 / 9836888444
        </p>
        <p className="mb-2">
          <strong>Toll Free:</strong> 1800 1212 88800
        </p>
      </>
    ),
  },
  "student-feedback": {
    title: "Student Feedback System",
    subtitle: "Your voice matters - Help us improve",
    gradient: "from-green-600 to-teal-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Submit Your Feedback</h2>
        <p className="mb-6">
          We value your opinions and suggestions. Share your feedback on:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Teaching quality and methods</li>
          <li>Infrastructure and facilities</li>
          <li>Administrative services</li>
          <li>Campus life and activities</li>
          <li>Library and laboratory resources</li>
        </ul>
        <Link href="/register">
          <span className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition cursor-pointer">
            Submit Feedback Form
          </span>
        </Link>
      </>
    ),
  },
  esanad: {
    title: "eSanad - Digital Certificate System",
    subtitle: "Get your certificates online",
    gradient: "from-purple-600 to-pink-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">About eSanad</h2>
        <p className="mb-6">
          eSanad is BBIT's digital certificate management system that provides
          authentic, tamper-proof digital certificates to students and alumni.
        </p>
        <h3 className="text-2xl font-bold mb-4">Available Certificates:</h3>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Degree Certificates</li>
          <li>Provisional Certificates</li>
          <li>Mark Sheets</li>
          <li>Transfer Certificates</li>
          <li>Character Certificates</li>
          <li>Bonafide Certificates</li>
        </ul>
      </>
    ),
  },
  guinness: {
    title: "Guinness World Records at BBIT",
    subtitle: "Our achievements in the record books",
    gradient: "from-yellow-500 to-orange-500",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Our World Records</h2>
        <div className="space-y-6">
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">
              Largest Technical Symposium
            </h3>
            <p>
              BBIT organized the world's largest technical symposium with
              15,000+ participants in 2023
            </p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">
              Most Students in Online Class
            </h3>
            <p>
              Record-breaking 50,000 students attended a single online lecture
              session in 2024
            </p>
          </div>
        </div>
      </>
    ),
  },
  iqac: {
    title: "Internal Quality Assurance Cell (IQAC)",
    subtitle: "Ensuring quality education and continuous improvement",
    gradient: "from-indigo-600 to-blue-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">About IQAC</h2>
        <p className="mb-6">
          The Internal Quality Assurance Cell (IQAC) is constituted as a
          post-accreditation quality sustenance measure. It works towards
          quality enhancement and sustenance through a conscious, consistent and
          catalytic action.
        </p>
        <h3 className="text-2xl font-bold mb-4">Functions:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Development and application of quality benchmarks</li>
          <li>Dissemination of information on quality</li>
          <li>Organization of workshops and seminars on quality</li>
          <li>Documentation of activities leading to quality improvement</li>
          <li>Preparation of Annual Quality Assurance Report (AQAR)</li>
        </ul>
      </>
    ),
  },
  organogram: {
    title: "Organizational Structure",
    subtitle: "BBIT's administrative hierarchy",
    gradient: "from-gray-700 to-gray-900",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Administrative Structure</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <strong>Chancellor</strong> - Head of Institution
          </div>
          <div className="bg-blue-100 p-4 rounded-lg ml-4">
            <strong>Vice Chancellor</strong> - Academic Head
          </div>
          <div className="bg-blue-100 p-4 rounded-lg ml-8">
            <strong>Registrar</strong> - Administrative Officer
          </div>
          <div className="bg-blue-100 p-4 rounded-lg ml-8">
            <strong>Deans</strong> - Faculty Heads
          </div>
          <div className="bg-blue-100 p-4 rounded-lg ml-12">
            <strong>Department Heads</strong> - Program Coordinators
          </div>
        </div>
      </>
    ),
  },
  committees: {
    title: "Other Committees",
    subtitle: "Various academic and administrative committees",
    gradient: "from-teal-600 to-cyan-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Active Committees</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Academic Council",
            "Board of Studies",
            "Research Committee",
            "Examination Committee",
            "Library Committee",
            "Sports Committee",
            "Cultural Committee",
            "Grievance Redressal Committee",
            "Anti-Ragging Committee",
            "Women's Cell",
            "Alumni Committee",
            "Placement Committee",
          ].map((committee, i) => (
            <div key={i} className="bg-teal-50 p-4 rounded-lg">
              <p className="font-semibold">✓ {committee}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  "pay-fee": {
    title: "Pay Fee Online",
    subtitle: "Secure online payment portal",
    gradient: "from-green-600 to-emerald-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Online Fee Payment</h2>
        <p className="mb-6">
          Pay your tuition fees, hostel fees, and other charges securely online.
        </p>
        <h3 className="text-2xl font-bold mb-4">Payment Methods:</h3>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Credit/Debit Cards (Visa, MasterCard, RuPay)</li>
          <li>Net Banking (All major banks)</li>
          <li>UPI (Google Pay, PhonePe, Paytm)</li>
          <li>Digital Wallets</li>
        </ul>
        <div className="bg-green-50 p-6 rounded-lg">
          <p className="font-bold mb-2">Payment Gateway:</p>
          <p>Secured by 256-bit SSL encryption</p>
        </div>
      </>
    ),
  },
  institutes: {
    title: "BBIT Institutes",
    subtitle: "Specialized institutes under BBIT umbrella",
    gradient: "from-purple-600 to-indigo-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Our Institutes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Institute of Engineering & Technology",
            "Institute of Management Studies",
            "Institute of Computer Applications",
            "Institute of Science & Humanities",
            "Institute of Research & Development",
            "Institute of Continuing Education",
          ].map((inst, i) => (
            <div
              key={i}
              className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600"
            >
              <h3 className="font-bold text-lg">{inst}</h3>
            </div>
          ))}
        </div>
      </>
    ),
  },
  "teaching-practices": {
    title: "Teaching Practices",
    subtitle: "Modern pedagogical methods at BBIT",
    gradient: "from-blue-600 to-cyan-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Our Teaching Methodology</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">Blended Learning</h3>
            <p>
              Combination of traditional classroom teaching and online learning
            </p>
          </div>
          <div className="bg-cyan-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">Project-Based Learning</h3>
            <p>Hands-on projects and real-world problem solving</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">Industry Integration</h3>
            <p>Guest lectures, workshops, and industry visits</p>
          </div>
        </div>
      </>
    ),
  },
  evaluation: {
    title: "System of Evaluation",
    subtitle: "Fair and transparent assessment system",
    gradient: "from-red-600 to-pink-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Evaluation Components</h2>
        <div className="space-y-4">
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">
              Continuous Assessment (40%)
            </h3>
            <ul className="list-disc pl-6">
              <li>Mid-term Examinations (20%)</li>
              <li>Assignments & Quizzes (10%)</li>
              <li>Attendance & Class Participation (10%)</li>
            </ul>
          </div>
          <div className="bg-pink-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">
              End-Semester Examination (60%)
            </h3>
            <p>Comprehensive examination covering entire syllabus</p>
          </div>
        </div>
        <div className="mt-6 bg-yellow-50 p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-2">Grading System</h3>
          <p>10-point CGPA scale with letter grades (A+, A, B+, B, C, D, F)</p>
        </div>
      </>
    ),
  },
  "bbit-edge": {
    title: "BBIT Edge",
    subtitle: "Our competitive advantage in education",
    gradient: "from-orange-600 to-red-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">What Makes BBIT Special</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Industry Partnerships", desc: "300+ corporate tie-ups" },
            { title: "Global Exposure", desc: "International collaborations" },
            {
              title: "State-of-Art Infrastructure",
              desc: "Modern labs and facilities",
            },
            { title: "Expert Faculty", desc: "PhDs and industry veterans" },
            { title: "Research Culture", desc: "Active R&D initiatives" },
            { title: "Placement Support", desc: "95% placement record" },
          ].map((edge, i) => (
            <div
              key={i}
              className="bg-orange-50 p-6 rounded-lg border-t-4 border-orange-600"
            >
              <h3 className="font-bold text-xl mb-2">{edge.title}</h3>
              <p className="text-gray-700">{edge.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
};

export default function GenericPage() {
  const router = useRouter();
  const { slug } = router.query;

  const page = slug ? pageContent[slug] : null;

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h1>
          <Link href="/">
            <span className="text-blue-600 hover:underline cursor-pointer">
              Go back to Home
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className={`bg-gradient-to-r ${page.gradient} text-white py-20`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link
              href="/"
              className="text-yellow-300 hover:underline flex items-center gap-2 inline-flex"
            >
              <FaHome /> Home
            </Link>
          </div>
          <h1 className="text-5xl font-bold mb-4">{page.title}</h1>
          <p className="text-xl opacity-90">{page.subtitle}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
          {page.content}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Need More Information?</h2>
          <p className="text-lg mb-8 opacity-90">
            Contact us for detailed information
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact-us">
              <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition cursor-pointer">
                Contact Us
              </span>
            </Link>
            <Link href="/register">
              <span className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                Apply Now
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
