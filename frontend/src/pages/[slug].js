import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import useSWR from "swr";
import {
  defaultPublicSettings,
  fetcher,
  getApiBase,
  normalizeSiteSettings,
} from "../lib/siteSettings";

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
  "qs-rankings": {
    title: "QS Asia Rankings 2024",
    subtitle: "BBIT's standing in QS Asia Rankings",
    gradient: "from-blue-700 to-indigo-700",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">QS Asia Rankings 2024</h2>
        <div className="bg-blue-50 p-8 rounded-lg mb-6">
          <h3 className="text-5xl font-bold text-blue-900 mb-2">Top 200</h3>
          <p className="text-xl">Among Asian Universities</p>
        </div>
        <h3 className="text-2xl font-bold mb-4">Key Performance Indicators:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Academic Reputation: 4.5/5",
            "Employer Reputation: 4.3/5",
            "Faculty Student Ratio: Excellent",
            "International Faculty: High",
            "Research Citations: Strong",
            "International Students: Growing",
          ].map((metric, i) => (
            <div key={i} className="bg-indigo-50 p-4 rounded-lg">
              <p className="font-semibold">✓ {metric}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  "nirf-rankings": {
    title: "NIRF Rankings 2025",
    subtitle: "National Institutional Ranking Framework",
    gradient: "from-orange-600 to-red-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">NIRF Rankings 2025</h2>
        <div className="space-y-6">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-4xl font-bold text-orange-900 mb-2">Rank 45</h3>
            <p className="text-lg">Overall Engineering Category</p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="text-4xl font-bold text-red-900 mb-2">Top 50</h3>
            <p className="text-lg">Among Private Engineering Institutions</p>
          </div>
        </div>
        <h3 className="text-2xl font-bold mt-8 mb-4">Assessment Parameters:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Teaching, Learning & Resources (100 marks)</li>
          <li>Research and Professional Practice (100 marks)</li>
          <li>Graduation Outcomes (100 marks)</li>
          <li>Outreach and Inclusivity (100 marks)</li>
          <li>Perception (100 marks)</li>
        </ul>
      </>
    ),
  },
  rti: {
    title: "Right to Information (RTI)",
    subtitle: "Transparency and information access",
    gradient: "from-green-700 to-teal-700",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">RTI Information</h2>
        <p className="mb-6">
          BBIT is committed to transparency and accountability under the Right
          to Information Act, 2005.
        </p>
        <h3 className="text-2xl font-bold mb-4">
          Public Information Officer (PIO)
        </h3>
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <p>
            <strong>Name:</strong> Dr. Amit Kumar Sharma
          </p>
          <p>
            <strong>Designation:</strong> Registrar
          </p>
          <p>
            <strong>Email:</strong> rti@bbitmail.in
          </p>
          <p>
            <strong>Phone:</strong> 8420123333
          </p>
        </div>
        <h3 className="text-2xl font-bold mb-4">How to File RTI:</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Download RTI application form</li>
          <li>Fill complete details with clear query</li>
          <li>Pay ₹10 as application fee (IPO/DD)</li>
          <li>Submit to PIO office or via registered post</li>
          <li>Response within 30 days as per RTI Act</li>
        </ol>
      </>
    ),
  },
  grievance: {
    title: "Grievance Redressal",
    subtitle: "Quick resolution of your concerns",
    gradient: "from-purple-700 to-pink-700",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Grievance Redressal System</h2>
        <p className="mb-6">
          BBIT has established a robust grievance redressal mechanism to address
          student and stakeholder concerns promptly.
        </p>
        <div className="bg-purple-50 p-6 rounded-lg mb-6">
          <h3 className="font-bold text-xl mb-4">File Your Grievance:</h3>
          <p className="mb-4">Email: grievance@bbitmail.in</p>
          <p className="mb-4">Phone: 9836888444</p>
          <p>Online Portal: Available 24/7</p>
        </div>
        <h3 className="text-2xl font-bold mb-4">Grievance Categories:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Academic matters</li>
          <li>Administrative issues</li>
          <li>Infrastructure concerns</li>
          <li>Examination related</li>
          <li>Hostel facilities</li>
          <li>Library services</li>
        </ul>
      </>
    ),
  },
  news: {
    title: "BBIT News & Updates",
    subtitle: "Latest happenings at BBIT",
    gradient: "from-blue-600 to-cyan-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Latest News</h2>
        <div className="space-y-6">
          {[
            {
              date: "Oct 10, 2025",
              title: "BBIT wins Best Engineering College Award 2025",
              desc: "Recognized for excellence in technical education and innovation",
            },
            {
              date: "Oct 5, 2025",
              title: "International Conference on AI & ML hosted",
              desc: "500+ researchers from 25 countries participated",
            },
            {
              date: "Sep 28, 2025",
              title: "95% Placement Record Achieved",
              desc: "Students placed in top companies with average package ₹12 LPA",
            },
            {
              date: "Sep 15, 2025",
              title: "New Research Center Inaugurated",
              desc: "State-of-art IoT and Robotics research facility launched",
            },
          ].map((news, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600"
            >
              <p className="text-sm text-gray-500 mb-2">{news.date}</p>
              <h3 className="font-bold text-xl mb-2">{news.title}</h3>
              <p className="text-gray-700">{news.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  blog: {
    title: "BBIT Blog",
    subtitle: "Insights, stories, and perspectives",
    gradient: "from-indigo-600 to-purple-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Recent Blog Posts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Future of Engineering Education",
              author: "Dr. Rajesh Kumar",
              category: "Education",
            },
            {
              title: "Industry 4.0 and Career Opportunities",
              author: "Prof. Priya Sharma",
              category: "Career",
            },
            {
              title: "Research Excellence at BBIT",
              author: "Dr. Amit Verma",
              category: "Research",
            },
            {
              title: "Student Success Stories",
              author: "Alumni Team",
              category: "Stories",
            },
          ].map((post, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                {post.category}
              </span>
              <h3 className="font-bold text-lg mt-3 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600">By {post.author}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  alumni: {
    title: "BBIT Alumni Network",
    subtitle: "Stay connected with your alma mater",
    gradient: "from-red-600 to-orange-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Join Our Alumni Network</h2>
        <div className="bg-red-50 p-8 rounded-lg mb-6">
          <h3 className="text-4xl font-bold text-red-900 mb-2">50,000+</h3>
          <p className="text-xl">Alumni Worldwide</p>
        </div>
        <h3 className="text-2xl font-bold mb-4">Benefits:</h3>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Lifetime email ID (@bbit.alumni)</li>
          <li>Access to campus facilities</li>
          <li>Career networking opportunities</li>
          <li>Exclusive alumni events</li>
          <li>Mentorship programs</li>
          <li>Continuing education discounts</li>
        </ul>
        <Link href="/register">
          <span className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition cursor-pointer">
            Register as Alumni
          </span>
        </Link>
      </>
    ),
  },
  maps: {
    title: "Campus Maps",
    subtitle: "Navigate our campuses easily",
    gradient: "from-teal-600 to-green-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Campus Locations</h2>
        <div className="space-y-6">
          <div className="bg-teal-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">
              Main Campus - Budge Budge
            </h3>
            <p>Nischintapur, Budge Budge, Kolkata-700137, West Bengal</p>
            <p className="mt-2 text-sm text-gray-600">
              Google Maps Coordinates: 22.4676° N, 88.1737° E
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">Unnao Campus</h3>
            <p>Unnao District, Uttar Pradesh</p>
            <p className="mt-2 text-sm text-gray-600">
              Satellite campus with modern facilities
            </p>
          </div>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-xl mb-4">How to Reach:</h3>
          <ul className="space-y-2">
            <li>
              <strong>By Metro:</strong> Nearest station - Majerhat (5 km)
            </li>
            <li>
              <strong>By Train:</strong> Budge Budge Railway Station (2 km)
            </li>
            <li>
              <strong>By Air:</strong> Kolkata Airport (25 km)
            </li>
            <li>
              <strong>By Bus:</strong> Regular buses from Esplanade & Howrah
            </li>
          </ul>
        </div>
      </>
    ),
  },
  "distance-calculator": {
    title: "Distance Calculator",
    subtitle: "Calculate distance to BBIT campuses",
    gradient: "from-cyan-600 to-blue-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Distance Calculator</h2>
        <div className="bg-cyan-50 p-8 rounded-lg mb-6">
          <p className="text-lg mb-4">
            Plan your travel to BBIT campus with our distance calculator.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-3">Major Cities:</h3>
              <ul className="space-y-2">
                <li>• From Howrah: 15 km</li>
                <li>• From Kolkata Center: 20 km</li>
                <li>• From Salt Lake: 25 km</li>
                <li>• From Dum Dum: 28 km</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Transportation Hubs:</h3>
              <ul className="space-y-2">
                <li>• Kolkata Airport: 25 km</li>
                <li>• Howrah Station: 15 km</li>
                <li>• Sealdah Station: 22 km</li>
                <li>• Esplanade: 18 km</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },
  "about-budge-budge": {
    title: "About Budge Budge",
    subtitle: "Know about our city",
    gradient: "from-green-700 to-teal-700",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">About Budge Budge</h2>
        <p className="mb-6">
          Budge Budge is a historical town in South 24 Parganas district of West
          Bengal, located on the banks of river Hooghly.
        </p>
        <h3 className="text-2xl font-bold mb-4">Key Features:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Well-connected by road and rail",
            "Rich cultural heritage",
            "Industrial hub of Kolkata",
            "Educational institutions",
            "Healthcare facilities",
            "Growing IT sector",
          ].map((feature, i) => (
            <div key={i} className="bg-green-50 p-4 rounded-lg">
              <p className="font-semibold">✓ {feature}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  "qs-world-rankings": {
    title: "QS World University Rankings",
    subtitle: "Global recognition and standing",
    gradient: "from-purple-700 to-indigo-700",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">
          QS World University Rankings
        </h2>
        <div className="bg-purple-50 p-8 rounded-lg mb-6">
          <h3 className="text-5xl font-bold text-purple-900 mb-2">Top 800</h3>
          <p className="text-xl">Among World Universities</p>
        </div>
        <h3 className="text-2xl font-bold mb-4">Subject-wise Rankings:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Computer Science & IT: Top 500",
            "Engineering & Technology: Top 600",
            "Business & Management: Top 700",
            "Natural Sciences: Top 750",
          ].map((ranking, i) => (
            <div key={i} className="bg-indigo-50 p-4 rounded-lg">
              <p className="font-semibold">{ranking}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  abet: {
    title: "ABET Accreditation",
    subtitle: "International quality recognition",
    gradient: "from-blue-800 to-cyan-800",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">ABET Accreditation</h2>
        <p className="mb-6">
          BBIT programs are ABET accredited, ensuring international quality
          standards in engineering education.
        </p>
        <h3 className="text-2xl font-bold mb-4">Accredited Programs:</h3>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>B.Tech Computer Science & Engineering</li>
          <li>B.Tech Electronics & Communication Engineering</li>
          <li>B.Tech Mechanical Engineering</li>
          <li>B.Tech Civil Engineering</li>
        </ul>
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-2">
            Benefits of ABET Accreditation:
          </h3>
          <ul className="space-y-1">
            <li>✓ Global recognition</li>
            <li>✓ Enhanced career opportunities</li>
            <li>✓ International mobility</li>
            <li>✓ Quality assurance</li>
          </ul>
        </div>
      </>
    ),
  },
  "qs-subject-rankings": {
    title: "QS World University Rankings by Subject 2025",
    subtitle: "Subject-specific global rankings",
    gradient: "from-orange-700 to-red-700",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Subject Rankings 2025</h2>
        <div className="space-y-4">
          {[
            { subject: "Computer Science", rank: "401-450", score: "72.5" },
            {
              subject: "Engineering - Electrical",
              rank: "451-500",
              score: "68.2",
            },
            {
              subject: "Engineering - Mechanical",
              rank: "501-550",
              score: "65.8",
            },
            {
              subject: "Business & Management",
              rank: "551-600",
              score: "62.4",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-600"
            >
              <h3 className="font-bold text-xl mb-2">{item.subject}</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  Global Rank: <strong>{item.rank}</strong>
                </span>
                <span className="text-gray-600">
                  Score: <strong>{item.score}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  hostels: {
    title: "BBIT Hostels",
    subtitle: "Comfortable accommodation for students",
    gradient: "from-blue-600 to-indigo-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Hostel Facilities</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-3">Boys Hostel</h3>
            <ul className="space-y-2">
              <li>✓ Capacity: 1,500 students</li>
              <li>✓ AC & Non-AC rooms</li>
              <li>✓ 24/7 Security</li>
              <li>✓ WiFi enabled</li>
            </ul>
          </div>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-3">Girls Hostel</h3>
            <ul className="space-y-2">
              <li>✓ Capacity: 1,000 students</li>
              <li>✓ AC & Non-AC rooms</li>
              <li>✓ 24/7 Security & Warden</li>
              <li>✓ WiFi enabled</li>
            </ul>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4">Common Facilities:</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            "Mess & Canteen",
            "Laundry Service",
            "Common Rooms",
            "Study Rooms",
            "Gym Facilities",
            "Medical Room",
            "Recreation Area",
            "Parking Area",
            "Prayer Room",
          ].map((facility, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow text-center">
              <p className="font-semibold">{facility}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  transport: {
    title: "BBIT Transport",
    subtitle: "Safe and convenient transportation",
    gradient: "from-green-600 to-teal-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Transport Facilities</h2>
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <p className="text-lg mb-4">
            BBIT provides safe and comfortable bus services connecting major
            areas of Kolkata and surrounding regions.
          </p>
        </div>
        <h3 className="text-2xl font-bold mb-4">Bus Routes Cover:</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[
            "Howrah & Surrounding",
            "Kolkata Central",
            "Salt Lake & New Town",
            "Behala & Thakurpukur",
            "Garden Reach",
            "Baranagar & Dunlop",
            "Barasat & Madhyamgram",
            "Jadavpur & Garia",
          ].map((route, i) => (
            <div key={i} className="bg-teal-50 p-4 rounded-lg">
              <p className="font-semibold">🚌 {route}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-xl mb-3">Features:</h3>
          <ul className="space-y-2">
            <li>✓ GPS tracked buses</li>
            <li>✓ Female conductors in ladies buses</li>
            <li>✓ First aid kits</li>
            <li>✓ Comfortable seating</li>
            <li>✓ Affordable fees</li>
          </ul>
        </div>
      </>
    ),
  },
  sports: {
    title: "BBIT Sports",
    subtitle: "Promoting fitness and sportsmanship",
    gradient: "from-orange-600 to-red-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Sports & Athletics</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-3">Outdoor Sports</h3>
            <ul className="space-y-2">
              <li>⚽ Football Ground</li>
              <li>🏏 Cricket Ground</li>
              <li>🏀 Basketball Court</li>
              <li>🏐 Volleyball Court</li>
              <li>🎾 Tennis Courts</li>
              <li>🏃 Athletics Track</li>
            </ul>
          </div>
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-3">Indoor Sports</h3>
            <ul className="space-y-2">
              <li>🏸 Badminton Courts</li>
              <li>🏓 Table Tennis</li>
              <li>♟️ Chess & Carrom</li>
              <li>🥊 Boxing Ring</li>
              <li>💪 Modern Gymnasium</li>
              <li>🧘 Yoga Center</li>
            </ul>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-xl mb-3">Achievements:</h3>
          <ul className="space-y-2">
            <li>✓ Inter-University Champions 2024</li>
            <li>✓ State Level Medals: 50+</li>
            <li>✓ National Participants: 25+</li>
          </ul>
        </div>
      </>
    ),
  },
  cultural: {
    title: "Cultural Activities",
    subtitle: "Celebrating diversity and talent",
    gradient: "from-purple-600 to-pink-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Cultural Programs</h2>
        <div className="space-y-6">
          {[
            {
              title: "Annual Cultural Fest",
              desc: "3-day mega event with 10,000+ participants",
            },
            {
              title: "Technical Fest",
              desc: "Innovation and technology showcase",
            },
            {
              title: "Freshers Welcome",
              desc: "Grand welcome for new students",
            },
            {
              title: "Farewell Ceremony",
              desc: "Memorable send-off for graduating students",
            },
            {
              title: "Independence Day & Republic Day",
              desc: "Patriotic celebrations",
            },
            {
              title: "Regional Festivals",
              desc: "Durga Puja, Diwali, Eid, Christmas celebrations",
            },
          ].map((event, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600"
            >
              <h3 className="font-bold text-xl mb-2">{event.title}</h3>
              <p className="text-gray-700">{event.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  "student-welfare": {
    title: "Student Welfare",
    subtitle: "Comprehensive support for holistic development",
    gradient: "from-teal-600 to-cyan-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Student Welfare Services</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Health Center",
              desc: "24/7 medical facility with qualified doctors",
            },
            {
              title: "Counseling Services",
              desc: "Professional counseling and mental health support",
            },
            {
              title: "Financial Aid",
              desc: "Scholarships and emergency financial assistance",
            },
            {
              title: "Career Guidance",
              desc: "Mentorship and career counseling",
            },
            { title: "Anti-Ragging Cell", desc: "Zero tolerance for ragging" },
            {
              title: "Women's Cell",
              desc: "Support and safety for female students",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-teal-50 p-6 rounded-lg border-t-4 border-teal-600"
            >
              <h3 className="font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-gray-700 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  "e-samadhan": {
    title: "e-Samadhan Portal",
    subtitle: "Online problem resolution system",
    gradient: "from-indigo-600 to-purple-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">e-Samadhan System</h2>
        <p className="mb-6">
          Our digital platform for quick resolution of student queries and
          complaints.
        </p>
        <div className="bg-indigo-50 p-8 rounded-lg mb-6">
          <h3 className="font-bold text-xl mb-4">How It Works:</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li>Login to e-Samadhan portal with your credentials</li>
            <li>Select category and describe your issue</li>
            <li>Submit with relevant documents (if any)</li>
            <li>Track status in real-time</li>
            <li>Receive resolution within 48 hours</li>
          </ol>
        </div>
        <h3 className="text-2xl font-bold mb-4">Categories Covered:</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            "Academic Issues",
            "Exam Related",
            "Fee Payment",
            "Hostel Problems",
            "Library Access",
            "Transport",
            "Infrastructure",
            "Certificate Requests",
            "Others",
          ].map((cat, i) => (
            <div key={i} className="bg-purple-50 p-3 rounded text-center">
              <p className="font-semibold">{cat}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  discipline: {
    title: "Discipline & Student Conduct",
    subtitle: "Guidelines for academic excellence and integrity",
    gradient: "from-red-700 to-orange-700",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Code of Conduct</h2>
        <p className="mb-6">
          BBIT maintains high standards of discipline and expects all students
          to follow the code of conduct.
        </p>
        <h3 className="text-2xl font-bold mb-4">Key Guidelines:</h3>
        <div className="space-y-3 mb-8">
          {[
            "Maintain 75% attendance in all courses",
            "Respect faculty, staff, and fellow students",
            "No ragging or bullying tolerated",
            "Prohibition of drugs, alcohol, and smoking on campus",
            "Proper dress code to be maintained",
            "Academic integrity and honesty",
            "Timely submission of assignments",
            "Responsible use of campus resources",
          ].map((rule, i) => (
            <div key={i} className="bg-red-50 p-4 rounded-lg">
              <p>
                <span className="font-bold text-red-700">{i + 1}.</span> {rule}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-2">Disciplinary Actions:</h3>
          <p>
            Violation of rules may lead to warning, fine, suspension, or
            expulsion depending on severity.
          </p>
        </div>
      </>
    ),
  },
  "fee-details": {
    title: "Courses Fee Details",
    subtitle: "Transparent fee structure",
    gradient: "from-blue-600 to-cyan-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Fee Structure 2025-26</h2>
        <div className="space-y-6">
          {[
            {
              program: "B.Tech (All Branches)",
              tuition: "₹1,25,000",
              hostel: "₹60,000",
              total: "₹1,85,000",
            },
            {
              program: "M.Tech",
              tuition: "₹1,50,000",
              hostel: "₹65,000",
              total: "₹2,15,000",
            },
            {
              program: "MBA",
              tuition: "₹2,00,000",
              hostel: "₹70,000",
              total: "₹2,70,000",
            },
            {
              program: "MCA",
              tuition: "₹1,30,000",
              hostel: "₹60,000",
              total: "₹1,90,000",
            },
          ].map((fee, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-4">{fee.program}</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Tuition Fee</p>
                  <p className="text-xl font-bold text-blue-900">
                    {fee.tuition}
                  </p>
                </div>
                <div className="bg-cyan-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Hostel Fee</p>
                  <p className="text-xl font-bold text-cyan-900">
                    {fee.hostel}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Total (Annual)</p>
                  <p className="text-xl font-bold text-green-900">
                    {fee.total}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
          <p className="font-semibold">
            Note: Fees are subject to revision. Additional charges for exam,
            library, and other services may apply.
          </p>
        </div>
      </>
    ),
  },
  "grievance-cell": {
    title: "Student Grievance Redressal Cell",
    subtitle: "Dedicated support for student concerns",
    gradient: "from-purple-600 to-pink-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Grievance Redressal Cell</h2>
        <div className="bg-purple-50 p-6 rounded-lg mb-6">
          <h3 className="font-bold text-xl mb-3">Committee Members:</h3>
          <ul className="space-y-2">
            <li>
              <strong>Chairperson:</strong> Prof. Dr. Anjali Verma
            </li>
            <li>
              <strong>Members:</strong> 5 Faculty Representatives
            </li>
            <li>
              <strong>Student Representatives:</strong> 3 Members
            </li>
          </ul>
        </div>
        <h3 className="text-2xl font-bold mb-4">Contact:</h3>
        <p className="mb-2">Email: grievance.cell@bbitmail.in</p>
        <p className="mb-2">Phone: 8420123333 (Ext: 245)</p>
        <p className="mb-6">Office: Administrative Block, Room 205</p>
        <h3 className="text-2xl font-bold mb-4">Process:</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Submit complaint online or offline</li>
          <li>Acknowledgment within 24 hours</li>
          <li>Inquiry and investigation</li>
          <li>Resolution within 15 working days</li>
          <li>Follow-up and feedback</li>
        </ol>
      </>
    ),
  },
  ombudsperson: {
    title: "Ombudsperson",
    subtitle: "Independent authority for dispute resolution",
    gradient: "from-gray-700 to-gray-900",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Office of the Ombudsperson</h2>
        <p className="mb-6">
          The Ombudsperson serves as an independent, impartial authority to
          address student grievances and disputes that remain unresolved through
          regular channels.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="font-bold text-xl mb-3">Current Ombudsperson:</h3>
          <p>
            <strong>Justice (Retd.) K.N. Mehta</strong>
          </p>
          <p className="text-sm text-gray-600">Former High Court Judge</p>
        </div>
        <h3 className="text-2xl font-bold mb-4">When to Approach:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>When grievance is not resolved by Grievance Cell</li>
          <li>Disputes with administration</li>
          <li>Academic misconduct allegations</li>
          <li>Disciplinary action appeals</li>
        </ul>
      </>
    ),
  },
  policies: {
    title: "Procedures And Policies",
    subtitle: "Institutional guidelines and regulations",
    gradient: "from-indigo-700 to-purple-700",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Institutional Policies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Admission Policy",
            "Examination Policy",
            "Attendance Policy",
            "Scholarship Policy",
            "Refund Policy",
            "Anti-Ragging Policy",
            "Sexual Harassment Policy",
            "Research Ethics Policy",
            "Intellectual Property Policy",
            "Data Privacy Policy",
          ].map((policy, i) => (
            <div key={i} className="bg-indigo-50 p-4 rounded-lg">
              <p className="font-semibold">📄 {policy}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <p className="font-semibold mb-2">
            Download Complete Policy Document:
          </p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
            Download PDF
          </button>
        </div>
      </>
    ),
  },
  "ppcb-report": {
    title: "PPCB Report",
    subtitle: "Pollution control compliance",
    gradient: "from-green-700 to-teal-700",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">PPCB Compliance Report</h2>
        <p className="mb-6">
          BBIT is committed to environmental sustainability and complies with
          all Pollution Control Board regulations.
        </p>
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <h3 className="font-bold text-xl mb-3">Key Initiatives:</h3>
          <ul className="space-y-2">
            <li>✓ Waste segregation and management</li>
            <li>✓ Water conservation and recycling</li>
            <li>✓ Solar power installation (500 KW)</li>
            <li>✓ Green campus initiative</li>
            <li>✓ E-waste management</li>
            <li>✓ Regular environmental audits</li>
          </ul>
        </div>
        <p className="text-sm text-gray-600">
          Last Audit: September 2025 | Status: Compliant | Next Audit: March
          2026
        </p>
      </>
    ),
  },
  "mandatory-disclosure": {
    title: "Mandatory Disclosure",
    subtitle: "Transparency and accountability",
    gradient: "from-blue-700 to-cyan-700",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">
          Mandatory Disclosure (AICTE)
        </h2>
        <p className="mb-6">
          As per AICTE norms, BBIT provides complete institutional information
          for public access.
        </p>
        <div className="space-y-4">
          {[
            "Name and Address of Institution",
            "Approval Details and Recognition",
            "Governance Structure",
            "Academic Calendar",
            "Faculty Details and Qualifications",
            "Fee Structure and Refund Policy",
            "Admission Process and Criteria",
            "Infrastructure and Learning Resources",
            "Examination and Evaluation System",
            "Placement and Career Services",
            "Student Welfare Activities",
            "Financial Information",
          ].map((item, i) => (
            <div key={i} className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold">
                {i + 1}. {item}
              </p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  disclaimer: {
    title: "Disclaimer",
    subtitle: "Terms and conditions",
    gradient: "from-gray-700 to-gray-900",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">Disclaimer</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            The information provided on the BBIT website is for general
            information purposes only. While we endeavor to keep the information
            up to date and correct, we make no representations or warranties of
            any kind, express or implied, about the completeness, accuracy,
            reliability, suitability, or availability.
          </p>

          <h3 className="font-bold text-xl text-black mt-6 mb-3">
            Website Content:
          </h3>
          <p>
            All content, including text, images, graphics, logos, and documents,
            is the property of BBIT and protected by copyright laws.
            Unauthorized use is prohibited.
          </p>

          <h3 className="font-bold text-xl text-black mt-6 mb-3">
            External Links:
          </h3>
          <p>
            Our website may contain links to external sites. BBIT has no control
            over the nature, content, and availability of those sites and is not
            responsible for their content.
          </p>

          <h3 className="font-bold text-xl text-black mt-6 mb-3">
            Limitation of Liability:
          </h3>
          <p>
            BBIT will not be liable for any loss or damage arising from the use
            of this website or reliance on information provided herein.
          </p>

          <p className="font-semibold mt-6">
            For clarifications, please contact: info@bbitmail.in
          </p>
        </div>
      </>
    ),
  },
  "ugc-disclosure": {
    title: "UGC - Public Self Disclosure",
    subtitle: "University Grants Commission compliance",
    gradient: "from-orange-600 to-red-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">UGC Public Disclosure</h2>
        <p className="mb-6">
          In compliance with UGC regulations, BBIT provides complete
          institutional information for transparency.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Basic Information",
              items: [
                "Institution Name",
                "Establishment Year",
                "Location",
                "Affiliations",
              ],
            },
            {
              title: "Academic Programs",
              items: [
                "Programs Offered",
                "Intake Capacity",
                "Accreditation Status",
                "Faculty Strength",
              ],
            },
            {
              title: "Infrastructure",
              items: [
                "Campus Area",
                "Buildings",
                "Labs & Facilities",
                "Library Resources",
              ],
            },
            {
              title: "Financial Information",
              items: [
                "Fee Structure",
                "Scholarships",
                "Financial Audit",
                "Resource Allocation",
              ],
            },
          ].map((section, i) => (
            <div key={i} className="bg-orange-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">{section.title}</h3>
              <ul className="space-y-1 text-sm">
                {section.items.map((item, j) => (
                  <li key={j}>✓ {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>
    ),
  },
  "escr-report": {
    title: "e-SCR Report",
    subtitle: "Student Compliance Report",
    gradient: "from-teal-600 to-cyan-600",
    content: (
      <>
        <h2 className="text-3xl font-bold mb-6">
          e-SCR (Student Compliance Report)
        </h2>
        <p className="mb-6">
          Electronic Student Compliance Report system for tracking student
          progress and compliance with academic regulations.
        </p>
        <div className="bg-teal-50 p-8 rounded-lg mb-6">
          <h3 className="font-bold text-xl mb-4">Report Components:</h3>
          <ul className="space-y-2">
            <li>✓ Attendance Records</li>
            <li>✓ Academic Performance</li>
            <li>✓ Examination Results</li>
            <li>✓ Fee Payment Status</li>
            <li>✓ Library Utilization</li>
            <li>✓ Disciplinary Records</li>
            <li>✓ Hostel Compliance</li>
            <li>✓ Extra-curricular Participation</li>
          </ul>
        </div>
        <p className="text-sm text-gray-600">
          Students can access their e-SCR report through the student portal
          using their login credentials.
        </p>
      </>
    ),
  },
};

export default function GenericPage() {
  const router = useRouter();
  const apiBase = getApiBase();
  const { data: siteSettingsData } = useSWR(
    apiBase ? `${apiBase}/api/site-settings` : null,
    fetcher
  );
  const siteSettings = {
    ...defaultPublicSettings,
    ...normalizeSiteSettings(siteSettingsData),
  };
  const { slug } = router.query;

  const page = slug ? (siteSettings.slugPages?.[slug] || pageContent[slug]) : null;

  const renderPageContent = (content) => {
    if (typeof content === "string") {
      return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
    }

    return content;
  };

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
          {renderPageContent(page.content)}
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
