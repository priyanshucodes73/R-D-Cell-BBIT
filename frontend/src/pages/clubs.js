import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function Clubs() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const clubStats = [
    { label: "Active Clubs & Societies", value: "40+", icon: "🏛️", color: "orange" },
    { label: "Student Members", value: "5000+", icon: "👥", color: "blue" },
    { label: "Events Per Year", value: "200+", icon: "🎉", color: "purple" },
    { label: "National Championships", value: "25+", icon: "🏆", color: "yellow" },
  ];

  const technicalClubs = [
    {
      name: "Coding Club",
      icon: "💻",
      category: "Technical",
      members: 320,
      events: 24,
      lead: "Arjun Mehta",
      founded: "2015",
      desc: "Competitive programming, hackathons, open-source contributions and weekly coding challenges.",
      tags: ["DSA", "Competitive Coding", "Open Source"],
      achievements: ["ICPC Regionals 2024", "Smart India Hackathon Winner"],
      color: "blue",
    },
    {
      name: "Robotics Club",
      icon: "🤖",
      category: "Technical",
      members: 180,
      events: 15,
      lead: "Priya Nair",
      founded: "2016",
      desc: "Design and build robots for national competitions, autonomous drones, and IoT-based systems.",
      tags: ["Arduino", "ROS", "Drones", "IoT"],
      achievements: ["Robocon 2024 Finalist", "TechFest IIT Bombay 2nd Place"],
      color: "indigo",
    },
    {
      name: "AI & ML Club",
      icon: "🧠",
      category: "Technical",
      members: 250,
      events: 18,
      lead: "Sneha Kapoor",
      founded: "2018",
      desc: "Machine learning projects, data science competitions, research paper readings and AI workshops.",
      tags: ["Python", "TensorFlow", "Data Science", "NLP"],
      achievements: ["Kaggle National Rank #12", "Google AI Challenge Finalists"],
      color: "purple",
    },
    {
      name: "Cybersecurity Club",
      icon: "🔐",
      category: "Technical",
      members: 150,
      events: 12,
      lead: "Rahul Sharma",
      founded: "2019",
      desc: "Ethical hacking, CTF challenges, cybersecurity awareness drives and bug bounty programs.",
      tags: ["CTF", "Ethical Hacking", "Penetration Testing"],
      achievements: ["National CTF Rank #3", "NASSCOM Cybersecurity Award"],
      color: "red",
    },
    {
      name: "Web Dev Society",
      icon: "🌐",
      category: "Technical",
      members: 200,
      events: 20,
      lead: "Kavya Reddy",
      founded: "2017",
      desc: "Full-stack development, UI/UX design, tech talks and building college portals and apps.",
      tags: ["React", "Node.js", "UI/UX", "Flutter"],
      achievements: ["Best College App Award 2024", "Hackathon Runner-Up"],
      color: "teal",
    },
    {
      name: "Electronics & Circuit Club",
      icon: "⚡",
      category: "Technical",
      members: 130,
      events: 10,
      lead: "Vikash Pandey",
      founded: "2014",
      desc: "PCB design, embedded systems, electronics project workshops and e-waste recycling drives.",
      tags: ["PCB Design", "Embedded Systems", "VLSI"],
      achievements: ["E-Yantra IIT Bombay Finalists", "Best Project TEQIP 2024"],
      color: "yellow",
    },
  ];

  const culturalClubs = [
    {
      name: "Drama & Theatre Society",
      icon: "🎭",
      category: "Cultural",
      members: 120,
      events: 8,
      lead: "Aisha Khan",
      founded: "2013",
      desc: "Stage plays, street theatre, mono-acting, mime and annual cultural festival performances.",
      tags: ["Stage Plays", "Street Theatre", "Mono-acting"],
      achievements: ["National Theatre Fest Gold 2024", "Inter-College Drama 1st"],
      color: "pink",
    },
    {
      name: "Music Club",
      icon: "🎵",
      category: "Cultural",
      members: 200,
      events: 30,
      lead: "Rohan Verma",
      founded: "2012",
      desc: "Band performances, classical music, live concerts, studio recordings and fusion shows.",
      tags: ["Western", "Classical", "Band", "Fusion"],
      achievements: ["Spic Macay National Winner", "Rock On Fest Champions"],
      color: "green",
    },
    {
      name: "Dance Club",
      icon: "💃",
      category: "Cultural",
      members: 180,
      events: 25,
      lead: "Ananya Bose",
      founded: "2012",
      desc: "Classical dance forms, hip-hop, contemporary, Bollywood and folk dance performances.",
      tags: ["Hip-Hop", "Classical", "Contemporary", "Bollywood"],
      achievements: ["Mood Indigo 1st Place", "National Dance Championship Finalists"],
      color: "orange",
    },
    {
      name: "Photography Club",
      icon: "📷",
      category: "Cultural",
      members: 160,
      events: 20,
      lead: "Sameer Joshi",
      founded: "2016",
      desc: "Photography walks, editing workshops, exhibitions, and documentary filmmaking projects.",
      tags: ["Portrait", "Wildlife", "Documentary", "Editing"],
      achievements: ["Times of India Photo Award 2024", "National Youth Fest Winner"],
      color: "gray",
    },
    {
      name: "Literary & Debate Club",
      icon: "📖",
      category: "Cultural",
      members: 140,
      events: 22,
      lead: "Divya Menon",
      founded: "2014",
      desc: "Debates, Model UN, quizzing, creative writing workshops and annual literary magazine.",
      tags: ["MUN", "Debate", "Quizzing", "Creative Writing"],
      achievements: ["National MUN Best Delegate 2024", "Quiz Fest Champions"],
      color: "amber",
    },
    {
      name: "Fine Arts Club",
      icon: "🎨",
      category: "Cultural",
      members: 110,
      events: 14,
      lead: "Pooja Pillai",
      founded: "2015",
      desc: "Painting, sculpting, rangoli, wall murals and annual art exhibition at the college campus.",
      tags: ["Painting", "Sculpture", "Digital Art", "Murals"],
      achievements: ["AICTE Art Award 2024", "State-Level Art Competition 1st"],
      color: "rose",
    },
  ];

  const sportsClubs = [
    {
      name: "Cricket Club",
      icon: "🏏",
      category: "Sports",
      members: 80,
      events: 15,
      lead: "Siddharth Rao",
      founded: "2010",
      desc: "Cricket practice sessions, inter-college tournaments, skill development camps and coaching.",
      tags: ["T20", "Inter-College", "Net Practice"],
      achievements: ["University Champions 2024", "Zonal Cricket Trophy 1st"],
      color: "green",
    },
    {
      name: "Football Club",
      icon: "⚽",
      category: "Sports",
      members: 90,
      events: 18,
      lead: "Aryan Sharma",
      founded: "2011",
      desc: "Football tournaments, friendly matches, futsal competitions and fitness training camps.",
      tags: ["Football", "Futsal", "Inter-Zonal"],
      achievements: ["Inter-College League Champions", "Sports Zonal 2nd Place"],
      color: "blue",
    },
    {
      name: "Chess Club",
      icon: "♟️",
      category: "Sports",
      members: 70,
      events: 12,
      lead: "Meera Krishnan",
      founded: "2013",
      desc: "Chess tournaments, online blitz sessions, grandmaster workshops and FIDE-rated events.",
      tags: ["Chess", "FIDE Rated", "Blitz"],
      achievements: ["State Chess Championship Finalist", "University Rank #2"],
      color: "gray",
    },
    {
      name: "Basketball Club",
      icon: "🏀",
      category: "Sports",
      members: 75,
      events: 14,
      lead: "Nikhil Desai",
      founded: "2012",
      desc: "Basketball league, 3-on-3 tournaments, fitness training and sports psychology sessions.",
      tags: ["3x3", "League", "Streetball"],
      achievements: ["West Bengal University Champions", "Corporate Cup Winners"],
      color: "orange",
    },
    {
      name: "Athletics Club",
      icon: "🏃",
      category: "Sports",
      members: 95,
      events: 20,
      lead: "Riya Chatterjee",
      founded: "2010",
      desc: "Track and field events, marathon running, high jump, shot put and cross-country races.",
      tags: ["Track & Field", "Marathon", "Sprint"],
      achievements: ["University Gold Medalist 2024", "State Athletics Meet 3 Medals"],
      color: "red",
    },
    {
      name: "Badminton Club",
      icon: "🏸",
      category: "Sports",
      members: 85,
      events: 16,
      lead: "Karan Malhotra",
      founded: "2011",
      desc: "Badminton coaching, inter-house tournaments, doubles practice and state-level competitions.",
      tags: ["Singles", "Doubles", "Inter-College"],
      achievements: ["State Badminton Doubles Champions", "South Zone Finalists 2024"],
      color: "purple",
    },
  ];

  const colorMap = {
    blue: { card: "border-blue-500", badge: "bg-blue-100 text-blue-800", icon: "bg-blue-600", stat: "text-blue-900" },
    indigo: { card: "border-indigo-500", badge: "bg-indigo-100 text-indigo-800", icon: "bg-indigo-600", stat: "text-indigo-900" },
    purple: { card: "border-purple-500", badge: "bg-purple-100 text-purple-800", icon: "bg-purple-600", stat: "text-purple-900" },
    red: { card: "border-red-500", badge: "bg-red-100 text-red-800", icon: "bg-red-600", stat: "text-red-900" },
    teal: { card: "border-teal-500", badge: "bg-teal-100 text-teal-800", icon: "bg-teal-600", stat: "text-teal-900" },
    yellow: { card: "border-yellow-500", badge: "bg-yellow-100 text-yellow-800", icon: "bg-yellow-600", stat: "text-yellow-900" },
    pink: { card: "border-pink-500", badge: "bg-pink-100 text-pink-800", icon: "bg-pink-600", stat: "text-pink-900" },
    green: { card: "border-green-500", badge: "bg-green-100 text-green-800", icon: "bg-green-600", stat: "text-green-900" },
    orange: { card: "border-orange-500", badge: "bg-orange-100 text-orange-800", icon: "bg-orange-600", stat: "text-orange-900" },
    gray: { card: "border-gray-500", badge: "bg-gray-100 text-gray-800", icon: "bg-gray-600", stat: "text-gray-900" },
    amber: { card: "border-amber-500", badge: "bg-amber-100 text-amber-800", icon: "bg-amber-600", stat: "text-amber-900" },
    rose: { card: "border-rose-500", badge: "bg-rose-100 text-rose-800", icon: "bg-rose-600", stat: "text-rose-900" },
  };

  const upcomingEvents = [
    {
      title: "Annual Tech Fest - TechVision 2026",
      date: "March 20–22, 2026",
      type: "Technical",
      organizer: "Coding Club & AI/ML Club",
      icon: "💻",
      badge: "bg-blue-100 text-blue-800",
      participants: "1200+",
      prizes: "₹2 Lakhs",
    },
    {
      title: "Cultural Extravaganza - Rangnite 2026",
      date: "April 5–7, 2026",
      type: "Cultural",
      organizer: "Drama, Music & Dance Clubs",
      icon: "🎭",
      badge: "bg-pink-100 text-pink-800",
      participants: "800+",
      prizes: "₹1.5 Lakhs",
    },
    {
      title: "Annual Sports Tournament - Sportomania",
      date: "April 18–25, 2026",
      type: "Sports",
      organizer: "Sports Committee",
      icon: "🏆",
      badge: "bg-green-100 text-green-800",
      participants: "600+",
      prizes: "Trophies & Medals",
    },
    {
      title: "Hackathon 48 Hours - InnoThon",
      date: "May 10–11, 2026",
      type: "Technical",
      organizer: "Coding Club & Web Dev Society",
      icon: "🚀",
      badge: "bg-purple-100 text-purple-800",
      participants: "500+",
      prizes: "₹3 Lakhs",
    },
    {
      title: "Model United Nations Conference",
      date: "May 25–27, 2026",
      type: "Cultural",
      organizer: "Literary & Debate Club",
      icon: "🌍",
      badge: "bg-amber-100 text-amber-800",
      participants: "400+",
      prizes: "Certificates & Awards",
    },
    {
      title: "Photography Exhibition - Through the Lens",
      date: "June 1–3, 2026",
      type: "Cultural",
      organizer: "Photography Club & Fine Arts Club",
      icon: "📷",
      badge: "bg-gray-100 text-gray-800",
      participants: "300+",
      prizes: "Certificates & Cash",
    },
  ];

  const clubLeadership = [
    {
      name: "Prof. Anand Sinha",
      role: "Dean of Student Affairs",
      clubs: "All Clubs",
      exp: "18+ years",
    },
    {
      name: "Dr. Sujata De",
      role: "Faculty Coordinator – Technical Clubs",
      clubs: "Coding, Robotics, AI/ML, Cyber",
      exp: "12+ years",
    },
    {
      name: "Mr. Ranjit Ghosh",
      role: "Faculty Coordinator – Cultural Clubs",
      clubs: "Drama, Music, Dance, Arts",
      exp: "10+ years",
    },
    {
      name: "Ms. Tamanna Basu",
      role: "Faculty Coordinator – Sports",
      clubs: "All Sports Clubs",
      exp: "8+ years",
    },
  ];

  const allClubs = [...technicalClubs, ...culturalClubs, ...sportsClubs];
  const categories = ["All", "Technical", "Cultural", "Sports"];

  const filteredClubs = allClubs.filter((club) => {
    const matchesCategory = selectedCategory === "All" || club.category === selectedCategory;
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const ClubCard = ({ club }) => {
    const c = colorMap[club.color] || colorMap.blue;
    return (
      <div
        className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-t-4 ${c.card} flex flex-col`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 ${c.icon} rounded-xl flex items-center justify-center text-3xl shadow`}>
            {club.icon}
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${c.stat}`}>{club.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${c.badge}`}>
              {club.category}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 flex-1">{club.desc}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {club.tags.map((tag, i) => (
            <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className={`text-xl font-bold ${c.stat}`}>{club.members}</div>
            <div className="text-xs text-gray-500">Members</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className={`text-xl font-bold ${c.stat}`}>{club.events}</div>
            <div className="text-xs text-gray-500">Events/Year</div>
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="text-xs text-gray-500 mb-1">
            <span className="font-semibold">Lead:</span> {club.lead}
          </div>
          <div className="text-xs text-gray-500 mb-2">
            <span className="font-semibold">Founded:</span> {club.founded}
          </div>
          <div className="text-xs font-semibold text-gray-700 mb-1">🏅 Achievements:</div>
          {club.achievements.map((a, i) => (
            <div key={i} className="text-xs text-gray-600 flex items-start gap-1">
              <span className="text-yellow-500">★</span> {a}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-900 via-amber-800 to-orange-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Clubs &amp; Groups</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Clubs &amp; Student Groups</h1>
          <p className="text-xl opacity-90">
            Explore, connect and grow — where passion meets purpose at BBIT
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white py-8 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clubStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className={`text-4xl font-bold text-${stat.color}-900`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["overview", "technical", "cultural", "sports", "events"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full font-semibold transition text-lg ${
                activeTab === tab
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div>
            <h2 className="text-3xl font-bold text-orange-900 text-center mb-4">
              Find Your Club
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Search across all 40+ clubs and student groups at BBIT
            </p>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Search clubs by name, tag or interest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-2 border-orange-200 rounded-xl px-5 py-3 text-base focus:outline-none focus:border-orange-500"
              />
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-3 rounded-xl font-semibold transition ${
                      selectedCategory === cat
                        ? "bg-orange-600 text-white shadow"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-orange-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredClubs.length === 0 ? (
              <div className="text-center text-gray-500 py-20">
                <div className="text-6xl mb-4">🔍</div>
                <div className="text-xl">No clubs found matching your search.</div>
              </div>
            ) : (
              <>
                <div className="text-sm text-gray-500 mb-4">
                  Showing {filteredClubs.length} club{filteredClubs.length !== 1 ? "s" : ""}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClubs.map((club, idx) => (
                    <ClubCard key={idx} club={club} />
                  ))}
                </div>
              </>
            )}

            {/* Why Join Section */}
            <div className="mt-16 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-orange-900 text-center mb-8">
                Why Join a Club?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow text-center">
                  <div className="text-5xl mb-4">🤝</div>
                  <h4 className="text-lg font-bold text-orange-900 mb-2">Build a Network</h4>
                  <p className="text-sm text-gray-600">
                    Connect with like-minded students, alumni and industry professionals who share your interests.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow text-center">
                  <div className="text-5xl mb-4">🚀</div>
                  <h4 className="text-lg font-bold text-orange-900 mb-2">Develop Skills</h4>
                  <p className="text-sm text-gray-600">
                    Gain hands-on experience through projects, competitions, workshops and real-world challenges.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow text-center">
                  <div className="text-5xl mb-4">🏆</div>
                  <h4 className="text-lg font-bold text-orange-900 mb-2">Win & Achieve</h4>
                  <p className="text-sm text-gray-600">
                    Represent BBIT in national competitions, festivals and championships and bring glory to the campus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TECHNICAL TAB ── */}
        {activeTab === "technical" && (
          <div>
            <h2 className="text-3xl font-bold text-orange-900 text-center mb-2">
              Technical Clubs
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Sharpen your skills with code, circuits, robots and data
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalClubs.map((club, idx) => (
                <ClubCard key={idx} club={club} />
              ))}
            </div>

            {/* Tech Highlights */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-orange-900 mb-6 text-center">
                Technical Club Highlights
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-900">48</div>
                  <div className="text-gray-600 mt-2">Hackathons Won</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-purple-900">1200+</div>
                  <div className="text-gray-600 mt-2">Tech Members</div>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-indigo-900">90+</div>
                  <div className="text-gray-600 mt-2">Workshops/Year</div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-green-900">15</div>
                  <div className="text-gray-600 mt-2">National Awards</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CULTURAL TAB ── */}
        {activeTab === "cultural" && (
          <div>
            <h2 className="text-3xl font-bold text-orange-900 text-center mb-2">
              Cultural Clubs
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Express yourself through art, music, drama and performance
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {culturalClubs.map((club, idx) => (
                <ClubCard key={idx} club={club} />
              ))}
            </div>

            {/* Cultural Highlights */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-orange-900 mb-6 text-center">
                Cultural Achievements
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-pink-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-pink-900">35</div>
                  <div className="text-gray-600 mt-2">Cultural Awards 2024</div>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-orange-900">900+</div>
                  <div className="text-gray-600 mt-2">Cultural Members</div>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-amber-900">50+</div>
                  <div className="text-gray-600 mt-2">Shows Per Year</div>
                </div>
                <div className="bg-rose-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-rose-900">10</div>
                  <div className="text-gray-600 mt-2">National Fest Wins</div>
                </div>
              </div>
            </div>

            {/* Annual Cultural Fest */}
            <div className="mt-8 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-xl p-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🎪</div>
                <h3 className="text-2xl font-bold mb-2">Rangnite — Annual Cultural Festival</h3>
                <p className="opacity-90 mb-4">
                  3-day mega cultural extravaganza with 50+ events, celebrity performances, competitions and much more!
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">📅 April 5–7, 2026</div>
                  <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">👥 2000+ Participants</div>
                  <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">🏆 ₹3 Lakhs Prize Pool</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SPORTS TAB ── */}
        {activeTab === "sports" && (
          <div>
            <h2 className="text-3xl font-bold text-orange-900 text-center mb-2">
              Sports Clubs
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Train, compete and win — represent BBIT on the national stage
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sportsClubs.map((club, idx) => (
                <ClubCard key={idx} club={club} />
              ))}
            </div>

            {/* Sports Facilities */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-orange-900 mb-6 text-center">
                Sports Facilities at BBIT
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 transition">
                  <div className="text-4xl mb-2 text-center">🏟️</div>
                  <h4 className="font-bold text-center mb-2">Outdoor Facilities</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Full-size Cricket Ground</li>
                    <li>✓ Football Field (FIFA Standard)</li>
                    <li>✓ 400m Athletic Track</li>
                    <li>✓ Outdoor Basketball Courts</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition">
                  <div className="text-4xl mb-2 text-center">🏋️</div>
                  <h4 className="font-bold text-center mb-2">Indoor Facilities</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Modern Gymnasium</li>
                    <li>✓ Indoor Badminton Courts (4)</li>
                    <li>✓ Table Tennis Hall</li>
                    <li>✓ Chess & Carrom Room</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition">
                  <div className="text-4xl mb-2 text-center">👨‍⚕️</div>
                  <h4 className="font-bold text-center mb-2">Support Services</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Certified Sports Coaches</li>
                    <li>✓ Physiotherapy Center</li>
                    <li>✓ Sports Nutrition Counseling</li>
                    <li>✓ Sports Psychology Sessions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sports Highlights */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-orange-900 mb-6 text-center">
                Sports Statistics 2024–25
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-green-900">25+</div>
                  <div className="text-gray-600 mt-2">Trophies Won</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-900">500+</div>
                  <div className="text-gray-600 mt-2">Athletes</div>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-orange-900">12</div>
                  <div className="text-gray-600 mt-2">Sports Played</div>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-red-900">8</div>
                  <div className="text-gray-600 mt-2">National Medals</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── EVENTS TAB ── */}
        {activeTab === "events" && (
          <div>
            <h2 className="text-3xl font-bold text-orange-900 text-center mb-2">
              Upcoming Events
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Mark your calendar — exciting events are coming up at BBIT
            </p>

            <div className="space-y-6">
              {upcomingEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                      {event.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.badge}`}>
                          {event.type}
                        </span>
                      </div>
                      <div className="text-sm text-orange-700 font-semibold mb-1">
                        📅 {event.date}
                      </div>
                      <div className="text-sm text-gray-600">
                        Organized by: {event.organizer}
                      </div>
                    </div>
                    <div className="flex gap-6 text-center flex-shrink-0">
                      <div>
                        <div className="text-xl font-bold text-orange-900">{event.participants}</div>
                        <div className="text-xs text-gray-500">Expected</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-green-900">{event.prizes}</div>
                        <div className="text-xs text-gray-500">Prize Pool</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Club Leadership */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-orange-900 mb-6 text-center">
                Club Coordinators &amp; Leadership
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {clubLeadership.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition"
                  >
                    <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg text-gray-900">{member.name}</div>
                      <div className="text-sm text-orange-800 font-semibold">{member.role}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {member.exp} experience
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        Clubs: {member.clubs}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Join */}
            <div className="mt-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-orange-900 text-center mb-6">
                How to Join a Club?
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: "1", title: "Browse Clubs", desc: "Explore all clubs in the overview tab and find what interests you.", icon: "🔍" },
                  { step: "2", title: "Attend Open Day", desc: "Visit club stalls at the annual Club Open Day during Orientation Week.", icon: "🎪" },
                  { step: "3", title: "Register Online", desc: "Fill out the club membership form through the student portal.", icon: "📝" },
                  { step: "4", title: "Get Started", desc: "Attend your first meeting, meet the team and dive straight in!", icon: "🚀" },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 shadow text-center">
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                      {s.step}
                    </div>
                    <h4 className="font-bold text-orange-900 mb-1">{s.title}</h4>
                    <p className="text-xs text-gray-600">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-900 to-amber-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join one of BBIT's 40+ clubs and start your journey of growth, achievement and lifelong friendships
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <button className="bg-yellow-400 text-orange-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition shadow-lg">
                Register Now
              </button>
            </Link>
            <Link href="/contact-us">
              <button className="bg-white text-orange-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg">
                Contact Student Affairs
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
