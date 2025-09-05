import React from "react";
import pageNotFound from "../assets/404.png";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaHome, FaFilm, FaList, FaTv, FaFire, FaArrowUp } from "react-icons/fa";
import { Helmet } from "react-helmet";

const PageNotFound = () => {
  const navLinks = [
    { 
      id: 1, 
      name: "A-Z List", 
      link: "/animes/az-list", 
      icon: <FaList /> 
    },
    { 
      id: 2,
      name: "Movies", 
      link: "/animes/movie", 
      icon: <FaFilm /> 
    },
    { 
      id: 3,
      name: "TV Shows", 
      link: "/animes/tv", 
      icon: <FaTv /> 
    },
    { 
      id: 4,
      name: "Most Popular", 
      link: "/animes/most-popular", 
      icon: <FaFire /> 
    },
    { 
      id: 5,
      name: "Top Airing", 
      link: "/animes/top-airing", 
      icon: <FaArrowUp /> 
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between items-center text-white px-4" style={{ background: "transparent" }}>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta property="og:title" content="Page Not Found - NekoTV" />
      </Helmet>

      <div className="flex flex-col items-center justify-center mt-12 gap-6 text-center">
        <img
          className="max-w-[320px] md:max-w-[400px] mb-4 animate-fadeIn"
          src={pageNotFound}
          alt="404 page not found"
        />
        <h1 className="text-3xl md:text-4xl text-primary font-bold">404 ERROR</h1>
        <h2 className="text-lg md:text-xl text-white/80 mb-4">
          Oops! We Can't Find This Page.
        </h2>
        <Link to="/home">
          <button className="bg-primary hover:scale-105 transition-transform flex items-center gap-2 text-black px-6 py-3 rounded-2xl shadow-lg">
            <FaAngleLeft />
            <span>Go Back To Home Page</span>
          </button>
        </Link>
      </div>

      <div className="w-full mt-12 mb-12">
        <h3 className="text-center text-xl font-bold mb-4">Quick Links</h3>
        <div className="flex justify-center gap-4 flex-wrap bg-transparent">
          {navLinks.map((item) => (
            <Link
              key={item.id}
              to={item.link} 
              className="bg-black/50 hover:bg-primary hover:text-black text-white px-4 py-2 rounded-xl transition-colors font-semibold flex items-center gap-2"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
