import React from "react";

const footerLinks = [
  {
    title: "Apply Here",
    links: [
      { name: "BBIT Admissions", href: "/admissions" },
      { name: "BBIT Education Loan", href: "/education-loan" },
      { name: "How to Apply?", href: "/how-to-apply" },
      { name: "BBIT Scholarship", href: "/scholarship" },
      { name: "BBIT Admission Office", href: "/admission-office" },
      { name: "BBIT Student Feedback", href: "/student-feedback" },
      { name: "BBIT Student Facilitation", href: "/student-services" },
      {
        name: "BBIT International Student Facilitation",
        href: "/international",
      },
      { name: "BBIT Alumni Membership", href: "/alumni" },
      { name: "eSanad", href: "/esanad" },
      { name: "Guinness World Records", href: "/guinness" },
    ],
  },
  {
    title: "Learn Here",
    links: [
      { name: "IQAC", href: "/iqac" },
      { name: "Organogram", href: "/organogram" },
      { name: "Other Committees", href: "/committees" },
      { name: "Pay Fee Online", href: "/pay-fee" },
      { name: "BBIT Institutes", href: "/institutes" },
      { name: "Teaching Practices", href: "/teaching-practices" },
      { name: "System of Evaluation", href: "/evaluation" },
      { name: "BBIT Placements", href: "/placements" },
      { name: "BBIT Edge", href: "/bbit-edge" },
      { name: "QS Asia Rankings 2024", href: "/qs-rankings" },
      { name: "NIRF Rankings 2025", href: "/nirf-rankings" },
      { name: "BBIT Unnao Campus", href: "/campuses" },
    ],
  },
  {
    title: "Visit Here",
    links: [
      { name: "RTI", href: "/rti" },
      { name: "Grievance", href: "/grievance" },
      { name: "BBIT News", href: "/news" },
      { name: "BBIT Blog", href: "/blog" },
      { name: "Alumni", href: "/alumni" },
      { name: "Maps", href: "/maps" },
      { name: "Distance Calculator", href: "/distance-calculator" },
      { name: "About Budge Budge", href: "/about-budge-budge" },
      { name: "QS World University Rankings", href: "/qs-world-rankings" },
      { name: "ABET Accreditation", href: "/abet" },
      {
        name: "QS World University Rankings by Subject 2025",
        href: "/qs-subject-rankings",
      },
    ],
  },
  {
    title: "Live Here",
    links: [
      { name: "BBIT Hostels", href: "/hostels" },
      { name: "BBIT Transport", href: "/transport" },
      { name: "BBIT Sports", href: "/sports" },
      { name: "Cultural Activities", href: "/cultural" },
      { name: "BBIT Student Welfare", href: "/student-welfare" },
      { name: "BBIT Libraries", href: "/library" },
      { name: "e-Samadhan", href: "/e-samadhan" },
      { name: "Discipline & Student Conduct", href: "/discipline" },
    ],
  },
  {
    title: "Others",
    links: [
      { name: "Courses Fee Details", href: "/fee-details" },
      { name: "Student Grievance Redressal Cell", href: "/grievance-cell" },
      { name: "Ombudsperson", href: "/ombudsperson" },
      { name: "Procedures And Policies", href: "/policies" },
      { name: "PPCB Report", href: "/ppcb-report" },
      { name: "Mandatory Disclosure", href: "/mandatory-disclosure" },
      { name: "Disclaimer", href: "/disclaimer" },
      {
        name: "UGC - Public Self Disclosure document",
        href: "/ugc-disclosure",
      },
      { name: "e-SCR Report", href: "/escr-report" },
    ],
  },
];

import {
  FaWhatsapp,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaCompass,
} from "react-icons/fa";

const footerSocialLinks = [
  {
    name: "Whatsapp",
    href: "#",
    icon: (
      <span className="flex items-center gap-1">
        <FaWhatsapp className="w-4 h-4" />
        <span className="ml-1 hidden sm:inline">Whatsapp</span>
      </span>
    ),
  },
  {
    name: "Call",
    href: "tel:1800121288800",
    icon: (
      <span className="flex items-center gap-1">
        <FaPhoneAlt className="w-4 h-4" />
        <span className="ml-1 hidden sm:inline">Call Us</span>
      </span>
    ),
  },
  {
    name: "360",
    href: "#",
    icon: (
      <span className="flex items-center gap-1">
        <span>360°</span>
        <FaCompass className="w-4 h-4 ml-1" />
      </span>
    ),
  },
  { name: "Facebook", href: "#", icon: <FaFacebookF className="w-4 h-4" /> },
  { name: "Twitter", href: "#", icon: <FaTwitter className="w-4 h-4" /> },
  { name: "LinkedIn", href: "#", icon: <FaLinkedinIn className="w-4 h-4" /> },
  { name: "Instagram", href: "#", icon: <FaInstagram className="w-4 h-4" /> },
  { name: "YouTube", href: "#", icon: <FaYoutube className="w-4 h-4" /> },
];

export default function Footer() {
  return (
    <>
      {/* R&D Cell Contact Section */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact R&D Cell */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                📞 Contact R&D Cell
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold mb-1">Address</p>
                    <p className="text-sm text-white/80">
                      BBIT Campus, Research & Development Block
                      <br />
                      Nischintapur, Budge Budge
                      <br />
                      Kolkata - 700 138
                      <br />
                      West Bengal, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a
                      href="mailto:research@bbit.edu.in"
                      className="text-sm text-yellow-400 hover:text-yellow-300"
                    >
                      research@bbit.edu.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <p className="text-sm text-white/80">033-2482-0641</p>
                    <p className="text-sm text-white/80">
                      8420123333 / 9836888444
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6">🔗 Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "Research Guidelines", href: "/research-guidelines" },
                  { name: "Ethics Committee", href: "/ethics-committee" },
                  { name: "IPR Policy", href: "/ipr-policy" },
                  { name: "Publication Support", href: "/publication-support" },
                  { name: "Research Funding", href: "/research-funding" },
                  {
                    name: "Collaboration Opportunities",
                    href: "/collaboration",
                  },
                ].map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-white/90 hover:text-yellow-400 transition-colors group"
                    >
                      <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6">📚 Resources</h3>
              <ul className="space-y-3">
                {[
                  { name: "Digital Library Access", href: "/library" },
                  {
                    name: "Research Tools & Software",
                    href: "/research-tools",
                  },
                  { name: "Grant Application Forms", href: "/grant-forms" },
                  { name: "Conference Calendar", href: "/conferences" },
                  { name: "Journal Access", href: "/journals" },
                  { name: "Research Blog", href: "/blog" },
                ].map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-white/90 hover:text-yellow-400 transition-colors group"
                    >
                      <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Additional Info Bar */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  150+
                </div>
                <div className="text-sm text-white/80">
                  Active Research Projects
                </div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  200+
                </div>
                <div className="text-sm text-white/80">
                  Research Publications
                </div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  50+
                </div>
                <div className="text-sm text-white/80">
                  Industry Collaborations
                </div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  ₹5Cr+
                </div>
                <div className="text-sm text-white/80">Research Funding</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-black text-white pt-10 pb-4 px-2 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {footerLinks.map((col) => (
            <div key={col.title}>
              <div className="text-lg font-semibold mb-3 text-cyan-400">
                {col.title}
              </div>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-left text-white/90 hover:text-yellow-400 transition-colors block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="text-lg font-semibold mb-3 text-cyan-400">
              Get in Touch
            </div>
            <div className="text-white/90 text-sm">
              Budge Budge Institute of Technology
              <br />
              Nischintapur, Budge Budge
              <br />
              Kolkata - 700 138, West Bengal, India
              <br />
              <span className="text-cyan-400">Phone:</span> 033-2482-0641
              <br />
              <span className="text-cyan-400">Student Helpline:</span>
              <br />
              8420123333 / 9836888444
              <br />
              <span className="text-cyan-400">Email:</span>
              <br />
              contact@bbit.edu.in
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-4 flex flex-wrap items-center justify-between text-xs text-white/70">
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-yellow-400 underline">
              NAAC
            </a>
            <a href="#" className="hover:text-yellow-400 underline">
              NIRF
            </a>
            <a href="#" className="hover:text-yellow-400 underline">
              NATS
            </a>
            <a href="#" className="hover:text-yellow-400 underline">
              Anti-Ragging Policy
            </a>
            <a href="#" className="hover:text-yellow-400 underline">
              National Ragging Prevention Programme
            </a>
          </div>
          <div className="flex gap-4 mt-2 md:mt-0">
            {footerSocialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-yellow-400 p-1 rounded-full transition"
                aria-label={item.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
