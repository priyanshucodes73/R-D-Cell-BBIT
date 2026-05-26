import React from "react";
import useSWR from "swr";
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
import { defaultPublicSettings, fetcher, getApiBase, normalizeSiteSettings } from "../lib/siteSettings";

function SocialIcon({ name }) {
  if (name === "Whatsapp") return <FaWhatsapp className="w-4 h-4" />;
  if (name === "Call") return <FaPhoneAlt className="w-4 h-4" />;
  if (name === "360") return <FaCompass className="w-4 h-4 ml-1" />;
  if (name === "Facebook") return <FaFacebookF className="w-4 h-4" />;
  if (name === "Twitter") return <FaTwitter className="w-4 h-4" />;
  if (name === "LinkedIn") return <FaLinkedinIn className="w-4 h-4" />;
  if (name === "Instagram") return <FaInstagram className="w-4 h-4" />;
  if (name === "YouTube") return <FaYoutube className="w-4 h-4" />;
  return <span className="w-4 h-4 inline-block" />;
}

export default function Footer() {
  const apiBase = getApiBase();
  const { data: siteSettingsData } = useSWR(apiBase + "/api/site-settings", fetcher);
  const siteSettings = { ...defaultPublicSettings, ...normalizeSiteSettings(siteSettingsData) };
  const editableFooterLinks = Array.isArray(siteSettings.footerLinks) && siteSettings.footerLinks.length
    ? siteSettings.footerLinks
    : defaultPublicSettings.footerLinks;
  const editableSocialLinks = Array.isArray(siteSettings.socialLinks) && siteSettings.socialLinks.length
    ? siteSettings.socialLinks
    : defaultPublicSettings.socialLinks;
  const footerAddressLines = String(siteSettings.footerAddress || "").split("\n").filter(Boolean);

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-black text-white pt-10 pb-4 px-2 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {editableFooterLinks.map((col) => (
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
              {footerAddressLines.map((line, index) => (
                <span key={line + index}>
                  {line}
                  <br />
                </span>
              ))}
              <span className="text-cyan-400">Phone:</span> {siteSettings.footerPhone}
              <br />
              <span className="text-cyan-400">Student Helpline:</span>
              <br />
              {siteSettings.footerHelpline}
              <br />
              <span className="text-cyan-400">Email:</span>
              <br />
              {siteSettings.footerEmail}
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
            {editableSocialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-yellow-400 p-1 rounded-full transition"
                aria-label={item.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center gap-1">
                  <SocialIcon name={item.name} />
                  {item.name === "Whatsapp" && <span className="ml-1 hidden sm:inline">Whatsapp</span>}
                  {item.name === "Call" && <span className="ml-1 hidden sm:inline">Call Us</span>}
                  {item.name === "360" && <span className="hidden sm:inline">360°</span>}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-white/70 text-sm">
            {siteSettings.footerCopyright}
          </p>
        </div>
      </footer>
    </>
  );
}
