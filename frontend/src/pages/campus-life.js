import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function CampusLife() {
  const [selectedCategory, setSelectedCategory] = useState("clubs");

  const clubs = [
    {
      name: "Tech Club",
      members: 250,
      description:
        "Coding competitions, hackathons, tech talks, and innovation projects",
      icon: "💻",
      events: "20+ events/year",
    },
    {
      name: "Cultural Society",
      members: 300,
      description:
        "Music, dance, drama, art exhibitions, and cultural festivals",
      icon: "🎭",
      events: "30+ events/year",
    },
    {
      name: "Sports Club",
      members: 400,
      description:
        "Cricket, football, basketball, athletics, and inter-college tournaments",
      icon: "⚽",
      events: "50+ matches/year",
    },
    {
      name: "Entrepreneurship Cell",
      members: 150,
      description:
        "Startup mentorship, business plan competitions, investor connects",
      icon: "🚀",
      events: "15+ workshops/year",
    },
    {
      name: "Literary Society",
      members: 180,
      description:
        "Debate competitions, poetry slams, book clubs, and writing workshops",
      icon: "📚",
      events: "25+ events/year",
    },
    {
      name: "Social Service Club",
      members: 200,
      description:
        "Community service, blood donation drives, environmental campaigns",
      icon: "🤝",
      events: "40+ drives/year",
    },
    {
      name: "Photography Club",
      members: 120,
      description:
        "Photo walks, exhibitions, workshops, and campus documentation",
      icon: "📷",
      events: "12+ exhibitions/year",
    },
    {
      name: "Music Band",
      members: 80,
      description:
        "Live performances, jam sessions, music festivals, and recordings",
      icon: "🎸",
      events: "15+ concerts/year",
    },
  ];

  const sports = [
    {
      name: "Cricket",
      facility: "2 Full-size grounds",
      achievements: "State Champions 2024",
    },
    {
      name: "Football",
      facility: "FIFA Standard ground",
      achievements: "Inter-college Winners",
    },
    {
      name: "Basketball",
      facility: "4 Courts",
      achievements: "Regional Champions",
    },
    {
      name: "Badminton",
      facility: "8 Indoor courts",
      achievements: "National participants",
    },
    {
      name: "Table Tennis",
      facility: "6 Tables",
      achievements: "University medalists",
    },
    { name: "Volleyball", facility: "2 Courts", achievements: "Zone winners" },
    {
      name: "Athletics",
      facility: "400m track",
      achievements: "Multiple state records",
    },
    {
      name: "Gym & Fitness",
      facility: "Modern gym",
      achievements: "Certified trainers",
    },
  ];

  const events = [
    {
      name: "Annual TechFest",
      date: "March 20-22, 2025",
      footfall: "10,000+",
      description:
        "Largest tech festival with hackathons, competitions, celebrity talks",
      prize: "₹5 Lakh+ prizes",
    },
    {
      name: "Cultural Fest - Rhythms",
      date: "February 14-16, 2025",
      footfall: "15,000+",
      description:
        "3-day extravaganza with music, dance, fashion shows, and celebrity nights",
      prize: "₹3 Lakh+ prizes",
    },
    {
      name: "Sports Week",
      date: "January 10-17, 2025",
      footfall: "8,000+",
      description:
        "Inter-college sports competitions across 15+ sports disciplines",
      prize: "Trophies & medals",
    },
    {
      name: "Business Summit",
      date: "April 5-6, 2025",
      footfall: "5,000+",
      description:
        "Startup pitches, investor meets, industry leaders panel discussions",
      prize: "₹2 Lakh funding",
    },
  ];

  const hostelLife = [
    {
      title: "Modern Infrastructure",
      points: [
        "AC and Non-AC rooms available",
        "24/7 Wi-Fi connectivity",
        "Study rooms on every floor",
        "Recreation rooms with TV and games",
      ],
      icon: "🏢",
    },
    {
      title: "Food & Dining",
      points: [
        "Multi-cuisine mess facility",
        "Hygienic and nutritious meals",
        "24/7 cafeteria",
        "Special diet options available",
      ],
      icon: "🍽️",
    },
    {
      title: "Security & Safety",
      points: [
        "24/7 security guards",
        "CCTV surveillance",
        "Biometric access control",
        "Warden on-duty round the clock",
      ],
      icon: "🔒",
    },
    {
      title: "Amenities",
      points: [
        "Laundry services",
        "Medical room with nurse",
        "Gym and sports facilities",
        "Common areas for socializing",
      ],
      icon: "⭐",
    },
  ];

  const achievements = [
    {
      title: "Best Technical Fest",
      year: "2024",
      org: "National College Fest Awards",
    },
    {
      title: "Green Campus Award",
      year: "2023",
      org: "Ministry of Environment",
    },
    {
      title: "Best Sports Infrastructure",
      year: "2024",
      org: "University Sports Board",
    },
    {
      title: "Cultural Excellence Award",
      year: "2023",
      org: "State Cultural Department",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Campus Life</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Vibrant Campus Life</h1>
          <p className="text-xl opacity-90">
            Experience a dynamic blend of academics, culture, sports, and
            innovation
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-8 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-900">50+</div>
              <div className="text-gray-600 mt-2">Student Clubs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-900">200+</div>
              <div className="text-gray-600 mt-2">Annual Events</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-900">15,000+</div>
              <div className="text-gray-600 mt-2">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-900">40+</div>
              <div className="text-gray-600 mt-2">Sports Facilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Selection */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["clubs", "sports", "events", "hostel"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3 rounded-full font-semibold transition text-lg ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Clubs & Societies */}
        {selectedCategory === "clubs" && (
          <div>
            <h2 className="text-3xl font-bold text-purple-900 text-center mb-8">
              Student Clubs & Societies
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.map((club, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 border-t-4 border-purple-600"
                >
                  <div className="text-5xl mb-4 text-center">{club.icon}</div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2 text-center">
                    {club.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 text-center">
                    {club.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-purple-900">
                        {club.members}
                      </div>
                      <div className="text-xs text-gray-600">Members</div>
                    </div>
                    <div className="bg-pink-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-pink-900">
                        {club.events}
                      </div>
                      <div className="text-xs text-gray-600">Events</div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
                    Join Club
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sports */}
        {selectedCategory === "sports" && (
          <div>
            <h2 className="text-3xl font-bold text-purple-900 text-center mb-8">
              Sports & Athletics
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {sports.map((sport, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 flex items-start gap-4"
                >
                  <div className="text-4xl">🏆</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-900 mb-2">
                      {sport.name}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600">📍</span>
                        <span className="text-gray-700">{sport.facility}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600">✨</span>
                        <span className="text-gray-700">
                          {sport.achievements}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-purple-900 mb-6 text-center">
                Sports Achievements 2024
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-purple-900">15</div>
                  <div className="text-gray-600 mt-2">
                    Inter-college Trophies
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-900">50+</div>
                  <div className="text-gray-600 mt-2">Individual Medals</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-900">3</div>
                  <div className="text-gray-600 mt-2">
                    National Participations
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-900">100%</div>
                  <div className="text-gray-600 mt-2">Fitness Coverage</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Major Events */}
        {selectedCategory === "events" && (
          <div>
            <h2 className="text-3xl font-bold text-purple-900 text-center mb-8">
              Major Campus Events
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {events.map((event, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                    <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span>📅</span>
                      <span>{event.date}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">
                          Expected Footfall
                        </div>
                        <div className="text-xl font-bold text-purple-900">
                          {event.footfall}
                        </div>
                      </div>
                      <div className="bg-pink-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Prize Pool</div>
                        <div className="text-xl font-bold text-pink-900">
                          {event.prize}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-purple-900 mb-6 text-center">
                Campus Achievements & Recognition
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg"
                  >
                    <div className="text-4xl">🏆</div>
                    <div>
                      <div className="font-bold text-lg text-purple-900">
                        {ach.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {ach.org} - {ach.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hostel Life */}
        {selectedCategory === "hostel" && (
          <div>
            <h2 className="text-3xl font-bold text-purple-900 text-center mb-8">
              Hostel Life & Accommodation
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {hostelLife.map((section, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-600"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{section.icon}</div>
                    <h3 className="text-xl font-bold text-purple-900">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {section.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-purple-600 mt-1">✓</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-purple-900 mb-6 text-center">
                Hostel Statistics
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg text-center shadow">
                  <div className="text-3xl font-bold text-purple-900">
                    3,500
                  </div>
                  <div className="text-gray-600 mt-2">Total Capacity</div>
                </div>
                <div className="bg-white p-6 rounded-lg text-center shadow">
                  <div className="text-3xl font-bold text-purple-900">6</div>
                  <div className="text-gray-600 mt-2">Hostel Blocks</div>
                </div>
                <div className="bg-white p-6 rounded-lg text-center shadow">
                  <div className="text-3xl font-bold text-purple-900">24/7</div>
                  <div className="text-gray-600 mt-2">Security</div>
                </div>
                <div className="bg-white p-6 rounded-lg text-center shadow">
                  <div className="text-3xl font-bold text-purple-900">100%</div>
                  <div className="text-gray-600 mt-2">Wi-Fi Coverage</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Student Testimonials */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-purple-900 text-center mb-12">
            Student Experiences
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div>
                  <div className="font-bold">Rahul Sharma</div>
                  <div className="text-sm text-gray-600">
                    B.Tech CSE, Final Year
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm italic">
                "The campus life at BBIT is incredible! From tech clubs to
                sports, there's something for everyone. I've grown both
                academically and personally here."
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div>
                  <div className="font-bold">Priya Patel</div>
                  <div className="text-sm text-gray-600">MBA, 2nd Year</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm italic">
                "The cultural fest here is legendary! Being part of the
                organizing team taught me leadership and event management skills
                that no classroom could."
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <div className="font-bold">Amit Kumar</div>
                  <div className="text-sm text-gray-600">
                    B.Tech ECE, 3rd Year
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm italic">
                "The hostel facilities are top-notch. Living on campus has
                helped me build lifelong friendships and develop independence.
                It's truly a home away from home."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
