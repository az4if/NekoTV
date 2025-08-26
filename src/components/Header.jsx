import { useRef, useState, useEffect, useCallback } from "react";
import { FaArrowCircleRight, FaBars, FaSearch, FaTimes, FaHistory, FaFire, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useApi } from "../services/useApi";
import Logo from "./Logo";
import useSidebarStore from "../store/sidebarStore";
import Loader from "./Loader";

const Header = () => {
  const sidebarHandler = useSidebarStore((state) => state.toggleSidebar);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const timeoutRef = useRef(null);
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('animeSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('animeSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchBar]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        resetSearch();
      }
    };

    if (showSearchBar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchBar]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showSearchBar) {
        resetSearch();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showSearchBar]);

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

  const addToSearchHistory = useCallback((searchTerm) => {
    const updatedHistory = [
      searchTerm,
      ...searchHistory.filter(item => item !== searchTerm)
    ].slice(0, 5); // Keep only the 5 most recent searches
    
    setSearchHistory(updatedHistory);
  }, [searchHistory]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (value.trim()) {
        addToSearchHistory(value.trim());
        navigate(`/search?keyword=${value.trim()}`);
        resetSearch();
      }
    },
    [value, navigate, addToSearchHistory]
  );

  const navigateToAnimePage = useCallback(
    (id) => {
      navigate(`/anime/${id}`);
      resetSearch();
    },
    [navigate]
  );

  const searchFromHistory = useCallback((term) => {
    setValue(term);
    addToSearchHistory(term);
    navigate(`/search?keyword=${term}`);
    resetSearch();
  }, [navigate, addToSearchHistory]);

  const resetSearch = useCallback(() => {
    setValue("");
    setDebouncedValue("");
    setShowSearchBar(false);
    clearTimeout(timeoutRef.current);
  }, []);

  const clearInput = useCallback(() => {
    setValue("");
    setDebouncedValue("");
    clearTimeout(timeoutRef.current);
    inputRef.current?.focus();
  }, []);

  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  return (
    <div className="relative z-[100]" ref={searchContainerRef}>
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
              aria-label={showSearchBar ? "Close search" : "Open search"}
              onClick={() => setShowSearchBar(!showSearchBar)}
              className="p-1.5 hover:text-primary transition-colors"
            >
              {showSearchBar ? <FaTimes size={22} /> : <FaSearch size={20} />}
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`mt-2 px-4 transition-all duration-300 ${
            showSearchBar ? "flex" : "hidden"
          }`}
        >
          <div className="relative flex items-center w-full">
            <input
              ref={inputRef}
              value={value}
              onChange={changeInput}
              placeholder="Search anime..."
              type="text"
              aria-label="Search anime"
              className="w-full bg-gray-800 text-white py-2.5 pl-4 pr-12 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute right-3 flex gap-2">
              {value.length > 0 && (
                <button
                  type="button"
                  onClick={clearInput}
                  aria-label="Clear search"
                  className="text-gray-400 hover:text-white p-1"
                >
                  <FaTimes size={18} />
                </button>
              )}
              <button
                type="submit"
                aria-label="Submit search"
                className="text-primary hover:text-primary-light p-1"
              >
                <FaSearch size={18} />
              </button>
            </div>
          </div>
        </form>
        <div
          className={`bg-gray-800 mt-1 mx-4 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
            showSearchBar ? "block" : "hidden"
          }`}
        >
          {/* Search History Section */}
          {value.length === 0 && searchHistory.length > 0 && (
            <div className="border-b border-gray-700">
              <div className="flex justify-between items-center p-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <FaHistory className="text-primary" />
                  <span className="font-medium">Recent Searches</span>
                </div>
                <button 
                  onClick={clearSearchHistory}
                  className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded"
                >
                  Clear All
                </button>
              </div>
              <div className="pb-2">
                {searchHistory.map((term, index) => (
                  <div
                    key={index}
                    onClick={() => searchFromHistory(term)}
                    className="flex items-center px-4 py-2.5 hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <FaClock className="text-gray-400 mr-3" size={14} />
                    <span className="text-white">{term}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Suggestions */}
          {value.length === 0 && (
            <div className="border-b border-gray-700">
              <div className="flex items-center gap-2 p-3 text-gray-300">
                <FaFire className="text-primary" />
                <span className="font-medium">Popular Right Now</span>
              </div>
              <div className="grid grid-cols-2 pb-2">
                {['Jujutsu Kaisen', 'One Piece', 'Attack on Titan', 'Demon Slayer'].map((term, index) => (
                  <div
                    key={index}
                    onClick={() => searchFromHistory(term)}
                    className="px-4 py-2.5 hover:bg-gray-700 transition-colors cursor-pointer text-sm text-gray-300 truncate"
                  >
                    {term}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {value.length > 2 ? (
            <>
              {isLoading ? (
                <div className="py-6 flex justify-center">
                  <Loader size="small" />
                </div>
              ) : isError ? (
                <div className="py-4 text-center text-red-300">
                  Failed to load suggestions
                </div>
              ) : data && data.data.length > 0 ? (
                <>
                  <div className="max-h-[60vh] overflow-y-auto">
                    {data.data.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => navigateToAnimePage(item.id)}
                        className="flex p-3 hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <div className="flex-shrink-0 w-16 h-20 relative">
                          <img
                            src={item.poster}
                            alt={item.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <h4 className="font-medium text-white truncate">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-300 truncate">
                            {item.alternativeTitle}
                          </p>
                          <div className="flex items-center mt-1 text-xs text-gray-400">
                            <span>{item.aired}</span>
                            <span className="mx-2">•</span>
                            <span>{item.type}</span>
                            <span className="mx-2">•</span>
                            <span>{item.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-primary hover:bg-primary-dark text-black font-bold flex items-center justify-center gap-2"
                  >
                    View All Results
                    <FaArrowCircleRight />
                  </button>
                </>
              ) : (
                debouncedValue.length > 2 && (
                  <div className="py-6 text-center text-gray-400">
                    No results found for "{debouncedValue}"
                  </div>
                )
              )}
            </>
          ) : value.length > 0 && (
            <div className="py-4 px-4 text-center text-gray-400">
              Continue typing to see results...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
