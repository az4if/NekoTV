import React from "react";
import Heading from "./Heading";
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

function PrivacyPolicy() {
  if (typeof document !== "undefined") document.title = "Privacy & Policy - NekoTV";

  return (
    <main className="container mx-auto px-4 legal-wrapper">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <div className="max-w-3xl mx-auto legal-card p-6 rounded-2xl shadow-sm">
        <nav className="top-nav mb-4">
          <Link to="/about">About</Link>
          <span>/</span>
          <Link to="/terms">Terms of Service</Link>
          <span>/</span>
          <Link to="/privacy" className="active">Privacy and Policy</Link>
          <span>/</span>
          <Link to="/dmca">DMCA</Link>
        </nav>

        <Heading className="text-3xl font-extrabold gradient-text">Privacy Policy</Heading>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Data Collection</h3>
          <p className="text-sm text-gray-300 mt-2">We collect minimal user data necessary for the functioning of NekoTV, such as account information and user preferences.</p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Use of Data</h3>
          <p className="text-sm text-gray-300 mt-2">The data collected is used to improve service quality and user experience. We do not share personal data with third parties except as required by law.</p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Cookies and Tracking</h3>
          <p className="text-sm text-gray-300 mt-2">NekoTV uses cookies and similar tracking technologies to enhance the user experience like caching video timestamps and tracking watched content.</p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Third-Party Services</h3>
          <p className="text-sm text-gray-300 mt-2">Embedded videos from third-party sites may have their own privacy policies, and we advise users to read these policies on the respective sites.</p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Security</h3>
          <p className="text-sm text-gray-300 mt-2">We are committed to ensuring your data is secure but remind users that no method of transmission over the Internet is 100% secure.</p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Changes to Privacy Policy</h3>
          <p className="text-sm text-gray-300 mt-2">We may update our Privacy Policy from time to time. We will notify users of any changes by posting the new policy on this page.</p>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Contact Us</h3>
          <p className="text-sm text-gray-300 mt-2">If you have any questions about these terms, please contact us at <a href="mailto:nekotv@proton.me" className="text-white">nekotv@proton.me</a>.</p>
        </section>

        <p className="mt-6 text-xs text-gray-400">Last updated: August 16, 2025</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to="/" className="mini-btn text-gray-200 hover:text-white">Back to Home</Link>
          <Link to="/terms" className="mini-btn text-gray-200 hover:text-white">Read Terms</Link>
        </div>
      </div>
    </main>
  );
}

export default PrivacyPolicy;
