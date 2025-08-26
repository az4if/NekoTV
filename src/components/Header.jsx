import { useRef, useState, useEffect, useCallback } from "react";
import { FaArrowCircleRight, FaBars, FaSearch, FaTimes, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useApi } from "../services/useApi";
import Logo from "./Logo";
import useSidebarStore from "../store/sidebarStore";
import Loader from "./Loader";

const Header = () => {
  const sidebarHandler = useSidebarStore((state) => state.toggleSidebar);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const timeoutRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showSearchModal && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [showSearchModal]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showSearchModal) {
        closeSearchModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showSearchModal]);

  const changeInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(newValue);
    }, 300);
  };

  const { data, isLoading, isError } = useApi(
    debouncedValue.length > 2 ? `/suggestion?keyword=${debouncedValue}` : null
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (value.trim()) {
        navigate(`/search?keyword=${value.trim()}`);
        closeSearchModal();
      }
    },
    [value, navigate]
  );

  const navigateToAnimePage = useCallback(
    (id) => {
      navigate(`/anime/${id}`);
      closeSearchModal();
    },
    [navigate]
  );

  const openSearchModal = useCallback(() => {
    setShowSearchModal(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeSearchModal = useCallback(() => {
    setShowSearchModal(false);
    setValue("");
    setDebouncedValue("");
    clearTimeout(timeoutRef.current);
    document.body.style.overflow = "unset";
  }, []);

  const clearInput = useCallback(() => {
    setValue("");
    setDebouncedValue("");
    clearTimeout(timeoutRef.current);
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div className="relative z-40">
        <div className="fixed w-full py-2 shadow-md bg-gradient-to-r from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-md">
          <div className="flex gap-2 px-5 md:px-10 md:gap-5 justify-between items-center">
            <div className="left flex gap-2 md:gap-5 items-center">
              <button
                onClick={sidebarHandler}
                aria-label="Toggle sidebar"
                className="p-1 hover:text-primary transition-colors"
              >
                <FaBars size={25} />
              </button>
              <Logo />
            </div>

            <div className="right flex gap-3 md:gap-5 items-center">
              <button
                aria-label="Open search"
                onClick={openSearchModal}
                className="p-1.5 hover:text-primary transition-colors"
              >
                <FaSearch size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal Overlay */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeSearchModal}
          />
          
          {/* Modal Content */}
          <div className="relative flex items-start justify-center pt-16 md:pt-24 px-4">
            <div className="relative w-full max-w-2xl bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
              {/* Search Input */}
              <div className="p-4 border-b border-gray-700">
                <form onSubmit={handleSubmit} className="relative">
                  <div className="relative flex items-center">
                    <FaSearch className="absolute left-4 text-gray-400" size={18} />
                    <input
                      ref={inputRef}
                      value={value}
                      onChange={changeInput}
                      placeholder="Search for anime..."
                      type="text"
                      aria-label="Search anime"
                      className="w-full bg-gray-800 text-white py-3 pl-12 pr-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {value.length > 0 && (
                      <button
                        type="button"
                        onClick={clearInput}
                        aria-label="Clear search"
                        className="absolute right-11 text-gray-400 hover:text-white p-1"
                      >
                        <FaTimes size={18} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={closeSearchModal}
                      aria-label="Close search"
                      className="absolute right-3 text-gray-400 hover:text-white p-1"
                    >
                      <FaTimes size={20} />
                    </button>
                  </div>
                </form>
              </div>

              {/* Search Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {isLoading ? (
                  <div className="py-8 flex justify-center">
                    <Loader size="medium" />
                  </div>
                ) : isError ? (
                  <div className="py-6 text-center text-red-300">
                    Failed to load suggestions
                  </div>
                ) : data && data.data.length > 0 ? (
                  <>
                    {data.data.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => navigateToAnimePage(item.id)}
                        className="flex p-4 hover:bg-gray-800/50 transition-colors cursor-pointer border-b border-gray-800 last:border-b-0"
                      >
                        <div className="flex-shrink-0 w-16 h-20 relative overflow-hidden rounded">
                          <img
                            src={item.poster}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1 min-w-0">
                          <h4 className="font-semibold text-white truncate">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-300 truncate mt-1">
                            {item.alternativeTitle}
                          </p>
                          <div className="flex flex-wrap items-center mt-2 text-xs text-gray-400 gap-2">
                            <span className="bg-gray-700 px-2 py-1 rounded">
                              {item.type}
                            </span>
                            <span>{item.aired}</span>
                            <span>•</span>
                            <span>{item.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center pl-2">
                          <FaArrowRight className="text-gray-400" />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleSubmit}
                      className="w-full py-4 bg-primary hover:bg-primary-dark text-black font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      View All Results
                      <FaArrowCircleRight size={20} />
                    </button>
                  </>
                ) : (
                  debouncedValue.length > 2 && (
                    <div className="py-8 text-center text-gray-400">
                      <div className="text-2xl mb-2">No results found</div>
                      <p>Try different keywords or browse categories</p>
                    </div>
                  )
                )}
              </div>

              {/* Empty state when no search query */}
              {value.length === 0 && (
                <div className="py-8 px-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
                    <FaSearch className="text-gray-400" size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Search Anime</h3>
                  <p className="text-gray-400">Enter keywords to find your favorite anime</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
