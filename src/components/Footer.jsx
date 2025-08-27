// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTelegram } from "react-icons/fa6";
import AZ from "../layouts/AZ";
import Logo from "./Logo"; // <-- import Logo

const Footer = () => {
  return (
    <footer className="w-full mt-8 py-8 px-4 bg-black/30 backdrop-blur-md border-t border-neutral-700/50">
      <div className="max-w-6xl mx-auto">
        {/* Centered logo at top of footer */}
        <div className="flex justify-center mb-6">
          <Logo to="/" compact={false} showBadge={true} inlineEar={true} />
        </div>

        <div className="mb-8">
          <div className="flex flex-col items-center mb-4">
            {/* Accessible heading + description */}
            <h2 id="alpha-list-heading" className="text-[#89bcf8] font-bold text-lg">
              A-Z List
            </h2>
            <p id="alpha-list-desc" className="text-neutral-400 text-sm text-center mt-1">
              Searching anime order by alphabet name A to Z.
            </p>
          </div>

          <AZ selected={null} aria-labelledby="alpha-list-heading" />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-neutral-300 text-center md:text-left">
              NekoTV does not store any files on its servers, it only links
              to the media hosted on third-party services.
            </p>
            <p className="text-neutral-400 text-sm">© NekoTV All rights reserved.</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link to="/privacy-policy" className="text-neutral-300 hover:text-[#a29bfc] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-neutral-300 hover:text-[#a29bfc] text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/dmca" className="text-neutral-300 hover:text-[#a29bfc] text-sm transition-colors">
                DMCA
              </Link>
              <Link to="/about" className="text-neutral-300 hover:text-[#a29bfc] text-sm transition-colors">
                About
              </Link>
            </div>

            <div className="flex gap-4">
              <a href="https://github.com/jsmat0m" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white text-xl transition-colors">
                <FaGithub />
              </a>
              <a href="https://t.me/jsmat0m" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-blue-300 text-xl transition-colors">
                <FaTelegram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
