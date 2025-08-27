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

function DMCA() {
  if (typeof document !== "undefined") document.title = "DMCA - NekoTV";

  return (
    <main className="container mx-auto px-4 legal-wrapper">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <div className="max-w-3xl mx-auto legal-card p-6 rounded-2xl shadow-sm">
        <nav className="top-nav mb-4">
          <Link to="/about">About</Link>
          <span>/</span>
          <Link to="/terms">Terms of Service</Link>
          <span>/</span>
          <Link to="/privacy">Privacy and Policy</Link>
          <span>/</span>
          <Link to="/dmca" className="active">DMCA</Link>
        </nav>

        <Heading className="text-3xl font-extrabold gradient-text">DMCA Takedown</Heading>

        <p className="mt-4 text-sm text-gray-300">
          We take the intellectual property rights of others seriously and require that our Users do the same. The Digital Millennium Copyright Act (DMCA) established a process for addressing claims of copyright infringement.
        </p>

        <section className="mt-4">
          <h3 className="section-title font-semibold">How to File a DMCA Report</h3>
          <p className="text-sm text-gray-300 mt-2">If you own a copyright or have authority to act on behalf of a copyright owner and want to report alleged infringement, please submit a DMCA report on our Contact page. Provide the following information:</p>
          <ul className="list-disc ml-5 mt-2 text-sm text-gray-300">
            <li>A description of the copyrighted work that you claim is being infringed;</li>
            <li>A description of the material you claim is infringing and the URL or location of that material;</li>
            <li>Your name, title (if acting as an agent), address, telephone number, and email address;</li>
            <li>The following statement: "I have a good faith belief that the use of the copyrighted material I am complaining of is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use)";</li>
            <li>The following statement: "The information in this notice is accurate and, under penalty of perjury, I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right that is allegedly infringed";</li>
            <li>An electronic or physical signature of the owner of the copyright or a person authorized to act on the owner's behalf.</li>
          </ul>
        </section>

        <section className="mt-4">
          <h3 className="section-title font-semibold">Where to Submit</h3>
          <p className="text-sm text-gray-300 mt-2">Your DMCA takedown request should be submitted here: <a href="https://hianime.to/contact" className="text-white underline">https://hianime.to/contact</a></p>
        </section>

        <p className="mt-6 text-sm text-gray-300">We will review your DMCA request and take appropriate action, including removal of the content from the website when required.</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to="/" className="mini-btn text-gray-200 hover:text-white">Back to Home</Link>
          <Link to="/contact" className="mini-btn text-gray-200 hover:text-white">Contact Page</Link>
        </div>
      </div>
    </main>
  );
}

export default DMCA;
