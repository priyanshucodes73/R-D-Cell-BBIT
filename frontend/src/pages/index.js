import useSWR, { SWRConfig } from "swr";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import { fetcher, getApiBase, normalizeSiteSettings, defaultPublicSettings } from "../lib/siteSettings";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaRegBuilding,
  FaCalendarAlt,
  FaSearch,
  FaBars,
  FaTimes,
  FaFlask,
  FaLaptopCode,
  FaProjectDiagram,
  FaBook,
  FaUsers,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaGraduationCap,
  FaChartLine,
  FaAward,
  FaGlobe,
  FaLightbulb,
  FaRocket,
  FaMicroscope,
  FaUniversity,
  FaFileAlt,
  FaNewspaper,
  FaBuilding,
  FaCog,
  FaCircle,
  FaPlay,
  FaExternalLinkAlt,
  FaStar,
  FaSeedling,
  FaPhoneSquareAlt,
  FaSchool,
  FaHome,
  FaUserTie,
  FaClipboardList,
  FaHandshake,
  FaChevronLeft,
  FaChevronRight,
  FaCaretDown,
  FaCaretUp,
  FaInfoCircle,
  FaDownload,
} from "react-icons/fa";

const navLinks = [
  { name: "ABOUT", href: "/about", menu: [] },
  { name: "PROGRAMS", href: "/programs", menu: [] },
  { name: "ACADEMICS", href: "/academics", menu: [] },
  { name: "ADMISSIONS", href: "/register", menu: [] },
  { name: "CAMPUS LIFE", href: "/campus-life", menu: [] },
  { name: "CLUBS & GROUPS", href: "/clubs", menu: [] },
  { name: "PLACEMENTS", href: "/placements", menu: [] },
  { name: "RESEARCH & DEVELOPMENT", href: "/research-innovation", menu: [] },
];

function SocialIcon({ name }) {
  switch (name) {
    case "Whatsapp":
      return <FaWhatsapp />;
    case "Call":
      return <FaPhoneAlt />;
    case "Facebook":
      return <FaFacebookF />;
    case "Twitter":
      return <FaTwitter />;
    case "LinkedIn":
      return <FaLinkedinIn />;
    case "Instagram":
      return <FaInstagram />;
    case "YouTube":
      return <FaYoutube />;
    case "360":
      return <FaGlobe />;
    default:
      return <FaCircle />;
  }
}

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
  // If link has href and no menu, render as Link, otherwise as dropdown button
  if (link.href && (!link.menu || link.menu.length === 0)) {
    return (
      <Link href={link.href}>
        <span
          className="text-white hover:text-yellow-400 font-bold transition-colors uppercase tracking-wide px-2.5 py-2 rounded-md focus:outline-none text-[12px] shadow-sm hover:bg-blue-900/40 whitespace-nowrap cursor-pointer inline-block"
          style={{ letterSpacing: "0.03em" }}
        >
          {link.name}
        </span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="text-white hover:text-yellow-400 font-bold transition-colors uppercase tracking-wide px-2.5 py-2 rounded-md focus:outline-none text-[12px] shadow-sm hover:bg-blue-900/40 whitespace-nowrap"
        style={{ letterSpacing: "0.03em" }}
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

const homeTestimonials = [
  {
    quote: "The platform makes our college look like a serious institutional product. We can update evidence, publish pages, and prepare for accreditation from one dashboard.",
    name: "IQAC Coordinator",
    role: "Accreditation & Quality Assurance",
  },
  {
    quote: "Admissions, research, faculty, and accreditation content all feel connected. It is much more professional than a normal college website.",
    name: "Principal",
    role: "College Administration",
  },
  {
    quote: "The draft/publish workflow and ZIP export make the whole evidence process much easier for our team.",
    name: "Web Admin",
    role: "College Operations",
  },
];

function AnimatedCount({ value = 0, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = Number.isFinite(Number(value)) ? Number(value) : 0;
    const duration = 900;
    const start = performance.now();
    let rafId;

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [value]);

  return <span>{count}{suffix}</span>;
}

export default function Home({ fallback }) {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(false);
  const apiBase = getApiBase();
  const { data, error } = useSWR(apiBase + "/api/publications", fetcher);
  const { data: facultyData } = useSWR(apiBase + "/api/faculty", fetcher);
  const { data: projectsData } = useSWR(apiBase + "/api/projects", fetcher);
  const { data: newsData } = useSWR(apiBase + "/api/news-events", fetcher);
  // Try fetching featured items first for a better homepage
  const { data: featuredPubs } = useSWR(apiBase + "/api/publications?featured=true&limit=6", fetcher);
  const { data: allPubs } = useSWR(apiBase + "/api/publications?limit=6", fetcher);
  const { data: featuredProjects } = useSWR(apiBase + "/api/projects?featured=true&limit=6", fetcher);
  const { data: allProjects } = useSWR(apiBase + "/api/projects?limit=6", fetcher);
  const { data: siteSettingsData } = useSWR(apiBase + "/api/site-settings", fetcher, {
    refreshInterval: 1000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  const siteSettings = { ...defaultPublicSettings, ...normalizeSiteSettings(siteSettingsData) };
  const homePage = siteSettings.homePage || defaultPublicSettings.homePage;
  const pageContentHtml = homePage.pageContentHtml || "";

  if (pageContentHtml) {
    return (
      <SWRConfig value={{ fallback }}>
        <div className="min-h-screen bg-gray-50">
          <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
            <div className="max-w-6xl mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{homePage.heroTitle || siteSettings.heroTitle || "Homepage"}</h1>
              <p className="text-lg md:text-xl text-white/85 max-w-3xl">{homePage.heroSubtitle || siteSettings.heroSubtitle || ""}</p>
            </div>
          </section>
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: pageContentHtml }} />
            </div>
          </section>
          <Footer />
          <Chatbot />
        </div>
      </SWRConfig>
    );
  }

  const editableUpperNavLinks = Array.isArray(siteSettings.upperNavLinks) && siteSettings.upperNavLinks.length
    ? siteSettings.upperNavLinks
    : defaultPublicSettings.upperNavLinks;
  const editableSocialLinks = Array.isArray(siteSettings.socialLinks) && siteSettings.socialLinks.length
    ? siteSettings.socialLinks
    : defaultPublicSettings.socialLinks;
  const editableNavLinks = Array.isArray(siteSettings.mainNavLinks) && siteSettings.mainNavLinks.length
    ? siteSettings.mainNavLinks.map((link) => ({ ...link, menu: link.menu || [] }))
    : defaultPublicSettings.mainNavLinks.map((link) => ({ ...link, menu: [] }));
  const accreditationNavLink = { name: "ACCREDITATION", href: "/accreditation-intelligence", menu: [] };
  const navHasAccreditation = editableNavLinks.some((link) => link.href === accreditationNavLink.href || link.name === accreditationNavLink.name);
  const navLinksWithAccreditation = navHasAccreditation ? editableNavLinks : [...editableNavLinks, accreditationNavLink];
  const editableHeroSlides = Array.isArray(siteSettings.heroSlides) && siteSettings.heroSlides.length
    ? siteSettings.heroSlides
    : defaultPublicSettings.heroSlides;
  const researchInnovationPage = siteSettings.researchInnovationPage || defaultPublicSettings.researchInnovationPage;
  const displayedFaculty = Array.isArray(facultyData) ? facultyData.slice(0, 8) : [];
  const publications = Array.isArray(featuredPubs) && featuredPubs.length ? featuredPubs : (Array.isArray(allPubs) ? allPubs : (Array.isArray(data) ? data : []));
  const displayedPublications = Array.isArray(publications) ? publications.slice(0, 6) : [];
  const projects = Array.isArray(featuredProjects) && featuredProjects.length ? featuredProjects : (Array.isArray(allProjects) ? allProjects : (Array.isArray(projectsData) ? projectsData : []));
  const displayedProjects = Array.isArray(projects) ? projects.slice(0, 6) : [];

  const getFacultyInitials = (name = "") => {
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 0) return "F";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
  };
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdmin(Boolean(localStorage.getItem('adminToken')));
      const onStorage = () => setIsAdmin(Boolean(localStorage.getItem('adminToken')));
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    }
    return undefined;
  }, []);

  // Carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (editableHeroSlides.length || 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [editableHeroSlides.length]);

  const focusAreas = researchInnovationPage.focusAreas || researchInnovationPage.researchAreas || [];
  const partners = researchInnovationPage.partners || researchInnovationPage.industryPartners || [];
  const innovationPrograms = Array.isArray(researchInnovationPage.innovationPrograms) ? researchInnovationPage.innovationPrograms : [];
  const internalGrants = Array.isArray(researchInnovationPage.internalGrants) ? researchInnovationPage.internalGrants : [];
  const fundingSources = Array.isArray(researchInnovationPage.fundingSources) ? researchInnovationPage.fundingSources : [];
  const researchCenters = Array.isArray(researchInnovationPage.researchCenters) ? researchInnovationPage.researchCenters : [];
  const patents = Array.isArray(researchInnovationPage.patents) ? researchInnovationPage.patents : [];
  const liveMetrics = [
    { label: "Publications", value: Array.isArray(displayedPublications) ? displayedPublications.length : 0, suffix: "+" },
    { label: "Projects", value: Array.isArray(displayedProjects) ? displayedProjects.length : 0, suffix: "+" },
    { label: "Faculty", value: Array.isArray(displayedFaculty) ? displayedFaculty.length : 0, suffix: "+" },
    { label: "Patents", value: patents.length, suffix: "+" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % homeTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SWRConfig value={{ fallback }}>
      <div className="bg-gray-50 min-h-screen">
        <style jsx global>{`
          @keyframes adminPulseRing {
            0% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.45); }
            70% { box-shadow: 0 0 0 14px rgba(250, 204, 21, 0); }
            100% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0); }
          }
          .animate-admin-pulse-ring {
            animation: adminPulseRing 2.2s infinite;
          }
        `}</style>
        {/* Sticky CTA bar */}
        <div className="fixed bottom-4 left-1/2 z-50 hidden -translate-x-1/2 rounded-full border border-slate-800 bg-slate-950 px-3 py-2 text-white shadow-2xl lg:flex lg:items-center lg:gap-2">
          <Link href="/register">
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-blue-950 transition hover:bg-yellow-300 cursor-pointer">
              Apply Now <FaArrowRight />
            </span>
          </Link>
          <Link href="/accreditation-intelligence">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 cursor-pointer">
              Accreditation
            </span>
          </Link>
          <Link href="/contact-us">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 cursor-pointer">
              Request Demo
            </span>
          </Link>
        </div>

        {/* 1st Top Bar - Upper Bar with extra links and social icons - Desktop Only */}
        <div className="hidden lg:block bg-gradient-to-r from-[#1a1f24] via-[#23272b] to-[#1a1f24] text-white text-xs w-full shadow-md border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-3 md:px-8 py-2.5">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-0">
              {/* Left: Navigation Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-4 lg:gap-5">
                {editableUpperNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group relative px-3 py-1.5 rounded-md hover:bg-[#2d3539] transition-all duration-300 font-semibold tracking-wide uppercase text-[11px] md:text-[12px] hover:text-yellow-400 whitespace-nowrap"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                  </Link>
                ))}
              </div>

              {/* Right: Social Links (compact) */}
              <div className="flex items-center justify-center gap-2">
                <Link href="/download-app">
                  <a
                    className="group inline-flex items-center gap-2 px-2 py-1 rounded-md bg-yellow-400 text-blue-950 font-semibold text-xs hover:bg-yellow-300 transition-all duration-200"
                    aria-label="Download App"
                  >
                    <span className="inline-flex items-center justify-center w-4 h-4">
                      <FaDownload />
                    </span>
                    <span className="hidden sm:inline text-xs">Download</span>
                  </a>
                </Link>

                {editableSocialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group inline-flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[#2d3539] transition-all duration-200 text-white text-xs"
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="inline-flex items-center justify-center w-4 h-4">
                      <SocialIcon name={item.name} />
                    </span>
                    {/* Small label shown on sm+ screens only */}
                    {item.name === "360" ? <span className="hidden sm:inline">360°</span> : null}
                    {item.name === "Whatsapp" ? <span className="hidden sm:inline">Whatsapp</span> : null}
                    {item.name === "Call" ? <span className="hidden sm:inline">Call</span> : null}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2nd Top Bar - Info Bar with Registration - Desktop Only */}
        <div className="hidden lg:block bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg border-b border-blue-700">
          <div className="max-w-7xl mx-auto px-3 md:px-8 py-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Left: Registration Info */}
              <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 w-full md:w-auto justify-center md:justify-start">
                <span className="text-center sm:text-left text-xs md:text-sm font-medium px-2 py-1 bg-blue-800/50 rounded-md backdrop-blur-sm">
                  {siteSettings.topAnnouncement}
                </span>
                <Link href="/register">
                  <span className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold px-5 py-2 rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 cursor-pointer inline-block shadow-md hover:shadow-xl transform hover:-translate-y-0.5 text-sm whitespace-nowrap">
                    <span className="relative z-10 flex items-center gap-2">
                      REGISTER NOW
                      <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </span>
                </Link>
              </div>

              {/* Right: Helpline */}
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 md:gap-3 w-full md:w-auto">
                <span className="font-semibold text-xs md:text-sm flex items-center gap-2 bg-blue-800/50 px-3 py-1.5 rounded-md backdrop-blur-sm">
                  <FaPhoneAlt className="w-3 h-3 animate-pulse" />
                  Admission Helpline
                </span>
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-1.5 rounded-lg font-bold tracking-wide text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-blue-500/30">
                  {siteSettings.admissionHelpline}
                </span>
                <Link href="/admin/login">
                  <span className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-yellow-300/60 bg-gradient-to-br from-yellow-300 to-yellow-500 text-blue-950 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-yellow-400/30 animate-admin-pulse-ring cursor-pointer" aria-label="Admin login">
                    <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-white/25 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"></span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* 3rd Top Bar - Main Navigation Bar */}
        <header
          className={`shadow-lg sticky top-0 z-40 transition-all duration-500 border-b border-blue-700/30 ${scrollingUp
            ? "bg-gradient-to-r from-blue-900/70 via-blue-800/70 to-blue-900/70 backdrop-blur-lg"
            : scrolled
              ? "bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-blue-900/95 backdrop-blur-md"
              : "bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900"
            }`}
          style={{
            boxSizing: "border-box",
            maxWidth: "100%",
            transition: "all 0.5s ease-in-out",
          }}
        >
          <div className="max-w-7xl mx-auto px-3 md:px-8">
            <div className="flex items-center justify-between py-3 md:py-4">
              {/* Logo Section */}
              <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-shrink-0">
                <button
                  onClick={() => window.location.reload()}
                  className="group flex items-center gap-2 md:gap-3 focus:outline-none bg-transparent border-0 p-0 m-0 hover:scale-105 transition-transform duration-300"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  aria-label="Go to homepage"
                >
                  <div className="relative">
                    <img
                      src="/icons/bbit-logo-circle.svg"
                      alt="BBIT Logo"
                      className="h-12 w-12 md:h-14 md:w-14 object-contain drop-shadow-xl flex-shrink-0 group-hover:drop-shadow-2xl transition-all duration-300 rounded-full"
                    />
                    <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/20 rounded-full blur-xl transition-all duration-300"></div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-extrabold text-2xl md:text-3xl text-white tracking-wider whitespace-nowrap flex-shrink-0 group-hover:text-yellow-400 transition-colors duration-300">
                      {siteSettings.siteName}
                    </span>
                    <span className="text-white/90 font-semibold text-[10px] md:text-xs whitespace-nowrap -mt-1 tracking-wide group-hover:text-yellow-300 transition-colors duration-300">
                      Research & Development
                    </span>
                  </div>
                </button>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center flex-1 justify-end">
                <div className="flex items-center gap-0.5 xl:gap-1">
                  {navLinksWithAccreditation.map((link) => (
                    <div key={link.name}>
                      <DropdownMenu link={link} />
                    </div>
                  ))}


                </div>
              </nav>

              {/* Mobile Menu Button & Login */}
              <div className="lg:hidden flex items-center gap-3">
                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden relative group flex items-center justify-center p-2.5 border-2 rounded-lg text-white border-white/30 hover:border-yellow-400 hover:bg-blue-900/50 transition-all duration-300 backdrop-blur-sm"
                  onClick={() => setShowMobileMenu((v) => !v)}
                  aria-label="Toggle menu"
                >
                  <div className="flex flex-col gap-1.5">
                    <span
                      className={`block h-0.5 w-6 bg-white transition-all duration-300 ${showMobileMenu ? "rotate-45 translate-y-2" : ""
                        }`}
                    ></span>
                    <span
                      className={`block h-0.5 w-6 bg-white transition-all duration-300 ${showMobileMenu ? "opacity-0" : ""
                        }`}
                    ></span>
                    <span
                      className={`block h-0.5 w-6 bg-white transition-all duration-300 ${showMobileMenu ? "-rotate-45 -translate-y-2" : ""
                        }`}
                    ></span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/20 group-hover:to-orange-400/20 rounded-lg transition-all duration-300"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <nav className="lg:hidden bg-gradient-to-b from-blue-900/98 via-blue-800/98 to-blue-900/98 backdrop-blur-xl border-t border-blue-700/50 shadow-2xl animate-fade-in">
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col gap-2">
                  {/* Admin login quick link (only when not signed in) */}
                  {!isAdmin && (
                    <div className="mb-3">
                      <Link href="/admin/login">
                        <a className="group relative w-full block text-left text-white font-bold uppercase tracking-wide px-5 py-3.5 rounded-xl bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 hover:from-yellow-500/30 hover:to-yellow-400/20 transition-all duration-300 cursor-pointer border border-yellow-300/20" onClick={() => setShowMobileMenu(false)}>
                          <span className="relative z-10 flex items-center justify-between">
                            <span className="text-sm flex items-center gap-2"><FaUserTie className="w-4 h-4 text-yellow-300" /> Admin Login</span>
                            <span className="text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                          </span>
                        </a>
                      </Link>
                    </div>
                  )}
                  {/* Mobile Download CTA */}
                  <div className="mb-3">
                    <Link href="/download-app">
                      <a className="group relative w-full block text-left text-white font-bold uppercase tracking-wide px-5 py-3.5 rounded-xl bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 hover:from-yellow-500/30 hover:to-yellow-400/20 transition-all duration-300 cursor-pointer border border-yellow-300/20" onClick={() => setShowMobileMenu(false)}>
                        <span className="relative z-10 flex items-center justify-between">
                          <span className="text-sm flex items-center gap-2"><FaDownload className="w-4 h-4 text-yellow-300" /> Download App</span>
                          <span className="text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                        </span>
                      </a>
                    </Link>
                  </div>
                  {navLinksWithAccreditation.map((link, index) => (
                    <div
                      key={link.name}
                      className="animate-slide-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {link.href && (!link.menu || link.menu.length === 0) ? (
                        <Link href={link.href}>
                          <span
                            className="group relative w-full block text-left text-white font-bold uppercase tracking-wide px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-800/60 to-blue-700/60 hover:from-blue-700/80 hover:to-blue-600/80 transition-all duration-300 cursor-pointer border border-blue-600/30 hover:border-yellow-400/50 overflow-hidden"
                            onClick={() => setShowMobileMenu(false)}
                          >
                            <span className="relative z-10 flex items-center justify-between">
                              <span className="text-sm">{link.name}</span>
                              <span className="text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                                →
                              </span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/30 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </span>
                        </Link>
                      ) : (
                        <>
                          <button
                            className="group relative w-full text-left text-white font-bold uppercase tracking-wide px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-800/60 to-blue-700/60 hover:from-blue-700/80 hover:to-blue-600/80 transition-all duration-300 flex justify-between items-center border border-blue-600/30 hover:border-yellow-400/50 overflow-hidden"
                            onClick={() => setShowMobileMenu(false)}
                          >
                            <span className="relative z-10 text-sm">
                              {link.name}
                            </span>
                            {link.menu && link.menu.length > 0 && (
                              <span className="relative z-10 ml-2 text-yellow-400 group-hover:rotate-180 transition-transform duration-300">
                                ▼
                              </span>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/30 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </button>
                          {/* Dropdown for mobile */}
                          {link.menu && link.menu.length > 0 && (
                            <div className="pl-4 py-2 mt-2 space-y-2">
                              {link.menu.map((col) => (
                                <div
                                  key={col.title}
                                  className="bg-blue-800/30 rounded-lg p-3 backdrop-blur-sm border border-blue-600/20"
                                >
                                  <div className="text-yellow-400 font-bold text-xs mb-2 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                                    {col.title}
                                  </div>
                                  <ul className="space-y-1">
                                    {col.links.map((item) => (
                                      <li key={item.name}>
                                        <a
                                          href={item.href}
                                          className="group flex items-center gap-2 py-2 px-3 rounded-lg text-white/90 hover:text-yellow-400 hover:bg-blue-700/50 text-sm font-medium transition-all duration-300 border border-transparent hover:border-blue-600/30"
                                          onClick={() => setShowMobileMenu(false)}
                                        >
                                          <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:bg-yellow-400 transition-colors duration-300"></span>
                                          {item.name}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </nav>
          )}
        </header>
        {/* Hero Section as Carousel */}
        <section
          className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex flex-col sm:flex-row items-center justify-center overflow-hidden w-full"
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
              {editableHeroSlides.map((slide, i) => (
                <div
                  key={i}
                  className="w-full h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-center relative min-w-0"
                  style={{
                    background: `url(${slide.image}) center/cover no-repeat`,
                    minHeight: 700,
                    maxWidth: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  {/* Dark overlay for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-0"></div>

                  {/* Text overlay only on first slide for now */}
                  {i === 0 && (
                    <div className="flex-1 text-center md:text-left z-10 px-4 relative">
                      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-2xl">
                        {slide.title}
                      </h1>
                      <p className="max-w-xl text-lg md:text-xl mb-6 text-white drop-shadow-lg">
                        {slide.subtitle}
                      </p>
                      <Link href={slide.ctaHref}>
                        <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-lg shadow-xl hover:bg-yellow-300 transition transform hover:scale-105 cursor-pointer">
                          {slide.ctaLabel}
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Carousel controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {editableHeroSlides.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full border-2 ${currentSlide === i
                  ? "bg-yellow-400 border-yellow-400"
                  : "bg-white/40 border-white"
                  }`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Accreditation Intelligence Section removed per request */}

        {/* BBIT Achievements Banner */}
        <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-16 mt-0">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {(Array.isArray(researchInnovationPage.researchStats) && researchInnovationPage.researchStats.length
                ? researchInnovationPage.researchStats
                : (defaultPublicSettings.researchInnovationPage && defaultPublicSettings.researchInnovationPage.researchStats) || [])
                .slice(0, 4)
                .map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-5xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                    <div className="text-lg opacity-90">{stat.label}</div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Live Institutional Metrics */}
        <section className="max-w-6xl mx-auto mt-16 px-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {liveMetrics.map((metric) => (
              <div key={metric.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Live metric</p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-950">
                      <AnimatedCount value={metric.value} suffix={metric.suffix} />
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{metric.label}</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 opacity-90" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accreditation Readiness Strip */}
        <section className="max-w-6xl mx-auto mt-16 px-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-700">Accreditation readiness</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">Real-time progress across NAAC and NBA criteria</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                  Show colleges a believable, interactive view of what is complete, what is pending, and what evidence is ready to export.
                </p>
              </div>
              <Link href="/accreditation-intelligence">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 cursor-pointer">
                  Explore accreditation features <FaArrowRight />
                </span>
              </Link>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {[
                { name: "Institutional vision", value: 92 },
                { name: "Research evidence", value: 84 },
                { name: "Student support", value: 76 },
              ].map((item) => (
                <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                    <span>{item.name}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-6xl mx-auto mt-20 px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-blue-900">
              {siteSettings.aboutTitle}
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                {siteSettings.aboutBody}
              </p>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                As a NAAC-accredited and MAKAUT-affiliated institution, we
                maintain strong industry tie-ups for student training and research
                collaboration. Our modern infrastructure includes well-equipped
                laboratories, spacious multimedia classrooms, and dedicated
                research facilities that enable cutting-edge work in technology
                and engineering.
              </p>
              <div className="flex gap-4 mt-6">
                <Link href="/explore-research">
                  <span className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 cursor-pointer inline-block">
                    Explore Research
                  </span>
                </Link>
                <Link href="/join-our-team">
                  <span className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 cursor-pointer inline-block">
                    Join Our Team
                  </span>
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 mb-6">
                To be recognized as a premier research institution fostering
                innovation, entrepreneurship, and sustainable development through
                cutting-edge research and industry collaboration.
              </p>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700">
                To create an ecosystem that nurtures research excellence, promotes
                interdisciplinary collaboration, and transforms innovative ideas
                into tangible solutions for societal benefit.
              </p>
            </div>
          </div>
        </section>

        {/* Research Focus Areas */}
        <section className="bg-gray-50 py-20 mt-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-blue-900">
                Research Focus Areas
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                {researchInnovationPage.focusSubtitle || "Our research spans multiple domains addressing real problems."}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {focusAreas.length > 0 ? (
                focusAreas.map((area, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                    <div className="text-5xl mb-4 text-center">{area.icon || "🔬"}</div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3 text-center">{area.title}</h3>
                    <p className="text-gray-600 text-center">{area.description || area.desc}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-600 italic">No research focus areas published yet. Please add them from the admin panel.</div>
              )}
            </div>
          </div>
        </section>

        {/* Ongoing Projects */}
        <section className="max-w-6xl mx-auto mt-20 px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-blue-900">
              Ongoing Research Projects
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {Array.isArray(displayedProjects) && displayedProjects.length > 0 ? (
              displayedProjects.map((project, idx) => (
                <div
                  key={project.id || idx}
                  className="bg-white border-l-4 border-blue-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-blue-900 flex-1">
                      {project.title || project.name}
                    </h3>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {project.status || (project.featured ? 'Active' : '')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Principal Investigator:</strong> {project.principalInvestigator || project.pi || project.lead}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Funding:</strong> {project.funding || project.fundingAgency || ''} |{" "}
                    <strong>Duration:</strong> {project.duration || ''}
                  </div>
                  <p className="text-gray-700 mt-3">{project.description || project.desc || project.summary}</p>
                  <Link href={`/projects/${project.id || project.slug || ''}`}>
                    <span className="text-blue-700 font-semibold hover:underline mt-4 inline-block">View Details →</span>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-600 italic">No projects published yet. Please add them via the admin panel.</div>
            )}
          </div>
          <div className="text-center mt-8">
            <Link href="/all-projects">
              <span className="inline-block bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition cursor-pointer">
                View All Projects
              </span>
            </Link>
          </div>
        </section>
        {/* Faculty Researchers */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 mt-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-blue-900">Leading Faculty Researchers</h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {Array.isArray(displayedFaculty) && displayedFaculty.length > 0 ? (
                displayedFaculty.map((faculty, idx) => (
                  <div key={faculty.id || idx} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition transform hover:-translate-y-2">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      {getFacultyInitials(faculty.name || faculty.fullName || '')}
                    </div>
                    <h3 className="text-lg font-bold text-blue-900 mb-1">{faculty.name || faculty.fullName}</h3>
                    <div className="text-sm text-gray-600 mb-2">{faculty.department || faculty.dept}</div>
                    <div className="text-sm text-blue-700 font-semibold mb-2">{faculty.researchInterests || faculty.field}</div>
                    <div className="text-xs text-gray-500">{faculty.publications || faculty.pubs || faculty.publications_count || 0} Publications</div>
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center text-gray-600 italic">No faculty researchers listed yet. Add faculty from the admin panel.</div>
              )}
            </div>
          </div>
        </section>

        {/* Student Innovation Hub */}
        <section className="max-w-6xl mx-auto mt-20 px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-blue-900">Student Innovation & Startups</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">Empowering students to transform innovative ideas into successful ventures through our Technology Business Incubator and Innovation Lab.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Startup Incubator</h3>
              <p className="text-gray-700 mb-4">Pre-incubation and incubation support with mentorship, seed funding, and workspace for student startups.</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Mentorship by Industry Experts</li>
                <li>✓ Seed Funding up to ₹10 Lakhs</li>
                <li>✓ Co-working Space & Resources</li>
                <li>✓ Legal & Accounting Support</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Innovation Lab</h3>
              <p className="text-gray-700 mb-4">State-of-the-art makerspaces equipped with 3D printers, electronics kits, and prototyping tools.</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ 3D Printing & Rapid Prototyping</li>
                <li>✓ Software Development Tools</li>
                <li>✓ 24/7 Access for Registered Members</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">
                Hackathons & Competitions
              </h3>
              <p className="text-gray-700 mb-4">
                Regular hackathons, innovation challenges, and competitions with
                prizes and recognition.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Annual Innovation Challenge</li>
                <li>✓ National Level Hackathons</li>
                <li>✓ Industry-Sponsored Competitions</li>
                <li>✓ International Collaboration Events</li>
              </ul>
            </div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">
              Recent Student Startups
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {Array.isArray(displayedProjects) && displayedProjects.length > 0 ? (
                displayedProjects.map((startup, idx) => (
                  <div key={startup.id || idx} className="border-l-4 border-yellow-400 pl-4">
                    <h4 className="text-lg font-bold text-blue-900">{startup.title || startup.name}</h4>
                    <div className="text-sm text-gray-600 mb-2">Founded by: {startup.principalInvestigator || startup.pi || startup.founders}</div>
                    <p className="text-gray-700 text-sm mb-2">{startup.description || startup.desc}</p>
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">{startup.fundingAgency || startup.funding}</span>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center text-gray-600 italic">No startups listed yet. Add project startups from admin panel.</div>
              )}
            </div>
          </div>
        </section>

        {/* Research Facilities */}
        <section className="bg-gray-900 text-white py-20 mt-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                {researchInnovationPage.heroTitle || "World-Class Research Facilities"}
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {researchCenters.length > 0 ? (
                researchCenters.map((facility, idx) => (
                  <div
                    key={facility.name || idx}
                    className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition"
                  >
                    <div className="text-5xl mb-3">{facility.icon || "🔬"}</div>
                    <h3 className="text-lg font-bold mb-2">{facility.name}</h3>
                    <p className="text-sm text-gray-400">{facility.focus || facility.desc}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center text-gray-200 italic">No research facilities listed yet. Add them via the admin panel.</div>
              )}
            </div>
          </div>
        </section>

        {/* Patents & IP */}
        <section className="max-w-6xl mx-auto mt-20 px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-blue-900">
              {researchInnovationPage.patentsTitle || "Patents & Intellectual Property"}
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-900 mb-2">{researchInnovationPage.patentsFiled || "25+"}</div>
              <div className="text-xl text-gray-700">Patents Filed</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-900 mb-2">{researchInnovationPage.patentsGranted || "12"}</div>
              <div className="text-xl text-gray-700">Patents Granted</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-900 mb-2">{researchInnovationPage.copyrightsRegistered || "8"}</div>
              <div className="text-xl text-gray-700">Copyrights Registered</div>
            </div>
          </div>
          <div className="mt-12 bg-blue-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">
              {researchInnovationPage.recentPatentsTitle || "Recent Patents"}
            </h3>
            <div className="space-y-4">
              {patents.length > 0 ? (
                patents.map((patent, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white p-4 rounded-lg"
                  >
                    <div className="text-yellow-500 text-xl">📜</div>
                    <div className="text-gray-700">
                      {typeof patent === "string" ? patent : `${patent.title || patent.name} - ${patent.number || patent.patentNumber || ""}`}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-700 italic">No patents listed yet. Add recent patents via the admin panel.</div>
              )}
            </div>
          </div>
        </section>

        {/* Industry Collaborations */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 mt-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Industry Collaborations & Partnerships
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
              <p className="text-lg opacity-90 max-w-3xl mx-auto">
                Collaborating with leading companies and research institutions to
                drive innovation and create industry-ready solutions.
              </p>
            </div>
            <div className="grid md:grid-cols-5 gap-6 mb-12">
              {partners.length > 0 ? (
                partners.map((company, idx) => (
                  <div
                    key={company.name || idx}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center font-bold text-xl hover:bg-white/20 transition"
                  >
                    {company.name || company}
                  </div>
                ))
              ) : (
                <div className="col-span-5 text-center italic text-white/90">No industry partners listed yet.</div>
              )}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {innovationPrograms.length > 0 ? (
                innovationPrograms.slice(0, 3).map((program, idx) => (
                  <div key={program.name || idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-3">{program.name}</h3>
                    <p className="text-sm opacity-90">{program.description || program.focus}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center italic text-white/90">No innovation programs defined yet.</div>
              )}
            </div>
          </div>
        </section>

        {/* Funding Opportunities */}
        <section className="max-w-6xl mx-auto mt-20 px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-blue-900">
              Research Funding & Grants
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Internal Grants
              </h3>
              {internalGrants.length > 0 ? (
                <ul className="space-y-3">
                  {internalGrants.map((grant, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center bg-white p-4 rounded-lg"
                    >
                      <span className="text-gray-700 font-semibold">
                        {grant.title}
                      </span>
                      <span className="text-blue-700 font-bold">
                        {grant.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-700 italic">No internal grants configured yet.</div>
              )}
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                External Funding Sources
              </h3>
              {fundingSources.length > 0 ? (
                <ul className="space-y-3 text-gray-700">
                  {fundingSources.map((source, idx) => (
                    <li key={source.name || idx} className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <div>
                        <strong>{source.name}:</strong> {source.amount || `${source.projects || 0} projects`}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-700 italic">No external funding sources listed yet.</div>
              )}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section className="max-w-6xl mx-auto mt-20 px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-blue-900">
              Recent Publications
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          </div>
          <div className="space-y-6">
            {Array.isArray(displayedPublications) && displayedPublications.length > 0 ? (
              displayedPublications.slice(0, 3).map((pub) => {
                const citations = pub.citation_count ?? pub.citations ?? 0;
                const impact = pub.impactFactor || pub.impact;
                return (
                  <div
                    key={pub.id || pub.title}
                    className="p-8 bg-white rounded-xl shadow-lg border-l-4 border-blue-700 hover:shadow-2xl transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-blue-900 flex-1 pr-4">
                        {pub.title}
                      </h3>
                      <div className="flex gap-2 flex-shrink-0">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                          {pub.type || "Publication"}
                        </span>
                        {impact ? (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">IF: {impact}</span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">Citations: {citations}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>Authors:</strong> {pub.authors}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      <strong>Journal:</strong> {pub.journal} | <strong>Year:</strong> {pub.year}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {pub.abstract}
                    </p>
                    <Link href="/all-publications">
                      <span className="text-blue-700 font-semibold hover:underline cursor-pointer">Read Full Paper →</span>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-600 italic">No publications found. Add publications via the admin panel.</div>
            )}
          </div>
          <div className="text-center mt-8">
            <Link href="/all-publications">
              <span className="inline-block bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition cursor-pointer">
                View All Publications
              </span>
            </Link>
          </div>
        </section>
        {/* News & Events Section */}
        <section className="bg-gradient-to-br from-yellow-50 to-orange-50 py-20 mt-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-blue-900">
                Latest News & Events
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            </div>
            {Array.isArray(newsData) && newsData.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {newsData.slice(0, 6).map((news, idx) => (
                  <div
                    key={news.id || idx}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
                      <div className="text-4xl text-center mb-2">{news.image}</div>
                      <div className="text-xs text-center opacity-90">{news.date || news.publishedAt}</div>
                    </div>
                    <div className="p-6">
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        {news.category || news.type}
                      </span>
                      <h3 className="text-lg font-bold text-blue-900 mb-3">
                        {news.title}
                      </h3>
                      <p className="text-gray-700 text-sm mb-4">{news.summary || news.description || news.desc || news.body}</p>
                      <a
                        href="#"
                        className="text-blue-700 font-semibold hover:underline text-sm"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-700 italic">No news or events published yet.</div>
            )}
            <div className="text-center mt-12">
              <Link href="/all-news-events">
                <span className="inline-block bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition cursor-pointer">
                  View All News & Events
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials & Demo CTA */}
        <section className="max-w-6xl mx-auto mt-20 px-4">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">What colleges say</p>
              <h2 className="mt-4 text-3xl font-bold">A realistic platform feels trustworthy when it shows real workflows, not just pages.</h2>
              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-6 transition-all duration-300">
                <p className="text-lg leading-8 text-white/85">“{homeTestimonials[testimonialIndex].quote}”</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-white">{homeTestimonials[testimonialIndex].name}</p>
                    <p className="text-sm text-white/60">{homeTestimonials[testimonialIndex].role}</p>
                  </div>
                  <div className="flex gap-2">
                    {homeTestimonials.map((_, idx) => (
                      <button
                        key={idx}
                        className={`h-2.5 w-2.5 rounded-full transition ${testimonialIndex === idx ? "bg-yellow-400" : "bg-white/30"}`}
                        onClick={() => setTestimonialIndex(idx)}
                        aria-label={`Show testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Request a demo</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-950">Show colleges the product flow in one session.</h2>
              <p className="mt-4 text-slate-600 leading-7">
                Use this block to convert visitors into leads. It looks like a real college SaaS product and gives them a direct path to contact you.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link href="/contact-us">
                  <span className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-950 px-5 py-3 font-semibold text-white transition hover:bg-blue-900 cursor-pointer">
                    Contact sales <FaArrowRight />
                  </span>
                </Link>
                <Link href="/accreditation-intelligence">
                  <span className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100 cursor-pointer">
                    See features
                  </span>
                </Link>
              </div>
              <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                Suggested demo flow: homepage branding, admin banner edit, accreditation dashboard, upload files, save draft, publish, and export a submission bundle.
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <Chatbot />
      </div>
    </SWRConfig>
  );
}

export async function getServerSideProps(context) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";
  const fetchJson = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  };

  const [siteSettingsData, featuredPubs, allPubs, featuredProjects, allProjects, facultyData, newsData] = await Promise.all([
    fetchJson(`${apiBase}/api/site-settings`),
    fetchJson(`${apiBase}/api/publications?featured=true&limit=6`),
    fetchJson(`${apiBase}/api/publications?limit=6`),
    fetchJson(`${apiBase}/api/projects?featured=true&limit=6`),
    fetchJson(`${apiBase}/api/projects?limit=6`),
    fetchJson(`${apiBase}/api/faculty`),
    fetchJson(`${apiBase}/api/news-events`),
  ]);

  const fallback = {};
  if (siteSettingsData) fallback[apiBase + "/api/site-settings"] = siteSettingsData;
  if (featuredPubs) fallback[apiBase + "/api/publications?featured=true&limit=6"] = featuredPubs;
  if (allPubs) fallback[apiBase + "/api/publications?limit=6"] = allPubs;
  if (featuredProjects) fallback[apiBase + "/api/projects?featured=true&limit=6"] = featuredProjects;
  if (allProjects) fallback[apiBase + "/api/projects?limit=6"] = allProjects;
  if (facultyData) fallback[apiBase + "/api/faculty"] = facultyData;
  if (newsData) fallback[apiBase + "/api/news-events"] = newsData;

  return { props: { fallback } };
}
