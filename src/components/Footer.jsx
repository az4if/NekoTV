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

// Local styles for the legal pages. These rely on your global index.html background grid
// and the CSS variables --primary and --secondary that you've specified.
const pageStyles = `
:root{ --primary: #a29bfc; --secondary: #89bcf8; }
.legal-wrapper{min-height:60vh; padding:3rem 1rem;}
.legal-card{background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border:1px solid rgba(255,255,255,0.04);}
.gradient-text{background: linear-gradient(90deg,var(--primary),var(--secondary)); -webkit-background-clip:text; background-clip:text; color:transparent;}
.section-title{color:var(--primary)}
.mini-btn{border:1px solid rgba(255,255,255,0.06); padding:0.5rem 0.75rem; border-radius:8px; font-size:0.875rem}
`;

export const TermsOfService = () => {
  if (typeof document !== 'undefined') document.title = 'Terms of Service - NekoTV';

  return (
    <main className="container mx-auto px-4 legal-wrapper">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <div className="max-w-3xl mx-auto legal-card p-6 rounded-2xl shadow-sm">
        <Heading className="text-3xl font-extrabold gradient-text">Terms of Service</Heading>

        <p className="mt-4 text-sm text-gray-300">
          Welcome to NekoTV. By using our service you agree to these Terms of Service. NekoTV
          provides an index of links to third-party hosted media for the purpose of discovery and
          does not host or upload content itself.
        </p>

        <section className="mt-6">
          <h3 className="section-title font-semibold">1. Acceptance</h3>
          <p className="text-sm text-gray-300 mt-2">
            Using NekoTV constitutes acceptance of these terms. If you do not agree, please stop
            using the site.
          </p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">2. Permitted Use</h3>
          <p className="text-sm text-gray-300 mt-2">
            You may browse and search links for personal, non-commercial use. Any attempt to
            collect, scrape, mirror or redistribute our index without permission is prohibited.
          </p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">3. Intellectual Property &amp; DMCA</h3>
          <p className="text-sm text-gray-300 mt-2">
            NekoTV links to third-party content. If you are a rights-holder and believe content
            linked on NekoTV infringes your copyright, please contact us with a DMCA takedown
            request including sufficient identifying details so we can investigate and remove links.
          </p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">4. Disclaimer</h3>
          <p className="text-sm text-gray-300 mt-2">
            Content linked by NekoTV is provided by third parties. We make no guarantees about the
            availability, safety, or legality of third-party content. Use at your own risk.
          </p>
        </section>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to="/" className="mini-btn text-gray-200 hover:text-white">Back to Home</Link>
          <Link to="/privacy" className="mini-btn text-gray-200 hover:text-white">View Privacy Policy</Link>
        </div>
      </div>
    </main>
  );
};

export const PrivacyPolicy = () => {
  if (typeof document !== 'undefined') document.title = 'Privacy & Policy - NekoTV';

  return (
    <main className="container mx-auto px-4 legal-wrapper">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <div className="max-w-3xl mx-auto legal-card p-6 rounded-2xl shadow-sm">
        <Heading className="text-3xl font-extrabold gradient-text">Privacy &amp; Policy</Heading>

        <p className="mt-4 text-sm text-gray-300">
          NekoTV respects your privacy. This page explains what information we may collect and how
          we use it.
        </p>

        <section className="mt-6">
          <h3 className="section-title font-semibold">Information We Collect</h3>
          <p className="text-sm text-gray-300 mt-2">
            We do not require accounts. We may collect non-personal usage data such as search
            queries, referral URLs, user agent, and IP addresses for analytics and to improve the
            service.
          </p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Use of Data</h3>
          <p className="text-sm text-gray-300 mt-2">
            Data is used to analyze traffic, diagnose issues, and improve the product. We do not
            share identifiable personal data with third parties except as required by law or when
            using third party services (analytics, hosting) — see below.
          </p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Third-party Services</h3>
          <p className="text-sm text-gray-300 mt-2">
            We use common third-party services (e.g., analytics, hosting, CDN). These services may
            process data independently according to their own policies.
          </p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Contact &amp; Removal</h3>
          <p className="text-sm text-gray-300 mt-2">
            To request removal of links, report privacy concerns, or ask questions, please contact
            us through the channels on the About page.
          </p>
        </section>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to="/" className="mini-btn text-gray-200 hover:text-white">Back to Home</Link>
          <Link to="/terms" className="mini-btn text-gray-200 hover:text-white">Read Terms</Link>
        </div>
      </div>
    </main>
  );
};

export const About = () => {
  if (typeof document !== 'undefined') document.title = 'About - NekoTV';

  return (
    <main className="container mx-auto px-4 legal-wrapper">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <div className="max-w-3xl mx-auto legal-card p-6 rounded-2xl shadow-sm">
        <Heading className="text-3xl font-extrabold gradient-text">About NekoTV</Heading>

        <p className="mt-4 text-sm text-gray-300">
          NekoTV is an index-focused anime discovery site built to help fans find streaming
          sources quickly. We prioritize a light, fast experience and provide easy alphabetic
          navigation to find titles.
        </p>

        <section className="mt-6">
          <h3 className="section-title font-semibold">Our Mission</h3>
          <p className="text-sm text-gray-300 mt-2">
            Make anime discovery fast and frictionless. We surface links and let users choose the
            source that works for them.
          </p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Credits</h3>
          <p className="text-sm text-gray-300 mt-2">
            Built by the NekoTV community. Thanks to contributors, open-source libraries, and the
            countless fans who share feedback.
          </p>
        </section>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to="/" className="mini-btn text-gray-200 hover:text-white">Back to Home</Link>
          <a href="mailto:privacy@nekotv.example" className="mini-btn text-gray-200 hover:text-white">Contact Us</a>
        </div>
      </div>
    </main>
  );
};

export default Footer;
