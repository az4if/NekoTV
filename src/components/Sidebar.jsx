import useSidebarStore from "../store/sidebarStore";
import { Link, useLocation } from "react-router-dom";
import Genres from "./Genres";

import { useEffect } from "react";
import { FaAngleLeft, FaHome, FaStar, FaFilm, FaClock, FaList, FaTv, FaFire, FaArrowUp, FaHeart } from "react-icons/fa";

const Sidebar = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const sidebarHandler = useSidebarStore((state) => state.toggleSidebar);

  const location = useLocation();
  const key = location.key;

  useEffect(() => {
    if (isSidebarOpen) sidebarHandler();
  }, [key]);

  const list = [
    { name: "Home", link: "/home", icon: <FaHome /> },
    { name: "A-Z List", link: "/animes/az-list/a", icon: <FaList /> },
    { name: "Subbed Anime", link: "/animes/subbed-anime", icon: <FaStar /> },
    { name: "Dubbed Anime", link: "/animes/dubbed-anime", icon: <FaStar /> },
    { name: "Most Popular", link: "/animes/most-popular", icon: <FaFire /> },
    { name: "TV Shows", link: "/animes/tv", icon: <FaTv /> },
    { name: "Top Airing", link: "/animes/top-airing", icon: <FaArrowUp /> },
    { name: "Most Favorite", link: "/animes/most-favorite", icon: <FaHeart /> },
    { name: "Latest Completed", link: "/animes/completed", icon: <FaClock /> },
    { name: "Recently Added", link: "/animes/recently-added", icon: <FaClock /> },
    { name: "Recently Updated", link: "/animes/recently-updated", icon: <FaClock /> },
    { name: "Top Upcoming", link: "/animes/top-upcoming", icon: <FaArrowUp /> },
    { name: "Movies", link: "/animes/movie", icon: <FaFilm /> },
    { name: "OVAs", link: "/animes/ova", icon: <FaFilm /> },
    { name: "ONAs", link: "/animes/ona", icon: <FaFilm /> },
    { name: "Specials", link: "/animes/special", icon: <FaStar /> },
  ];

  return (
    <div
      className={`sidebar transition-all fixed overflow-scroll h-full z-[100] inset-0 w-64 md:w-80 bg-[rgba(59,62,129,0.95)] ${
        isSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"
      }`}
    >
      <button
        className="w-full flex items-center gap-2 px-4 py-3 mt-2 mb-4 rounded-lg bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(125,211,252,0.1)] hover:text-[#7dd3fc] text-base md:text-xl transition-all duration-200 transform hover:scale-105"
        onClick={sidebarHandler}
      >
        <FaAngleLeft className="text-[#7dd3fc]" />
        <span className="font-semibold">Close Menu</span>
      </button>

      <ul className="py-4">
        {list.map((item) => (
          <li
            key={item.link}
            onClick={sidebarHandler}
            className="py-4 pl-4 hover:text-[#a78bfa] text-base md:text-lg border-b border-[rgba(255,255,255,.05)] w-full flex items-center gap-2"
          >
            {item.icon}
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
        <li className="py-4 pl-2 text-base md:text-lg w-full">Genres</li>
        <Genres
          event={sidebarHandler}
          className="w-1/2 my-2 pl-2"
        />
      </ul>
    </div>
  );
};

export default Sidebar;
