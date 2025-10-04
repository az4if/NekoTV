import { FaArrowCircleRight, FaSearch } from "react-icons/fa";
import banner from "../assets/homeBanner.png";
import background from "../assets/background.jpg";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const Root = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const changeInput = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${value}`);
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">

      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(31,79,112,0.6)] via-[rgba(76,52,140,0.5)] to-[rgba(0,0,0,0.7)]"></div>
      </div>

      <div className="relative z-10 flex justify-center py-4">
        <Logo className="w-40 md:w-56 animate-fadeIn" />
      </div>

      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100dvh-140px)] px-4 text-center">

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
        >
          <input
            value={value}
            onChange={changeInput}
            type="text"
            placeholder="Search Anime..."
            className="flex-1 py-3 px-5 rounded-lg text-white text-lg md:text-xl focus:outline-none bg-white/10 backdrop-blur-sm placeholder-white/70"
          />
          <button
            type="submit"
            className="bg-primary text-black px-5 py-3 rounded-lg text-lg md:text-xl font-bold hover:scale-105 transition-transform"
          >
            <FaSearch />
          </button>
        </form>

        <div className="banner mt-6 animate-fadeIn">
          <img
            src={banner}
            alt="banner"
            className="w-64 md:w-96 lg:w-[500px] rounded-xl shadow-xl"
          />
        </div>

        <Link
          to="/home"
          className="mt-6 mb-12 bg-primary text-black font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg"
        >
          <span>Explore Animes</span>
          <FaArrowCircleRight />
        </Link>
      </div>
    </div>
  );
};

export default Root;
