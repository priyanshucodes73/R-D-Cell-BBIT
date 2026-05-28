import { useState } from "react";
import useSWR from "swr";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";
import {
  defaultPublicSettings,
  fetcher,
  getApiBase,
  normalizeSiteSettings,
} from "../lib/siteSettings";

export default function InnovationEntrepreneurship() {
  const apiBase = getApiBase();
  const { data: siteSettingsData } = useSWR(
    apiBase ? `${apiBase}/api/site-settings` : null,
    fetcher
  );
  const siteSettings = {
    ...defaultPublicSettings,
    ...normalizeSiteSettings(siteSettingsData),
  };
  const pageSettings = siteSettings.innovationEntrepreneurshipPage || {};
  const [activeTab, setActiveTab] = useState("overview");

  const stats = pageSettings.stats || [
    { value: "50+", label: "Startups Incubated", color: "blue" },
    { value: "₹25Cr+", label: "Funding Raised", color: "green" },
    { value: "100+", label: "Patents Filed", color: "purple" },
    { value: "30+", label: "Industry Partners", color: "yellow" },
  ];

  const infrastructure = pageSettings.infrastructure || [
    {
      icon: "🚀",
      title: "Incubation Center",
      description:
        "State-of-the-art incubation facility with modern workspaces, meeting rooms, and collaborative areas.",
      points: [
        "Co-working spaces for 50+ startups",
        "Private cabins and meeting rooms",
        "High-speed fiber optic connectivity",
        "24/7 access and security",
      ],
      tone: "blue",
    },
    {
      icon: "💡",
      title: "Maker Lab",
      description:
        "Fully equipped prototyping laboratory with cutting-edge tools and equipment.",
      points: [
        "3D printing and rapid prototyping",
        "Electronics and IoT lab",
        "Woodworking and fabrication tools",
        "Testing and measurement equipment",
      ],
      tone: "purple",
    },
  ];

  const programs = pageSettings.programs || [
    {
      title: "Pre-Incubation Support",
      color: "blue",
      description: "For early-stage ideas and concepts still in development phase.",
      points: ["Idea validation workshops", "Market research support", "Initial mentorship", "Access to maker lab"],
    },
    {
      title: "Incubation Program",
      color: "green",
      description: "Comprehensive support for startups ready to scale and grow.",
      points: ["Seed funding up to ₹10 lakhs", "Dedicated workspace", "Expert mentorship", "Legal & accounting support"],
    },
    {
      title: "Acceleration Program",
      color: "purple",
      description: "Fast-track program for startups with proven business models.",
      points: ["Growth funding opportunities", "Investor connections", "International exposure", "Market expansion support"],
    },
  ];

  const stories = pageSettings.stories || [
    {
      initials: "ET",
      name: "EduTech Solutions",
      founders: "Founded by Rahul Verma & Priya Singh",
      description:
        "AI-powered personalized learning platform for K-12 students. Raised ₹5 crore in Series A funding and currently serving 100,000+ students across India.",
      badge: "Funded",
      year: "2023",
      color: "blue",
    },
    {
      initials: "AS",
      name: "AgriSense",
      founders: "Founded by Amit Kumar & Sneha Patel",
      description:
        "IoT-based crop monitoring and precision agriculture system. Winner of National Startup Award 2024 and currently deployed on 5,000+ acres of farmland.",
      badge: "Award Winner",
      year: "2024",
      color: "green",
    },
    {
      initials: "HC",
      name: "HealthConnect",
      founders: "Founded by Neha Sharma & Vikram Reddy",
      description:
        "Telemedicine platform connecting rural patients with doctors. Received angel investment of ₹2 crore and serving 50+ villages with quality healthcare access.",
      badge: "Angel Funded",
      year: "2023",
      color: "purple",
    },
    {
      initials: "GE",
      name: "GreenEnergy Tech",
      founders: "Founded by Karan Mehta & Anjali Gupta",
      description:
        "Smart energy management system for residential buildings. Deployed in 200+ apartments, reducing energy consumption by 35% and saving residents over ₹50 lakhs annually.",
      badge: "Market Ready",
      year: "2024",
      color: "orange",
    },
  ];

  const mentors = pageSettings.mentors || [
    { value: "50+", label: "Industry Mentors", tone: "blue" },
    { value: "25+", label: "Angel Investors", tone: "green" },
    { value: "100+", label: "Mentoring Sessions/Year", tone: "purple" },
    { value: "15+", label: "Workshops/Month", tone: "yellow" },
  ];

  const events = pageSettings.events || [
    { icon: "🎯", title: "Startup Pitch Competition", description: "Annual event where students pitch their business ideas to a panel of investors and industry experts. Winners receive seed funding and incubation support.", tone: "blue" },
    { icon: "💼", title: "Entrepreneur Meetups", description: "Monthly networking sessions bringing together student entrepreneurs, alumni founders, and industry professionals to share experiences and build connections.", tone: "green" },
    { icon: "🚀", title: "Innovation Hackathons", description: "48-hour intensive coding and prototyping events focused on solving real-world problems. Sponsored by leading tech companies with exciting prizes.", tone: "purple" },
    { icon: "📚", title: "Startup Bootcamps", description: "Intensive 2-week programs covering business model canvas, financial planning, marketing strategies, and legal frameworks for aspiring entrepreneurs.", tone: "yellow" },
  ];

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
            {pageSettings.heroTitle || "Innovation & Entrepreneurship at BBIT"}
          </h1>
          <p className="text-xl opacity-90">
            {pageSettings.heroSubtitle ||
              "Empowering creative minds to transform ideas into viable business opportunities"}
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
          {stats.map((item, index) => (
            <div key={index} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 p-6 rounded-xl text-center`}>
              <div className={`text-4xl font-bold text-${item.color}-900 mb-2`}>{item.value}</div>
              <div className="text-gray-700">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Our Facilities */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8">
            {pageSettings.infrastructureTitle || "Innovation Infrastructure"}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {infrastructure.map((item, index) => (
              <div key={index} className={`bg-gradient-to-br from-${item.tone}-50 to-${item.tone === 'blue' ? 'indigo' : item.tone}-50 p-6 rounded-xl`}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className={`text-2xl font-bold text-${item.tone}-900 mb-3`}>{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <ul className="space-y-2 text-gray-700">
                  {item.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Programs & Support */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8">
            {pageSettings.programsTitle || "Entrepreneurship Programs"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <div key={index} className={`border-l-4 border-${program.color}-600 pl-4`}>
                <h3 className={`text-xl font-bold text-${program.color}-900 mb-3`}>{program.title}</h3>
                <p className="text-gray-700 mb-3">{program.description}</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {program.points.map((point, pointIndex) => (
                    <li key={pointIndex}>• {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8">
            {pageSettings.storiesTitle || "Success Stories"}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 bg-${story.color}-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}>
                    {story.initials}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-${story.color}-900`}>{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.founders}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{story.description}</p>
                <div className="flex gap-4 text-sm">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                    {story.badge}
                  </span>
                  <span className="text-gray-600">Year: {story.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentorship */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8">
            {pageSettings.mentorsTitle || "Expert Mentorship Network"}
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            {pageSettings.mentorsBody || "Access to industry veterans, successful entrepreneurs, and domain experts who guide startups through challenges and opportunities."}
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {mentors.map((mentor, index) => (
              <div key={index} className="text-center p-4">
                <div className={`w-20 h-20 bg-${mentor.tone}-100 rounded-full mx-auto mb-3 flex items-center justify-center text-${mentor.tone}-900 font-bold text-2xl`}>
                  {mentor.value}
                </div>
                <div className="font-semibold text-gray-800">{mentor.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Events & Activities */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8">
            {pageSettings.eventsTitle || "Events & Activities"}
          </h2>
          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={index} className={`flex items-start gap-4 p-4 bg-${event.tone}-50 rounded-lg`}>
                <div className="text-3xl">{event.icon}</div>
                <div>
                  <h3 className={`text-xl font-bold text-${event.tone}-900 mb-2`}>{event.title}</h3>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-xl shadow-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">{pageSettings.ctaTitle || "Ready to Start Your Journey?"}</h2>
          <p className="text-xl mb-8 opacity-90">
            {pageSettings.ctaBody || "Join BBIT's Innovation & Entrepreneurship ecosystem and turn your ideas into reality"}
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
