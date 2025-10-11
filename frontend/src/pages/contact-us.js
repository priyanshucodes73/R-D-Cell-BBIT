import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Contact Us</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl opacity-90">
            We're here to answer your questions and assist you
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              icon: "📞",
              title: "Call Us",
              content: "+91-11-2345-6789",
              subtext: "Mon-Sat: 9 AM - 6 PM",
            },
            {
              icon: "📧",
              title: "Email Us",
              content: "info@bbit.edu.in",
              subtext: "Response within 24 hours",
            },
            {
              icon: "📍",
              title: "Visit Us",
              content: "Sector 15, New Delhi",
              subtext: "Main Campus",
            },
            {
              icon: "💬",
              title: "Live Chat",
              content: "Chat with us now",
              subtext: "Available 24/7",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-blue-900 mb-2">{item.title}</h3>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {item.content}
              </div>
              <div className="text-sm text-gray-500">{item.subtext}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none"
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Subject *
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none"
                >
                  <option value="">Select a subject</option>
                  <option value="admissions">Admissions Inquiry</option>
                  <option value="academics">Academic Programs</option>
                  <option value="research">Research Collaboration</option>
                  <option value="placements">Placements & Recruitment</option>
                  <option value="infrastructure">
                    Campus & Infrastructure
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map & Address */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">
                Our Location
              </h3>
              <div className="aspect-video bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">🗺️</div>
                  <div className="text-lg">Interactive Map</div>
                  <div className="text-sm">(Google Maps integration)</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-blue-700 text-2xl">📍</span>
                  <div>
                    <div className="font-bold text-blue-900 mb-1">
                      Main Campus
                    </div>
                    <div className="text-gray-700">
                      Bhagwan Parshuram Institute of Technology
                      <br />
                      PSP-4, Sector 17, Rohini
                      <br />
                      New Delhi - 110089, India
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-700 text-2xl">🚇</span>
                  <div>
                    <div className="font-bold text-blue-900 mb-1">
                      Metro Access
                    </div>
                    <div className="text-gray-700">
                      Nearest Metro: Rithala Station (Red Line)
                      <br />
                      10 minutes walk from metro station
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 border-2 border-blue-900 text-blue-900 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                Get Directions
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
              <h4 className="font-bold text-blue-900 mb-4">Office Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Friday</span>
                  <span className="font-semibold text-blue-900">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Saturday</span>
                  <span className="font-semibold text-blue-900">
                    9:00 AM - 2:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sunday</span>
                  <span className="font-semibold text-red-600">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contact Information */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">
            Department-wise Contact
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                dept: "Admissions Office",
                icon: "🎓",
                email: "admissions@bbit.edu.in",
                phone: "+91-11-2345-6790",
                timing: "Mon-Sat: 9 AM - 5 PM",
              },
              {
                dept: "Academic Office",
                icon: "📚",
                email: "academics@bbit.edu.in",
                phone: "+91-11-2345-6791",
                timing: "Mon-Fri: 9 AM - 6 PM",
              },
              {
                dept: "Examination Cell",
                icon: "📝",
                email: "exams@bbit.edu.in",
                phone: "+91-11-2345-6792",
                timing: "Mon-Fri: 10 AM - 4 PM",
              },
              {
                dept: "Placement Cell",
                icon: "💼",
                email: "placements@bbit.edu.in",
                phone: "+91-11-2345-6793",
                timing: "Mon-Fri: 9 AM - 6 PM",
              },
              {
                dept: "R&D Cell",
                icon: "🔬",
                email: "research@bbit.edu.in",
                phone: "+91-11-2345-6794",
                timing: "Mon-Fri: 9 AM - 5 PM",
              },
              {
                dept: "International Office",
                icon: "🌍",
                email: "international@bbit.edu.in",
                phone: "+91-11-2345-6795",
                timing: "Mon-Fri: 10 AM - 5 PM",
              },
              {
                dept: "Student Services",
                icon: "🤝",
                email: "studentservices@bbit.edu.in",
                phone: "+91-11-2345-6796",
                timing: "Mon-Sat: 9 AM - 6 PM",
              },
              {
                dept: "IT Support",
                icon: "💻",
                email: "itsupport@bbit.edu.in",
                phone: "+91-11-2345-6797",
                timing: "Mon-Sat: 8 AM - 8 PM",
              },
              {
                dept: "Library",
                icon: "📖",
                email: "library@bbit.edu.in",
                phone: "+91-11-2345-6798",
                timing: "Mon-Sat: 8 AM - 10 PM",
              },
            ].map((dept, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
              >
                <div className="text-5xl mb-4 text-center">{dept.icon}</div>
                <h3 className="text-lg font-bold text-blue-900 mb-4 text-center">
                  {dept.dept}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">📧</span>
                    <span className="text-gray-700">{dept.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">📞</span>
                    <span className="text-gray-700">{dept.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">🕐</span>
                    <span className="text-gray-700">{dept.timing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media & Connect */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-8">
          Connect With Us
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Stay updated with our latest news, events, and announcements on social
          media
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              platform: "Facebook",
              icon: "📘",
              handle: "@BBITOfficial",
              color: "from-blue-500 to-blue-700",
            },
            {
              platform: "Twitter",
              icon: "🐦",
              handle: "@BBIT_Official",
              color: "from-sky-400 to-blue-500",
            },
            {
              platform: "LinkedIn",
              icon: "💼",
              handle: "BBIT College",
              color: "from-blue-600 to-blue-800",
            },
            {
              platform: "Instagram",
              icon: "📷",
              handle: "@bbit.official",
              color: "from-pink-500 to-purple-600",
            },
            {
              platform: "YouTube",
              icon: "▶️",
              handle: "BBIT Official",
              color: "from-red-500 to-red-700",
            },
            {
              platform: "WhatsApp",
              icon: "💚",
              handle: "+91-98765-43210",
              color: "from-green-400 to-green-600",
            },
          ].map((social, idx) => (
            <a
              key={idx}
              href="#"
              className={`bg-gradient-to-r ${social.color} text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 text-center min-w-[200px]`}
            >
              <div className="text-3xl mb-2">{social.icon}</div>
              <div className="font-bold text-lg">{social.platform}</div>
              <div className="text-sm opacity-90">{social.handle}</div>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What are the admission requirements?",
                a: "Admission requirements vary by program. Visit our Admissions page or contact admissions@bbit.edu.in for detailed information.",
              },
              {
                q: "How do I apply for scholarships?",
                a: "Scholarship applications are available through the student portal. Contact the Financial Aid office for eligibility criteria and deadlines.",
              },
              {
                q: "Can I schedule a campus tour?",
                a: "Yes! Contact us at +91-11-2345-6789 to schedule a guided campus tour. Virtual tours are also available.",
              },
              {
                q: "What is the student-faculty ratio?",
                a: "BBIT maintains a healthy student-faculty ratio of 15:1 to ensure personalized attention and quality education.",
              },
              {
                q: "Are hostel facilities available?",
                a: "Yes, we have separate hostel facilities for boys and girls with modern amenities. Contact Student Services for details.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-blue-900 mb-3 text-lg">
                  Q: {faq.q}
                </h3>
                <p className="text-gray-700">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="bg-gradient-to-r from-red-900 to-orange-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Emergency Contact</h2>
          <p className="text-lg mb-6">
            For urgent matters and emergencies, please contact:
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <div className="text-sm mb-2">Campus Security</div>
              <div className="text-2xl font-bold">+91-11-2345-6777</div>
            </div>
            <div>
              <div className="text-sm mb-2">Medical Emergency</div>
              <div className="text-2xl font-bold">+91-11-2345-6778</div>
            </div>
            <div>
              <div className="text-sm mb-2">24/7 Helpline</div>
              <div className="text-2xl font-bold">1800-121-BBIT</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
