import { useState } from "react";
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

const defaultOpenPositions = [
  {
    title: "Research Faculty - Computer Science",
    type: "Full-time",
    department: "Computer Science & Engineering",
    location: "BBIT Campus, Kolkata",
    experience: "3-10 years",
    description: "Seeking experienced faculty with expertise in AI/ML, Data Science, or Cybersecurity to lead research projects and mentor students.",
    requirements: ["Ph.D. in Computer Science or related field", "Strong publication record in reputed journals", "Experience in research project management", "Proficiency in programming and research tools"],
    responsibilities: ["Lead research projects and guide research scholars", "Publish papers in high-impact journals", "Apply for research grants and funding", "Mentor undergraduate and graduate students"],
  },
  {
    title: "Post-Doctoral Researcher - IoT & Smart Systems",
    type: "Contract (2 years)",
    department: "Electronics & Communication",
    location: "BBIT Campus, Kolkata",
    experience: "Fresh Ph.D. to 3 years",
    description: "Post-doctoral position for IoT and smart systems research with focus on industrial applications and sensor networks.",
    requirements: ["Ph.D. in Electronics/Computer Science/Related field", "Experience with IoT platforms and protocols", "Publications in IoT domain", "Programming skills (Python, C/C++)"],
    responsibilities: ["Conduct independent research in IoT systems", "Collaborate on funded research projects", "Publish research findings", "Assist in lab management and student guidance"],
  },
  {
    title: "Research Scholar - Artificial Intelligence",
    type: "Ph.D. Position",
    department: "Computer Science & Engineering",
    location: "BBIT Campus, Kolkata",
    experience: "M.Tech/M.S. in relevant field",
    description: "Fully-funded Ph.D. position in AI research with focus on healthcare applications, computer vision, or natural language processing.",
    requirements: ["Master's degree in Computer Science/AI/ML", "Strong mathematical and programming background", "Research publications (preferred)", "Valid GATE/NET score (preferred)"],
    responsibilities: ["Conduct cutting-edge research in AI/ML", "Publish papers in top conferences and journals", "Assist in teaching and lab activities", "Complete Ph.D. within stipulated time"],
  },
  {
    title: "Lab Manager - Research Infrastructure",
    type: "Full-time",
    department: "R&D Administration",
    location: "BBIT Campus, Kolkata",
    experience: "5+ years",
    description: "Manage research labs, coordinate equipment maintenance, and support research activities across departments.",
    requirements: ["B.Tech/M.Tech in Engineering", "Experience in lab management", "Knowledge of research equipment and safety protocols", "Strong organizational and coordination skills"],
    responsibilities: ["Maintain and manage research laboratories", "Coordinate equipment procurement and maintenance", "Ensure safety and compliance standards", "Support researchers with technical requirements"],
  },
  {
    title: "Research Associate - Robotics",
    type: "Full-time",
    department: "Mechanical Engineering",
    location: "BBIT Campus, Kolkata",
    experience: "1-5 years",
    description: "Work on robotics and automation projects with focus on industrial applications and autonomous systems.",
    requirements: ["M.Tech in Robotics/Mechanical/Related field", "Experience with ROS, embedded systems", "Programming skills (Python, C++)", "Knowledge of control systems and kinematics"],
    responsibilities: ["Develop robotic systems and prototypes", "Conduct experiments and collect data", "Publish research findings", "Collaborate with industry partners"],
  },
];

const defaultBenefits = [
  { icon: "💰", title: "Competitive Salary", description: "Industry-leading compensation packages with performance bonuses and increments" },
  { icon: "🎓", title: "Research Funding", description: "Access to internal and external funding opportunities for research projects" },
  { icon: "🏥", title: "Health Insurance", description: "Comprehensive medical insurance for you and your family" },
  { icon: "📚", title: "Learning & Development", description: "Conference sponsorship, training programs, and skill development opportunities" },
  { icon: "🏖️", title: "Work-Life Balance", description: "Flexible work hours, paid leaves, and sabbatical options" },
  { icon: "🌍", title: "International Collaboration", description: "Opportunities to collaborate with global research institutions" },
];

const defaultHiringProcess = [
  { step: "1", title: "Apply Online", description: "Submit your application with CV, research statement, and publications" },
  { step: "2", title: "Initial Screening", description: "Our team reviews applications and shortlists candidates" },
  { step: "3", title: "Technical Interview", description: "Discussion about research interests and technical expertise" },
  { step: "4", title: "Presentation", description: "Present your research work to the department faculty" },
  { step: "5", title: "Final Interview", description: "Meet with department head and discuss terms" },
  { step: "6", title: "Offer Letter", description: "Receive offer and complete joining formalities" },
];

export default function JoinOurTeam({ fallback }) {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const apiBase = getApiBase();
  const { data: siteSettingsData } = useSWR(apiBase ? `${apiBase}/api/site-settings` : null, fetcher);
  const siteSettings = { ...defaultPublicSettings, ...normalizeSiteSettings(siteSettingsData) };
  const pageSettings = siteSettings.joinOurTeamPage || {};
  const openPositions = pageSettings.openPositions || defaultOpenPositions;
  const benefits = pageSettings.benefits || defaultBenefits;
  const hiringProcess = pageSettings.hiringProcess || defaultHiringProcess;

  return (
    <SWRConfig value={{ fallback }}>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-900 via-teal-900 to-blue-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Join Our Team</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">{pageSettings.heroTitle || "Join Our Research Team"}</h1>
          <p className="text-xl opacity-90">{pageSettings.heroSubtitle || "Be part of cutting-edge research and shape the future of technology"}</p>
        </div>
      </section>

      {/* Why Join BBIT */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Why Join BBIT R&D Cell?
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg mb-4">
              BBIT offers an exceptional research environment where innovation meets
              opportunity. Our R&D Cell is a vibrant community of researchers,
              scholars, and innovators working on cutting-edge projects that make a
              real-world impact.
            </p>
            <p className="text-gray-700 text-lg">
              We provide world-class infrastructure, generous funding support, and a
              collaborative ecosystem that fosters groundbreaking research. Join us
              to advance your career while contributing to technological innovation.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
            Current Openings
          </h2>
          <div className="space-y-6">
            {openPositions.map((position, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{position.title}</h3>
                      <div className="flex gap-4 text-sm opacity-90">
                        <span>📍 {position.location}</span>
                        <span>🏢 {position.department}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                        {position.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-700 text-lg mb-6">{position.description}</p>

                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <h4 className="font-bold text-blue-900 mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, i) => (
                          <li key={i} className="text-gray-700 flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-3">Responsibilities:</h4>
                      <ul className="space-y-2">
                        {position.responsibilities.map((resp, i) => (
                          <li key={i} className="text-gray-700 flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-600">
                      <strong>Experience:</strong> {position.experience}
                    </span>
                  </div>

                  <div className="mt-6">
                    <Link href="/register">
                      <span className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                        Apply Now
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Our Hiring Process
        </h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {hiringProcess.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-blue-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              {idx < hiringProcess.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-blue-600 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl mb-8 opacity-90">
            Don't see a position that fits? Send us your CV and research interests.
            We're always looking for talented researchers!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg shadow-xl hover:bg-yellow-300 transition transform hover:scale-105 cursor-pointer">
                Apply Now
              </span>
            </Link>
            <Link href="/contact-us">
              <span className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition transform hover:scale-105 cursor-pointer">
                Contact HR
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
