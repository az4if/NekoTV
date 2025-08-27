import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Heading from "./Heading";
import AZ from "../layouts/AZ";
import {
  FaGithub,
  FaTelegram,
  FaFileContract,
  FaShieldAlt,
  FaInfoCircle,
  FaExternalLinkAlt,
} from "react-icons/fa6";

/*
  Redesigned Footer component.
  - Left: Logo + descriptive text + social icons
  - Right: AZ component (kept as-is, only moved position) + compact "mini" links to pages
  - Also includes three simple page components for /terms, /privacy, /about
*/

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white mt-8">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* LEFT: bigger text area */}
        <div className="left md:w-2/3">
          <div className="logo flex items-center gap-3">
            <Logo />
            <span className="sr-only">NekoTV logo</span>
          </div>

          <p className="mt-4 text-sm text-gray-300 max-w-xl">
            NekoTV indexes and links to third-party hosts so you can discover anime
            fast. We don't store files on our servers — if you have copyright or
            content concerns, please reach out and we'll address them promptly.
          </p>

          <p className="mt-3 text-xs text-gray-400">© {new Date().getFullYear()} NekoTV. All rights reserved.</p>

          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://github.com/jsmat0m"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NekoTV on GitHub"
              className="text-gray-400 hover:text-white text-2xl"
            >
              <FaGithub />
            </a>
            <a
              href="https://t.me/jsmat0m"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NekoTV on Telegram"
              className="text-gray-400 hover:text-blue-300 text-2xl"
            >
              <FaTelegram />
            </a>
          </div>
        </div>

        {/* RIGHT: compact / mini texts, AZ placed here as requested */}
        <div className="right md:w-1/3 flex flex-col items-start md:items-end gap-4">
          <div className="az-wrap w-full md:w-auto">
            {/* AZ is kept intact and simply repositioned into the right column */}
            <AZ />
          </div>

          <div className="mini-links flex flex-col gap-2 items-start md:items-end">
            <Link
              to="/terms"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
              aria-label="Terms of Service"
            >
              <FaFileContract className="text-lg" aria-hidden="true" />
              <span>Terms of Service</span>
              <FaExternalLinkAlt className="text-xs ml-1 opacity-60" aria-hidden="true" />
            </Link>

            <Link
              to="/privacy"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
              aria-label="Privacy and Policy"
            >
              <FaShieldAlt className="text-lg" aria-hidden="true" />
              <span>Privacy &amp; Policy</span>
              <FaExternalLinkAlt className="text-xs ml-1 opacity-60" aria-hidden="true" />
            </Link>

            <Link
              to="/about"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
              aria-label="About NekoTV"
            >
              <FaInfoCircle className="text-lg" aria-hidden="true" />
              <span>About</span>
              <FaExternalLinkAlt className="text-xs ml-1 opacity-60" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* optional thin divider and tiny footer row for small devices */}
      <div className="border-t border-neutral-800 mt-4">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between text-xs text-gray-500">
          <div className="hidden sm:block">NekoTV — index-based anime search</div>
          <div>Built with ❤️</div>
        </div>
      </div>
    </footer>
  );
};

/* --- Simple page components for the routes --- */

export const TermsOfService = () => (
  <main className="container mx-auto px-4 py-12">
    <Heading>Terms of Service</Heading>
    <p className="mt-4 text-sm text-gray-300">
      This is a placeholder for Terms of Service. Add your legal terms here —
      what users can and cannot do, DMCA takedown contact, disclaimers, etc.
    </p>
  </main>
);

export const PrivacyPolicy = () => (
  <main className="container mx-auto px-4 py-12">
    <Heading>Privacy &amp; Policy</Heading>
    <p className="mt-4 text-sm text-gray-300">
      This is a placeholder for the Privacy Policy. Explain what data you collect,
      how it's used, third-party services, and how users can request removal.
    </p>
  </main>
);

export const About = () => (
  <main className="container mx-auto px-4 py-12">
    <Heading>About NekoTV</Heading>
    <p className="mt-4 text-sm text-gray-300">
      About page placeholder — your mission, credits, contact info, and a short
      history or FAQ fit well here.
    </p>
  </main>
);

export default Footer;
