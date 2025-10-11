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
