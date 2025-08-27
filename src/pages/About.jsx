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

export default function About(){
  if (typeof document !== 'undefined') document.title = 'About - NekoTV';

  return (
    <main className="container mx-auto px-4 legal-wrapper">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <div className="max-w-3xl mx-auto legal-card p-6 rounded-2xl shadow-sm">
        <nav className="top-nav mb-4">
          <Link to="/about" className="active">About</Link>
          <span>/</span>
          <Link to="/terms">Terms of Service</Link>
          <span>/</span>
          <Link to="/privacy">Privacy and Policy</Link>
          <span>/</span>
          <Link to="/dmca">DMCA</Link>
        </nav>

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
          <a href="mailto:nekotv@proton.me" className="mini-btn text-gray-200 hover:text-white">Contact Us</a>
        </div>
      </div>
    </main>
  );
}


