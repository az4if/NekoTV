import React from "react";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";

const pageStyles = `
:root{ --primary: #a29bfc; --secondary: #89bcf8; }
.legal-wrapper{min-height:60vh; padding:3rem 1rem;}
.legal-card{background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border:1px solid rgba(255,255,255,0.04);}
.gradient-text{background: linear-gradient(90deg,var(--primary),var(--secondary)); -webkit-background-clip:text; background-clip:text; color:transparent;}
.top-nav{display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center}
.top-nav a{color:rgba(255,255,255,0.75);text-decoration:none}
.top-nav .active{color:var(--primary);font-weight:600}
.section-title{color:var(--primary)}
.mini-btn{border:1px solid rgba(255,255,255,0.06); padding:0.5rem 0.75rem; border-radius:8px; font-size:0.875rem}
`;

function TopNav() {
  return (
    <nav className="top-nav mb-4">
      <Link to="/about">About</Link>
      <span>/</span>
      <Link to="/terms" className="active">Terms of Service</Link>
      <span>/</span>
      <Link to="/privacy">Privacy and Policy</Link>
      <span>/</span>
      <Link to="/dmca">DMCA</Link>
    </nav>
  );
}

function TermsOfService() {
  if (typeof document !== "undefined") document.title = "Terms of Service - NekoTV";

  return (
    <main className="container mx-auto px-4 legal-wrapper">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <div className="max-w-3xl mx-auto legal-card p-6 rounded-2xl shadow-sm">
        <TopNav />

        <Heading className="text-3xl font-extrabold gradient-text">Terms of Service</Heading>

        <p className="mt-4 text-sm text-gray-300">
          By using NekoTV you agree to these Terms of Service and acknowledge that they affect your legal rights and obligations.
        </p>

        <section className="mt-6">
          <h3 className="section-title font-semibold">Content</h3>
          <p className="text-sm text-gray-300 mt-2">
            NekoTV does not host video content but embeds videos from various third-party sources. We are not responsible for the content, quality, or the policies of these external sites.
          </p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">User Content &amp; Comments</h3>
          <p className="text-sm text-gray-300 mt-2">
            Users are welcome to share their thoughts responsibly. To maintain a respectful environment:
          </p>
          <ul className="list-disc ml-5 mt-2 text-sm text-gray-300">
            <li>Be respectful: Treat others with courtesy and avoid offensive language</li>
            <li>Stay on-topic: Ensure your comments contribute to the discussion</li>
            <li>Avoid spoilers: Don't reveal major plot points</li>
          </ul>
          <p className="text-sm text-gray-300 mt-2">Comments that violate these guidelines may be removed at our discretion.</p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Use of Site</h3>
          <p className="text-sm text-gray-300 mt-2">
            The service is provided "as is" and is used at the user's own risk. Users must not misuse the service in any way that breaches laws or regulations.
          </p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Intellectual Property</h3>
          <p className="text-sm text-gray-300 mt-2">
            The intellectual property rights of the embedded videos remain with their respective owners. NekoTV respects these rights and does not claim ownership of this content.
          </p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Changes to Terms</h3>
          <p className="text-sm text-gray-300 mt-2">We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Termination</h3>
          <p className="text-sm text-gray-300 mt-2">We may terminate or suspend access to our service immediately, without prior notice, for any breach of these Terms. Upon termination, users must cease all use of the service.</p>
        </section>

        <p className="mt-6 text-xs text-gray-400">Last updated: August 16, 2025</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to="/" className="mini-btn text-gray-200 hover:text-white">Back to Home</Link>
          <Link to="/privacy" className="mini-btn text-gray-200 hover:text-white">View Privacy Policy</Link>
        </div>
      </div>
    </main>
  );
}

export { TopNav };
export default TermsOfService;
