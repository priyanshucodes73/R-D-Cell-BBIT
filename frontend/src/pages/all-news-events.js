import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function AllNewsEvents() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const newsEvents = [
    {
      id: 1,
      date: "March 15, 2025",
      category: "Award",
      title: "BBIT Wins National Innovation Challenge 2025",
      image: "🏆",
      description: "Our student team secured first place at the National Level Innovation Challenge with their AI-powered healthcare solution.",
      fullContent: "A team of four students from BBIT's Computer Science department has won the prestigious National Innovation Challenge 2025, competing against 150+ teams from across India. Their project, 'HealthAI Assistant', uses advanced machine learning algorithms to predict health risks and provide personalized recommendations. The team received a cash prize of ₹5 lakhs and mentorship from industry leaders. Team members include Rahul Verma (Team Lead), Priya Singh, Amit Kumar, and Sneha Patel, guided by Dr. Jayanta Basak.",
      location: "IIT Delhi, New Delhi",
      year: 2025,
    },
    {
      id: 2,
      date: "March 10, 2025",
      category: "Event",
      title: "International Research Symposium 2025",
      image: "🎤",
      description: "Join us for our annual research symposium featuring keynote speakers from MIT, Stanford, and IITs.",
      fullContent: "BBIT is proud to host the 5th International Research Symposium on March 25-27, 2025. This three-day event will feature keynote speeches from Prof. Andrew Ng (Stanford), Prof. Yoshua Bengio (Montreal), and Prof. S.K. Gupta (IIT Delhi). The symposium will cover topics including AI, IoT, Blockchain, and Sustainable Technology. Over 200 researchers from 15 countries have registered. The event includes paper presentations, poster sessions, workshops, and networking opportunities. Registration is open until March 20th.",
      location: "BBIT Campus, Kolkata",
      year: 2025,
      eventDate: "March 25-27, 2025",
    },
    {
      id: 3,
      date: "March 5, 2025",
      category: "Achievement",
      title: "₹50 Lakhs DST-SERB Research Grant Awarded",
      image: "💰",
      description: "Dr. Jayanta Basak receives DST-SERB grant for groundbreaking AI research in medical diagnostics.",
      fullContent: "Dr. Jayanta Basak, Professor in the Department of Computer Science, has been awarded a prestigious ₹50 lakhs research grant by the Department of Science and Technology - Science and Engineering Research Board (DST-SERB). The three-year project focuses on developing deep learning models for early detection of cardiovascular diseases using ECG analysis. The research aims to create an affordable, accessible diagnostic tool that can be deployed in rural healthcare centers. Dr. Basak will collaborate with medical institutions and recruit two PhD scholars for this project.",
      location: "BBIT R&D Cell",
      year: 2025,
    },
    {
      id: 4,
      date: "February 28, 2025",
      category: "Publication",
      title: "Breakthrough Paper Published in IEEE Transactions",
      image: "📄",
      description: "Faculty research on quantum computing applications accepted in top-tier IEEE journal.",
      fullContent: "A collaborative research paper by Dr. Jayanta Basak and Dr. Munsi Yusuf Alam has been accepted for publication in IEEE Transactions on Quantum Engineering. The paper, titled 'Post-Quantum Cryptography: Novel Lattice-Based Encryption Schemes', presents innovative cryptographic algorithms designed to withstand quantum computer attacks. This publication adds to BBIT's growing reputation in cutting-edge computing research and represents a significant contribution to cybersecurity. The paper was peer-reviewed by leading experts and achieved an acceptance rate of less than 15%.",
      location: "IEEE Journal Publication",
      year: 2025,
    },
    {
      id: 5,
      date: "February 20, 2025",
      category: "Startup",
      title: "Student Startup Raises ₹25 Lakhs Angel Investment",
      image: "🚀",
      description: "EduTech Solutions, incubated at BBIT, secures ₹25 lakhs in angel funding from industry veterans.",
      fullContent: "EduTech Solutions, a startup founded by BBIT alumni Rahul Verma and Priya Singh, has successfully raised ₹25 lakhs in angel investment from prominent industry veterans. The startup, incubated at BBIT's Innovation & Entrepreneurship Cell, develops AI-powered personalized learning platforms for K-12 students. The platform has already onboarded 5,000+ students across West Bengal. The funding will be used to expand the team, develop new features, and scale operations to other states. This success story exemplifies BBIT's commitment to nurturing entrepreneurship among students.",
      location: "BBIT Incubation Center",
      year: 2025,
    },
    {
      id: 6,
      date: "February 15, 2025",
      category: "Collaboration",
      title: "Strategic Partnership with Microsoft Research India",
      image: "🤝",
      description: "BBIT signs MoU with Microsoft Research for collaborative AI and cloud computing projects.",
      fullContent: "BBIT has signed a Memorandum of Understanding (MoU) with Microsoft Research India for collaborative research in Artificial Intelligence, Machine Learning, and Cloud Computing. The partnership will enable joint research projects, provide students with access to Microsoft Azure credits worth ₹50 lakhs, and facilitate internship opportunities at Microsoft Research labs. Faculty members will receive training on cutting-edge Microsoft technologies, and students will have access to Microsoft certifications. This collaboration reinforces BBIT's position as a leading research institution.",
      location: "BBIT Campus, Kolkata",
      year: 2025,
    },
    {
      id: 7,
      date: "February 10, 2025",
      category: "Workshop",
      title: "Five-Day Workshop on AI & Machine Learning",
      image: "💻",
      description: "Hands-on workshop covering deep learning, NLP, and computer vision with industry experts.",
      fullContent: "The Department of Computer Science is organizing a comprehensive five-day workshop on AI & Machine Learning from February 24-28, 2025. The workshop will be conducted by industry experts from TCS, Infosys, and Microsoft, covering topics including Deep Learning frameworks (TensorFlow, PyTorch), Natural Language Processing, Computer Vision, and MLOps. Participants will work on real-world projects and receive certificates upon completion. Over 200 students and faculty members from BBIT and neighboring institutions have registered. Limited spots are still available.",
      location: "BBIT AI Lab",
      year: 2025,
      eventDate: "February 24-28, 2025",
    },
    {
      id: 8,
      date: "February 5, 2025",
      category: "Achievement",
      title: "Faculty Member Receives Best Researcher Award",
      image: "🌟",
      description: "Dr. Moumita Paul honored with Best Researcher Award in Robotics & Automation.",
      fullContent: "Dr. Moumita Paul, Associate Professor in the Mechanical Engineering Department, has been awarded the Best Researcher Award 2024 by the Indian Society for Robotics and Automation (ISRA). The award recognizes her outstanding contributions to agricultural robotics and autonomous systems. Dr. Paul has published 35+ papers in top-tier journals, filed 3 patents, and mentored numerous PhD students. Her recent work on autonomous robots for precision farming has gained international recognition and is being commercialized through industry partnerships.",
      location: "ISRA Annual Conference, Bangalore",
      year: 2025,
    },
    {
      id: 9,
      date: "January 28, 2025",
      category: "Event",
      title: "Annual Tech Fest 'Innovision 2025' Concluded",
      image: "🎉",
      description: "Three-day technical festival with 5000+ participants and 50+ events concluded successfully.",
      fullContent: "BBIT's annual technical festival 'Innovision 2025' concluded with tremendous success on January 28th. The three-day fest witnessed participation from 5000+ students across 100+ colleges nationwide. Events included technical competitions (coding, robotics, AI challenge), workshops, hackathons, guest lectures, and cultural performances. The fest featured keynote speeches by Dr. Vijay Kumar (IIT Bombay) and Ms. Ritu Karidhal (ISRO). Prize distribution worth ₹10 lakhs was awarded to winners. The hackathon winner developed an innovative solution for waste management using IoT and AI.",
      location: "BBIT Campus, Kolkata",
      year: 2025,
      eventDate: "January 26-28, 2025",
    },
    {
      id: 10,
      date: "January 20, 2025",
      category: "Patent",
      title: "New Patent Granted for IoT Water Monitoring System",
      image: "📜",
      description: "BBIT researchers receive patent for innovative IoT-based water quality monitoring device.",
      fullContent: "The Indian Patent Office has granted patent number 202401234 to Dr. Arindom Mitra and his team for their innovative 'Smart IoT-based Water Quality Monitoring System'. The device uses multiple sensors to measure pH, dissolved oxygen, turbidity, and contaminants in real-time, transmitting data to a cloud platform for analysis. The low-cost, solar-powered device is designed for deployment in rivers, lakes, and reservoirs. The technology has been licensed to a Kolkata-based startup for commercialization and is expected to play a crucial role in water quality management across West Bengal.",
      location: "Indian Patent Office",
      year: 2025,
    },
    {
      id: 11,
      date: "January 15, 2025",
      category: "Collaboration",
      title: "Industry Partnership with TCS for Skill Development",
      image: "🤝",
      description: "TCS to train 500 students in emerging technologies through dedicated training program.",
      fullContent: "BBIT has entered into a strategic partnership with Tata Consultancy Services (TCS) to provide specialized training in emerging technologies to 500 students over the next academic year. The program covers Cloud Computing, Cybersecurity, Data Science, and Full-Stack Development. TCS will provide certified trainers, course materials, and assessment tools. Top performers will be offered internship opportunities at TCS offices. The program aims to bridge the industry-academia gap and enhance student employability. The first batch of 100 students will begin training from February 2025.",
      location: "BBIT Campus & TCS Learning Centers",
      year: 2025,
    },
    {
      id: 12,
      date: "January 10, 2025",
      category: "Conference",
      title: "Faculty Presents at International AI Conference",
      image: "🌍",
      description: "Dr. Uddyalok Chakraborty presents research paper at AAAI Conference in Vancouver.",
      fullContent: "Dr. Uddyalok Chakraborty, Assistant Professor in the CSE Department, presented a research paper at the prestigious AAAI Conference on Artificial Intelligence held in Vancouver, Canada. His paper on 'Attention-Based Transformer Models for Low-Resource Language Processing' received significant attention from the international research community. The work focuses on developing NLP solutions for Bengali and other regional Indian languages. Dr. Chakraborty engaged with leading AI researchers and explored potential collaborations. The conference had over 3000 attendees from 50+ countries.",
      location: "Vancouver, Canada",
      year: 2025,
    },
    {
      id: 13,
      date: "December 20, 2024",
      category: "Achievement",
      title: "Students Win Smart India Hackathon 2024",
      image: "🏅",
      description: "BBIT team develops winning solution for sustainable urban transportation.",
      fullContent: "A team of six BBIT students won the Smart India Hackathon 2024 in the Urban Transportation category. Their solution, 'GreenComute', uses AI to optimize public transport routes based on real-time traffic data, reducing carbon emissions by 30%. The team competed against 500+ teams and impressed judges with their innovative approach. They received a cash prize of ₹1 lakh and an opportunity to present their solution to government officials. Team members: Amit Kumar (Lead), Sneha Das, Vikram Patel, Neha Singh, Rohit Sharma, and Priya Roy, mentored by Dr. Sandeep Malik.",
      location: "IIT Kharagpur",
      year: 2024,
    },
    {
      id: 14,
      date: "December 15, 2024",
      category: "Grant",
      title: "AICTE Funding for Lab Modernization",
      image: "💰",
      description: "₹75 lakhs sanctioned for upgrading research laboratories and equipment.",
      fullContent: "BBIT has received ₹75 lakhs from the All India Council for Technical Education (AICTE) under the Modernization and Removal of Obsolescence (MODROBS) scheme. The funds will be used to upgrade research laboratories with state-of-the-art equipment including high-performance computing servers, advanced robotics kits, IoT sensors, 3D printers, and testing instruments. The modernization will benefit 2000+ students and enhance research capabilities across all departments. The procurement process has begun and new equipment is expected to be operational by April 2025.",
      location: "BBIT Campus",
      year: 2024,
    },
    {
      id: 15,
      date: "December 10, 2024",
      category: "Event",
      title: "Alumni Reunion and Industry Connect 2024",
      image: "🎓",
      description: "500+ alumni gathered to share experiences and provide mentorship opportunities.",
      fullContent: "BBIT hosted its annual Alumni Reunion and Industry Connect event on December 10, 2024, bringing together 500+ alumni from various batches and industries. The event featured panel discussions on career growth, startup experiences, and industry trends. Distinguished alumni shared their success stories and provided mentorship to current students. The event also facilitated networking opportunities and job referrals. Alumni contributed ₹25 lakhs to the alumni corpus fund for student scholarships. The event concluded with cultural performances and recognition of notable alumni achievements.",
      location: "BBIT Campus, Kolkata",
      year: 2024,
      eventDate: "December 10, 2024",
    },
  ];

  const categories = [
    "all",
    "Award",
    "Event",
    "Achievement",
    "Publication",
    "Startup",
    "Collaboration",
    "Workshop",
    "Patent",
    "Conference",
    "Grant",
  ];

  const years = ["all", 2025, 2024];

  const filteredNewsEvents = newsEvents.filter((item) => {
    const categoryMatch =
      selectedCategory === "all" || item.category === selectedCategory;
    const yearMatch = selectedYear === "all" || item.year === parseInt(selectedYear);
    return categoryMatch && yearMatch;
  });

  const stats = {
    total: newsEvents.length,
    events: newsEvents.filter((n) => n.category === "Event" || n.category === "Workshop" || n.category === "Conference").length,
    awards: newsEvents.filter((n) => n.category === "Award" || n.category === "Achievement").length,
    collaborations: newsEvents.filter((n) => n.category === "Collaboration").length,
  };

  const getCategoryColor = (category) => {
    const colors = {
      Award: "bg-yellow-100 text-yellow-800",
      Event: "bg-blue-100 text-blue-800",
      Achievement: "bg-green-100 text-green-800",
      Publication: "bg-purple-100 text-purple-800",
      Startup: "bg-pink-100 text-pink-800",
      Collaboration: "bg-indigo-100 text-indigo-800",
      Workshop: "bg-teal-100 text-teal-800",
      Patent: "bg-orange-100 text-orange-800",
      Conference: "bg-cyan-100 text-cyan-800",
      Grant: "bg-red-100 text-red-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-200 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>News & Events</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Latest News & Events</h1>
          <p className="text-xl opacity-90">
            Stay updated with the latest happenings, achievements, and events at BBIT
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{stats.total}</div>
              <div className="text-gray-600">Total Updates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.events}</div>
              <div className="text-gray-600">Events & Workshops</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{stats.awards}</div>
              <div className="text-gray-600">Awards & Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {stats.collaborations}
              </div>
              <div className="text-gray-600">New Partnerships</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year === "all" ? "All Years" : year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredNewsEvents.length} of {newsEvents.length} updates
          </div>
        </div>
      </section>

      {/* News & Events Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNewsEvents.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white p-6">
                <div className="text-6xl text-center mb-3">{item.image}</div>
                <div className="text-sm text-center opacity-90">{item.date}</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                  {item.eventDate && (
                    <span className="text-xs text-gray-600">📅 {item.eventDate}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                {item.location && (
                  <p className="text-xs text-gray-600 mb-3">📍 {item.location}</p>
                )}
                <details className="text-sm">
                  <summary className="text-blue-700 font-semibold hover:underline cursor-pointer">
                    Read More →
                  </summary>
                  <div className="mt-4 text-gray-700 leading-relaxed">
                    {item.fullContent}
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>

        {filteredNewsEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No news or events found matching your filters.
            </p>
          </div>
        )}
      </section>

      {/* Upcoming Events Highlight */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-3">🎤</div>
              <h3 className="text-xl font-bold mb-2">Research Symposium</h3>
              <p className="text-sm opacity-90 mb-2">March 25-27, 2025</p>
              <p className="text-sm">
                International researchers presenting cutting-edge work in AI, IoT, and more.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-3">💻</div>
              <h3 className="text-xl font-bold mb-2">AI Workshop Series</h3>
              <p className="text-sm opacity-90 mb-2">February 24-28, 2025</p>
              <p className="text-sm">
                Hands-on training in machine learning, NLP, and computer vision.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-xl font-bold mb-2">Startup Pitch Day</h3>
              <p className="text-sm opacity-90 mb-2">April 15, 2025</p>
              <p className="text-sm">
                Student startups pitching to investors and industry leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Subscribe to receive the latest news, events, and research updates directly in your inbox.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-bold px-8 py-4 rounded-lg hover:from-orange-700 hover:to-yellow-700 transition shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Feature Your Event?</h2>
          <p className="text-xl mb-8 opacity-90">
            If you're organizing an event or have news to share, get in touch with us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact-us">
              <span className="inline-block bg-white text-orange-600 font-bold px-8 py-4 rounded-lg shadow-xl hover:bg-gray-100 transition transform hover:scale-105 cursor-pointer">
                Contact Us
              </span>
            </Link>
            <Link href="/register">
              <span className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition transform hover:scale-105 cursor-pointer">
                Register for Events
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
