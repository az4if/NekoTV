import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const pages = [
  { name: "Home", to: "/home" },
  { name: "About", to: "/about" },
  { name: "Privacy Policy", to: "/privacy-policy" },
  { name: "Terms of Service", to: "/terms-of-service" },
  { name: "DMCA", to: "/dmca" },
];

const PageHeader = ({ title }) => {
  const location = useLocation();

  return (
    <header className="w-full pt-20 px-4 bg-transparent">
      <div className="max-w-5xl mx-auto text-center">
        <div className="h-6" />

        <nav
          className="inline-flex items-center flex-wrap justify-center gap-8 text-xl md:text-2xl font-bold tracking-tight"
          role="navigation"
          aria-label="Main site navigation"
        >
          {pages.map((p, i) => {
            const Separator = () => (
              <span className="text-neutral-500 select-none text-3xl md:text-4xl font-extrabold" aria-hidden>
                /
              </span>
            );

            return (
              <React.Fragment key={p.to}>
                <NavLink
                  to={p.to}
                  end={p.to === "/"}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md transition-all duration-150 transform-gpu focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a29bfc] font-extrabold ${
                      isActive
                        ? "text-[#a29bfc] scale-110"
                        : "text-[#89bcf8] hover:text-[#a29bfc] opacity-95"
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

        <div className="mt-8" />
      </div>
    </header>
  );
};

export default PageHeader;
