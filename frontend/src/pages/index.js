import useSWR from "swr";
import { useRef, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaPython,
  FaCompass,
  FaTelegramPlane,
  FaPinterestP,
  FaRedditAlien,
  FaSnapchatGhost,
  FaTiktok,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";

// Social icons SVG (simple inline for now)
const socialIcons = [
  {
    name: "Whatsapp",
    href: "#",
    icon: (
      <span className="flex items-center gap-1">
        <FaWhatsapp className="w-5 h-5" />
        <span>Whatsapp</span>
      </span>
    ),
  },
  {
    name: "Call",
    href: "tel:1800121288800",
    icon: (
      <span className="flex items-center gap-1">
        <FaPhoneAlt className="w-5 h-5" />
        <span>Call Us</span>
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

const upperNavLinks = [
  { name: "CAMPUSES", href: "#" },
  { name: "INTERNATIONAL", href: "#" },
  { name: "LIBRARY", href: "#" },
  { name: "STUDENT SERVICES", href: "#" },
  { name: "CAREER", href: "#" },
  { name: "CONTACT US", href: "#" },
];

const fetcher = (url) => fetch(url).then((r) => r.json());

const navLinks = [
  {
    name: "ABOUT",
    menu: [
      {
        title: "WHO WE ARE",
        links: [
          { name: "Overview", href: "#overview" },
          { name: "Our Identity", href: "#identity" },
          { name: "Vision & Mission", href: "#vision" },
          { name: "Leadership", href: "#leadership" },
          { name: "Core Values", href: "#values" },
          { name: "Recognition & Approvals", href: "#recognition" },
          { name: "Awards & Rankings", href: "#awards" },
          { name: "Social Responsibility", href: "#social" },
        ],
      },
      {
        title: "RELATED LINKS",
        links: [
          { name: "Institutes & Departments", href: "#institutes" },
          { name: "Admissions", href: "#admissions" },
          { name: "Scholarships", href: "#scholarships" },
          { name: "Hostel Facility", href: "#hostel" },
          { name: "Student Services", href: "#services" },
        ],
      },
    ],
  },
  { name: "PROGRAMS", menu: [] },
  { name: "ACADEMICS", menu: [] },
  { name: "ADMISSIONS", menu: [] },
  { name: "CAMPUS LIFE", menu: [] },
  { name: "PLACEMENTS", menu: [] },
  { name: "RESEARCH & INNOVATION", menu: [] },
];

function DropdownMenu({ link }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const buttonRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Open on hover (desktop) and click (all devices)
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="text-white hover:text-yellow-400 font-bold transition-colors uppercase tracking-wide px-4 py-2 rounded-md focus:outline-none text-[15px] shadow-sm hover:bg-blue-900/40 whitespace-nowrap min-w-max"
        style={{ letterSpacing: "0.04em" }}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
        onMouseEnter={() => setOpen(true)}
      >
        {link.name}
      </button>
      {link.menu && link.menu.length > 0 && open && (
        <div
          ref={menuRef}
          className="absolute left-0 top-full mt-2 min-w-[220px] max-w-[500px] bg-white rounded-xl shadow-2xl p-4 flex z-50 animate-fade-in border border-gray-200 gap-8"
          onMouseEnter={() => setOpen(true)}
        >
          {link.menu.map((col) => (
            <div
              key={col.title}
              className="flex-1 min-w-[140px] mr-4 last:mr-0"
            >
              <div className="font-bold text-blue-900 mb-2 text-[13px] tracking-wide uppercase">
                {col.title}
              </div>
              <ul>
                {col.links.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="block py-1 px-2 rounded text-gray-700 hover:text-blue-800 hover:bg-blue-50 text-[14px] font-medium transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(false);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 30);
          setScrollingUp(currentY < lastScrollY);
          setLastScrollY(currentY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const { data, error } = useSWR(apiBase + "/api/publications", fetcher);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Upper Bar with extra links and social icons */}
      <div className="bg-[#23272b] text-white text-xs w-full flex flex-col sm:flex-row items-center px-2 md:px-10 py-1 font-medium border-b border-gray-800">
        {/* Left: All nav buttons */}
        <div className="flex flex-wrap flex-1 items-center gap-2 md:gap-6 justify-start w-full sm:w-auto">
          {upperNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-2 py-1 rounded hover:bg-[#2d3237] transition font-semibold tracking-wide uppercase text-[13px]"
              style={{ letterSpacing: "0.04em" }}
            >
              {link.name}
            </a>
          ))}
        </div>
        {/* Right: Social links (call, whatsapp, etc) */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 justify-end w-full sm:w-auto mt-2 sm:mt-0">
          {socialIcons.map((item) => (
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
      {/* Top Info Bar */}
      <div className="bg-blue-900 text-white text-xs md:text-sm flex flex-col md:flex-row items-center justify-between px-2 md:px-8 py-1 font-medium w-full">
        <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-start">
          <span className="hidden md:inline">
            Register Now for BBIT Joint Campus Placement Programme
          </span>
          <button className="bg-yellow-400 text-blue-900 font-bold px-3 py-1 rounded ml-2 hover:bg-yellow-300 transition">
            REGISTER NOW
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-1 md:mt-0 w-full md:w-auto justify-center md:justify-end">
          <span className="font-semibold">Admission Helpline</span>
          <span className="bg-blue-700 px-2 py-1 rounded ml-1 font-bold tracking-wide">
            8420123333/9836888444
          </span>
        </div>
      </div>
      {/* Main Navigation Bar */}
      <header
        className={`shadow sticky top-0 z-40 transition-all duration-300 ${
          scrollingUp
            ? "bg-blue-900/60 backdrop-blur-md"
            : scrolled
            ? "bg-blue-900/90"
            : "bg-blue-800"
        }`}
        style={{
          boxSizing: "border-box",
          maxWidth: "100%",
          transition: "background 0.3s, backdrop-filter 0.3s",
        }}
      >
        <div
          className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-2 md:px-8 py-2 w-full"
          style={{ boxSizing: "border-box", maxWidth: "100%" }}
        >
          <div className="flex flex-row items-center gap-2 md:gap-3 min-w-0 w-full sm:w-auto justify-center sm:justify-start">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 md:gap-3 focus:outline-none bg-transparent border-0 p-0 m-0"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-label="Go to homepage"
            >
              <img
                src="/cropped_circle-image.png"
                alt="BBIT Logo"
                className="h-11 w-11 object-contain drop-shadow flex-shrink-0"
              />
              <span className="font-bold text-2xl text-white tracking-wide whitespace-nowrap flex-shrink-0">
                BBIT
              </span>
              <span className="text-white font-semibold text-sm md:text-base ml-1 md:ml-2 whitespace-nowrap">
                Research & Development
              </span>
            </button>
          </div>
          {/* Desktop Nav */}
          <nav
            className="hidden md:flex flex-wrap items-center justify-end w-full"
            style={{ maxWidth: "100%", boxSizing: "border-box" }}
          >
            <div
              className="flex flex-wrap items-center justify-end gap-2 md:gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-200 w-full pr-2"
              style={{ maxWidth: "100%", boxSizing: "border-box" }}
            >
              {navLinks.map((link, idx) => (
                <div
                  key={link.name}
                  className={idx === navLinks.length - 1 ? "last:mr-0" : ""}
                >
                  <DropdownMenu link={link} />
                </div>
              ))}
            </div>
          </nav>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:bg-blue-900/40 transition w-full sm:w-auto mt-2 sm:mt-0"
            onClick={() => setShowMobileMenu((v) => !v)}
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {showMobileMenu && (
          <nav className="md:hidden bg-blue-900/95 backdrop-blur-md px-4 py-4 flex flex-col gap-2 transition-all duration-300 rounded-b-xl shadow-lg w-full">
            {navLinks.map((link) => (
              <div key={link.name} className="mb-2 last:mb-0">
                <button
                  className="w-full text-left text-white font-bold uppercase tracking-wide px-4 py-2 rounded-md bg-blue-800/80 hover:bg-blue-900/80 transition flex justify-between items-center"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link.name}
                  {link.menu && link.menu.length > 0 && (
                    <span className="ml-2">▼</span>
                  )}
                </button>
                {/* Dropdown for mobile */}
                {link.menu && link.menu.length > 0 && (
                  <div className="pl-4 py-2">
                    {link.menu.map((col) => (
                      <div key={col.title} className="mb-2">
                        <div className="text-yellow-300 font-semibold text-xs mb-1 uppercase tracking-wide">
                          {col.title}
                        </div>
                        <ul>
                          {col.links.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className="block py-1 px-2 rounded text-white/90 hover:text-yellow-400 hover:bg-blue-700 text-sm font-medium transition-colors"
                                onClick={() => setShowMobileMenu(false)}
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </header>
      {/* Hero Section as Carousel */}
      <section
        className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white min-h-[250px] sm:min-h-[350px] flex flex-col sm:flex-row items-center justify-center overflow-hidden w-full"
        style={{ maxWidth: "100%", boxSizing: "border-box" }}
      >
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ maxWidth: "100%", boxSizing: "border-box" }}
        >
          <div
            className="flex transition-transform duration-700"
            style={{
              width: "400%",
              height: "100%",
              transform: `translateX(-${currentSlide * 100}%)`,
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-center relative min-w-0"
                style={{
                  background:
                    i === 0
                      ? `url(/event-slide-1.jpg) center/cover no-repeat`
                      : i === 1
                      ? `url(/campus-slide-2.jpg) center/cover no-repeat`
                      : i === 2
                      ? `url(/campus-slide-3.jpg) center/cover no-repeat`
                      : `url(/students-slide-4.jpg) center/cover no-repeat`,
                  minHeight: 350,
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                {/* Placeholder for video or image */}
                {/* Image/video placeholder removed as requested */}
                {/* Text overlay only on first slide for now */}
                {i === 0 && (
                  <div className="flex-1 text-center md:text-left z-10 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      Innovation &{" "}
                      <span className="text-yellow-400">Entrepreneurship</span>
                    </h1>
                    <p className="max-w-xl text-lg md:text-xl opacity-90 mb-6">
                      Firmly established as a rapidly rising hub of excellence
                      for innovation and entrepreneurship, BBIT actively
                      nurtures and empowers creative ideas across diverse
                      fields, transforming them into valuable and viable
                      business opportunities.
                    </p>
                    <a
                      href="#"
                      className="inline-block bg-yellow-400 text-blue-900 font-bold px-6 py-2 rounded shadow hover:bg-yellow-300 transition"
                    >
                      Read More
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Carousel controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full border-2 ${
                currentSlide === i
                  ? "bg-yellow-400 border-yellow-400"
                  : "bg-white/40 border-white"
              }`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
      {/* Highlights/Stats Section removed as requested */}
      {/* About Section */}
      <section className="max-w-4xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">
          About Research at BBIT
        </h2>
        <p className="text-gray-700 text-lg mb-4">
          BBIT fosters a vibrant research culture, encouraging faculty and
          students to pursue innovative projects across disciplines. Our R&D
          cell is dedicated to advancing knowledge, supporting startups, and
          collaborating with industry and academia for impactful outcomes.
        </p>
      </section>
      {/* Publications Section */}
      <section className="max-w-4xl mx-auto mt-12 px-4">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">
          Recent Publications
        </h2>
        {error && <div className="p-8">Failed to load</div>}
        {!data && <div className="p-8">Loading...</div>}
        {data && (
          <ul className="space-y-4">
            {data.map((pub) => (
              <li
                key={pub.id}
                className="p-6 bg-white rounded-lg shadow border-l-4 border-blue-700"
              >
                <div className="text-lg font-semibold text-blue-900">
                  {pub.title}
                </div>
                <div className="text-sm text-gray-600">
                  {pub.authors} — {pub.year}
                </div>
                <p className="mt-2 text-gray-700">
                  {pub.abstract?.slice(0, 250)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* News/Highlights Section */}
      <section className="max-w-4xl mx-auto mt-16 px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">
          Latest Research News
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col">
            <div className="font-semibold text-blue-800 mb-2">
              BBIT Startup Incubation
            </div>
            <p className="text-gray-700 flex-1">
              Our Technology Business Incubator supports student and faculty
              startups, providing mentorship and funding for innovative ideas.
            </p>
            <a
              href="#"
              className="mt-4 text-blue-700 font-semibold hover:underline"
            >
              Read More
            </a>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col">
            <div className="font-semibold text-blue-800 mb-2">
              Recent Patent Success
            </div>
            <p className="text-gray-700 flex-1">
              BBIT has recently filed multiple patents in the field of IoT and
              AI, showcasing our commitment to cutting-edge research.
            </p>
            <a
              href="#"
              className="mt-4 text-blue-700 font-semibold hover:underline"
            >
              Read More
            </a>
          </div>
        </div>
      </section>
      <Footer />
      <Chatbot />
    </div>
  );
}
