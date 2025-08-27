// src/components/PageHeader.jsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

/**
 * PageHeader
 * - Large centered title
 * - Big centered navigation showing the full list:
 *   Home / About / Privacy Policy / Terms of Service / DMCA
 * - Active item is highlighted; accessible navigation role/aria
 *
 * Replace your existing PageHeader with this file.
 */

const pages = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Privacy Policy", to: "/privacy-policy" },
  { name: "Terms of Service", to: "/terms-of-service" },
  { name: "DMCA", to: "/dmca" },
];

const PageHeader = ({ title }) => {
  const location = useLocation();

  // Get a fallback title from the path if none provided
  const pathFallback = (() => {
    const pathname = location.pathname === "/" ? "/home" : location.pathname;
    const last = pathname.split("/").filter(Boolean).pop() || "Page";
    return last.replace(/-/g, " ");
  })();

  return (
    <header className="w-full py-8 px-4 bg-transparent">
      <div className="max-w-5xl mx-auto text-center">
        {/* Large page title */}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#89bcf8] capitalize">
          {title || pathFallback}
        </h1>

        {/* Big centered nav / breadcrumb */}
        <nav
          className="inline-flex items-center flex-wrap justify-center gap-4 text-lg md:text-xl"
          role="navigation"
          aria-label="Main site navigation"
        >
          {pages.map((p, i) => {
            const Separator = () => (
              <span className="text-neutral-500 select-none" aria-hidden>
                /
              </span>
            );

            return (
              <React.Fragment key={p.to}>
                <NavLink
                  to={p.to}
                  end={p.to === "/"}
                  className={({ isActive }) =>
                    `px-2 py-1 rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a29bfc] ${
                      isActive
                        ? "text-[#a29bfc] font-semibold scale-105"
                        : "text-[#89bcf8] hover:text-[#a29bfc] opacity-90"
                    }`
                  }
                >
                  <span className="capitalize">{p.name}</span>
                </NavLink>

                {i !== pages.length - 1 && <Separator />}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Optional small subtitle / breadcrumb hint */}
        <p className="mt-4 text-sm text-neutral-400">
          {`You are here: ${location.pathname === "/" ? "Home" : decodeURIComponent(location.pathname).replace(/\//g, " / ")}`}
        </p>
      </div>
    </header>
  );
};

export default PageHeader;
