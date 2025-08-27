import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTelegram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full mt-8 py-6 px-4 bg-neutral-900/50 border-t border-neutral-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Left side content */}
        <div className="flex-1">
          <div className="flex flex-col items-start gap-4">
            <p className="text-primary font-bold text-lg">A-Z List</p>
            <p className="text-neutral-400 text-sm max-w-md">
              Searching anime order by alphabet name A to Z.
            </p>
            
            {/* Disclaimer */}
            <div className="mt-4">
              <p className="text-sm text-neutral-300">
                NekoTV does not store any files on its servers, it only links
                to the media hosted on third-party services.
              </p>
              <p className="mt-2 text-neutral-400 text-sm">© NekoTV All rights reserved.</p>
            </div>
          </div>
        </div>
        
        {/* Right side content */}
        <div className="flex flex-col items-start md:items-end gap-4">
          {/* Policy Links */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <Link 
              to="/privacy-policy" 
              className="text-neutral-300 hover:text-[#a29bfc] text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-of-service" 
              className="text-neutral-300 hover:text-[#a29bfc] text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/dmca" 
              className="text-neutral-300 hover:text-[#a29bfc] text-sm transition-colors"
            >
              DMCA
            </Link>
            <Link 
              to="/about" 
              className="text-neutral-300 hover:text-[#a29bfc] text-sm transition-colors"
            >
              About
            </Link>
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://github.com/jsmat0m"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white text-xl transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://t.me/jsmat0m"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-blue-300 text-xl transition-colors"
            >
              <FaTelegram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
