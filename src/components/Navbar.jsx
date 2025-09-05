import { useState } from "react";
import { FaAlignJustify, FaHome, FaFilm, FaTv, FaFire, FaArrowUp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", link: "/home", icon: <FaHome /> },
    { name: "Movies", link: "/animes/movie", icon: <FaFilm /> },
    { name: "TV Shows", link: "/animes/tv", icon: <FaTv /> },
    { name: "Most Popular", link: "/animes/most-popular", icon: <FaFire /> },
    { name: "Top Airing", link: "/animes/top-airing", icon: <FaArrowUp /> },
  ];

  return (
    <nav className="w-full py-4 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center gap-4">
          {navLinks.map((item) => (
            <Link
              key={item.link}
              to={item.link}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                location.pathname === item.link
                  ? "bg-primary/80 text-black"
                  : "bg-white/10 text-white hover:bg-primary/80 hover:text-black"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation - Multi-line layout */}
        <div className="md:hidden">
          <div className="flex flex-wrap justify-center gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                className={`px-3 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 text-sm ${
                  location.pathname === item.link
                    ? "bg-primary/80 text-black"
                    : "bg-white/10 text-white hover:bg-primary/80 hover:text-black"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
