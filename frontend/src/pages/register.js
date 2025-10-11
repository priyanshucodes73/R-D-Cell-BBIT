import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function Register() {
  const [selectedType, setSelectedType] = useState("admission");
  const [formData, setFormData] = useState({
    // Common fields
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Admission fields
    program: "",
    category: "",
    previousEducation: "",
    // Placement fields
    rollNumber: "",
    branch: "",
    resumeFile: null,
    // Event fields
    eventName: "",
    participants: "1",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration submitted successfully for ${selectedType}!`);
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      program: "",
      category: "",
      previousEducation: "",
      rollNumber: "",
      branch: "",
      resumeFile: null,
      eventName: "",
      participants: "1",
    });
  };

  const registrationTypes = [
    {
      id: "admission",
      title: "Admission Registration",
      icon: "🎓",
      desc: "Register for undergraduate and postgraduate programs",
      color: "from-blue-500 to-blue-700",
    },
    {
      id: "placement",
      title: "Placement Registration",
      icon: "💼",
      desc: "Register for campus placements and recruitment drives",
      color: "from-green-500 to-green-700",
    },
    {
      id: "event",
      title: "Event Registration",
      icon: "🎉",
      desc: "Register for workshops, seminars, and college events",
      color: "from-purple-500 to-purple-700",
    },
    {
      id: "research",
      title: "Research Programs",
      icon: "🔬",
      desc: "Register for research projects and PhD programs",
      color: "from-orange-500 to-orange-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Registration</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Student Registration Portal
          </h1>
          <p className="text-xl opacity-90">
            Start your journey with BBIT - Register now for various programs and
            opportunities
          </p>
        </div>
      </section>

      {/* Registration Type Selection */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
          Select Registration Type
        </h2>
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {registrationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-6 rounded-xl shadow-lg transition transform hover:scale-105 text-center ${
                selectedType === type.id
                  ? `bg-gradient-to-br ${type.color} text-white shadow-2xl`
                  : "bg-white text-gray-700 hover:shadow-xl"
              }`}
            >
              <div className="text-5xl mb-3">{type.icon}</div>
              <h3 className="font-bold text-lg mb-2">{type.title}</h3>
              <p
                className={`text-sm ${
                  selectedType === type.id
                    ? "text-white opacity-90"
                    : "text-gray-600"
                }`}
              >
                {type.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div
            className={`bg-gradient-to-r ${
              registrationTypes.find((t) => t.id === selectedType)?.color
            } text-white p-8`}
          >
            <div className="flex items-center gap-4">
              <div className="text-6xl">
                {registrationTypes.find((t) => t.id === selectedType)?.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {registrationTypes.find((t) => t.id === selectedType)?.title}
                </h2>
                <p className="opacity-90">
                  {registrationTypes.find((t) => t.id === selectedType)?.desc}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Common Fields */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-blue-200 pb-2">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    placeholder="Enter last name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>
              </div>
            </div>

            {/* Admission Specific Fields */}
            {selectedType === "admission" && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-blue-200 pb-2">
                  Academic Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Program <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.program}
                      onChange={(e) =>
                        setFormData({ ...formData, program: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Select Program</option>
                      <option value="btech-cse">
                        B.Tech - Computer Science
                      </option>
                      <option value="btech-ece">
                        B.Tech - Electronics & Communication
                      </option>
                      <option value="btech-me">
                        B.Tech - Mechanical Engineering
                      </option>
                      <option value="btech-ce">
                        B.Tech - Civil Engineering
                      </option>
                      <option value="mba">MBA</option>
                      <option value="mca">MCA</option>
                      <option value="mtech">M.Tech</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Category <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Select Category</option>
                      <option value="general">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                      <option value="ews">EWS</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Previous Education <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.previousEducation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          previousEducation: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                      placeholder="e.g., Class 12 - 85% (2024)"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">
                    Documents Required:
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ Class 10 & 12 Marksheets</li>
                    <li>✓ Transfer Certificate</li>
                    <li>✓ Aadhaar Card</li>
                    <li>✓ Recent Photograph</li>
                    <li>✓ Category Certificate (if applicable)</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Placement Specific Fields */}
            {selectedType === "placement" && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-blue-200 pb-2">
                  Academic & Professional Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Roll Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.rollNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, rollNumber: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                      placeholder="Enter roll number"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Branch/Program <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.branch}
                      onChange={(e) =>
                        setFormData({ ...formData, branch: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Select Branch</option>
                      <option value="cse">
                        Computer Science & Engineering
                      </option>
                      <option value="ece">Electronics & Communication</option>
                      <option value="me">Mechanical Engineering</option>
                      <option value="ce">Civil Engineering</option>
                      <option value="mba">MBA</option>
                      <option value="mca">MCA</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Upload Resume <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          resumeFile: e.target.files[0],
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Upload PDF or DOC file (Max 5MB)
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-green-900 mb-2">
                    Benefits of Registration:
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ Access to 300+ recruiting companies</li>
                    <li>✓ Resume review and improvement sessions</li>
                    <li>✓ Mock interview opportunities</li>
                    <li>✓ Early notification of placement drives</li>
                    <li>✓ Career counseling and guidance</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Event Specific Fields */}
            {selectedType === "event" && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-blue-200 pb-2">
                  Event Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Select Event <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.eventName}
                      onChange={(e) =>
                        setFormData({ ...formData, eventName: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Select Event</option>
                      <option value="techfest">Annual TechFest 2025</option>
                      <option value="hackathon">48-Hour Hackathon</option>
                      <option value="research-symposium">
                        International Research Symposium
                      </option>
                      <option value="ai-workshop">AI & ML Workshop</option>
                      <option value="startup-summit">Startup Summit</option>
                      <option value="cultural-fest">Cultural Fest</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Number of Participants{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.participants}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          participants: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    >
                      <option value="1">1 (Individual)</option>
                      <option value="2">2 (Team)</option>
                      <option value="3">3 (Team)</option>
                      <option value="4">4 (Team)</option>
                      <option value="5">5+ (Team)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-bold text-purple-900 mb-2">
                    Upcoming Events:
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>• Annual TechFest 2025</span>
                      <span className="font-semibold">March 20-22, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• 48-Hour Hackathon</span>
                      <span className="font-semibold">April 5-7, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• International Research Symposium</span>
                      <span className="font-semibold">April 15, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Research Specific Fields */}
            {selectedType === "research" && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-blue-200 pb-2">
                  Research Program Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Program Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.program}
                      onChange={(e) =>
                        setFormData({ ...formData, program: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Select Program</option>
                      <option value="phd">PhD Program</option>
                      <option value="research-intern">
                        Research Internship
                      </option>
                      <option value="mtech-research">M.Tech (Research)</option>
                      <option value="collaborative-project">
                        Collaborative Research Project
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Research Area <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.branch}
                      onChange={(e) =>
                        setFormData({ ...formData, branch: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Select Area</option>
                      <option value="ai-ml">
                        Artificial Intelligence & Machine Learning
                      </option>
                      <option value="iot">Internet of Things</option>
                      <option value="blockchain">Blockchain Technology</option>
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="data-science">Data Science</option>
                      <option value="robotics">Robotics & Automation</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Previous Qualification{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.previousEducation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          previousEducation: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                      placeholder="e.g., M.Tech CSE - 8.5 CGPA (2023)"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-bold text-orange-900 mb-2">
                    Research Opportunities:
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ Funded PhD positions available</li>
                    <li>✓ Access to state-of-the-art research facilities</li>
                    <li>✓ International collaboration opportunities</li>
                    <li>✓ Mentorship by experienced faculty</li>
                    <li>✓ Publication support in top journals</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-5 h-5 text-blue-600"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  . I understand that the information provided will be used for
                  registration and communication purposes.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className={`flex-1 bg-gradient-to-r ${
                  registrationTypes.find((t) => t.id === selectedType)?.color
                } text-white py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition transform hover:scale-105`}
              >
                Submit Registration
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    program: "",
                    category: "",
                    previousEducation: "",
                    rollNumber: "",
                    branch: "",
                    resumeFile: null,
                    eventName: "",
                    participants: "1",
                  })
                }
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Help Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Need Help with Registration?
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Our admissions team is here to assist you throughout the
            registration process.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-2">📞</div>
              <div className="font-bold text-blue-900">Call Us</div>
              <div className="text-gray-700">8420123333 / 9836888444</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-2">📧</div>
              <div className="font-bold text-blue-900">Email Us</div>
              <div className="text-gray-700">admissions@bbit.edu.in</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-2">💬</div>
              <div className="font-bold text-blue-900">Live Chat</div>
              <div className="text-gray-700">Available 24/7</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
