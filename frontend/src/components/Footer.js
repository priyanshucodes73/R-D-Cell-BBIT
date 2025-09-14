import React from "react";

const footerLinks = [
  {
    title: "Apply Here",
    links: [
      "BBIT Admissions",
      "BBIT Education Loan",
      "How to Apply?",
      "BBIT Scholarship",
      "BBIT Admission Office",
      "BBIT Student Feedback",
      "BBIT Student Facilitation",
      "BBIT International Student Facilitation",
      "BBIT Alumni Membership",
      "eSanad",
      "Guinness World Records",
    ],
  },
  {
    title: "Learn Here",
    links: [
      "IQAC",
      "Organogram",
      "Other Committees",
      "Pay Fee Online",
      "BBIT Institutes",
      "Teaching Practices",
      "System of Evaluation",
      "BBIT Placements",
      "BBIT Edge",
      "QS Asia Rankings 2024",
      "NIRF Rankings 2025",
      "BBIT Unnao Campus",
    ],
  },
  {
    title: "Visit Here",
    links: [
      "RTI",
      "Grievance",
      "BBIT News",
      "BBIT Blog",
      "Alumni",
      "Maps",
      "Distance Calculator",
      "About Budge Budge",
      "QS World University Rankings",
      "ABET Accreditation",
      "QS World University Rankings by Subject 2025",
    ],
  },
  {
    title: "Live Here",
    links: [
      "BBIT Hostels",
      "BBIT Transport",
      "BBIT Sports",
      "Cultural Activities",
      "BBIT Student Welfare",
      "BBIT Libraries",
      "e-Samadhan",
      "Discipline & Student Conduct",
    ],
  },
  {
    title: "Others",
    links: [
      "Courses Fee Details",
      "Student Grievance Redressal Cell",
      "Ombudsperson",
      "Procedures And Policies",
      "PPCB Report",
      "Mandatory Disclosure",
      "Disclaimer",
      "UGC - Public Self Disclosure document",
      "e-SCR Report",
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
        <FaWhatsapp className="w-5 h-5" />
        <span className="ml-1 hidden sm:inline">Whatsapp</span>
      </span>
    ),
  },
  {
    name: "Call",
    href: "tel:1800121288800",
    icon: (
      <span className="flex items-center gap-1">
        <FaPhoneAlt className="w-5 h-5" />
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
        <FaCompass className="w-5 h-5 ml-1" />
      </span>
    ),
  },
  { name: "Facebook", href: "#", icon: <FaFacebookF className="w-5 h-5" /> },
  { name: "Twitter", href: "#", icon: <FaTwitter className="w-5 h-5" /> },
  { name: "LinkedIn", href: "#", icon: <FaLinkedinIn className="w-5 h-5" /> },
  { name: "Instagram", href: "#", icon: <FaInstagram className="w-5 h-5" /> },
  { name: "YouTube", href: "#", icon: <FaYoutube className="w-5 h-5" /> },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-10 pb-4 px-2 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {footerLinks.map((col) => (
          <div key={col.title}>
            <div className="text-lg font-semibold mb-3 text-cyan-400">
              {col.title}
            </div>
            <ul className="space-y-1">
              {col.links.map((link) => (
                <li key={link}>
                  <button className="text-left text-white/90 hover:text-yellow-400 transition-colors w-full">
                    {link}
                  </button>
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
            Nischintapur, Budge Budge, Kolkata-700137
            <br />
            West Bengal, India
            <br />
            <span className="text-cyan-400">Student Helpline No:</span>
            <br />
            8420123333/9836888444
            <br />
            <span className="text-cyan-400">Toll Free:</span>
            <br />
            1800 1212 88800
            <br />
            <span className="text-cyan-400">Email:</span>
            <br />
            admissions@bbitmail.in
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
  );
}
