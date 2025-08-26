import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../services/useApi";

import playIcon from "../assets/play.svg";

const formatAnimeName = (name) => {
  if (!name) return "Unknown";
  return name
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ContinueWatching = () => {
  const [continueList, setContinueList] = useState([]);
  const navigate = useNavigate();

  // track in-flight poster fetches to avoid duplicate requests
  const inProgressRef = useRef(new Set());
  const isMountedRef = useRef(true);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("continueWatching")) || [];
      // keep stored data (metadata) but poster will be refreshed from API
      setContinueList(stored.slice(0, 60));
    } catch (err) {
      console.error("Failed to parse continueWatching from localStorage:", err);
      setContinueList([]);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Primary behavior: try API for poster first for every animeId present in storage.
  // If API returns an image we use it and persist it. If API fails or returns no image,
  // we *fall back* to whatever was already in localStorage (if any). We do NOT do
  // repeated poster fetches from the image onError handler — API-first, storage-second.
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("continueWatching")) || [];
    const animeIdsToFetch = [...new Set(stored.map((i) => i.animeId))].slice(0, 60);

    if (animeIdsToFetch.length === 0) return;

    let mounted = true;

    (async () => {
      const updated = [...stored];

      for (const animeId of animeIdsToFetch) {
        if (!animeId || inProgressRef.current.has(animeId)) continue;
        inProgressRef.current.add(animeId);

        try {
          const res = await axios.get(`${API_BASE_URL}/anime/${animeId}`);
          const image =
            res?.data?.data?.poster ||
            res?.data?.data?.image ||
            res?.data?.poster ||
            res?.data?.image ||
            null;

          if (image) {
            // set poster for every entry that matches animeId
            for (let i = 0; i < updated.length; i++) {
              if (updated[i].animeId === animeId) {
                // Only set poster — preserve other stored metadata
                updated[i] = { ...updated[i], poster: image };
              }
            }
          } else {
            // If API returned no image, we intentionally *do not* clear stored poster;
            // keep whatever is in localStorage (storage-second behavior).
          }
        } catch (err) {
          // API failed for this animeId — keep storage poster if present
          console.warn(`Failed to fetch poster for animeId=${animeId}:`, err?.message || err);
        } finally {
          inProgressRef.current.delete(animeId);
        }
      }

      if (mounted && isMountedRef.current) {
        const sliced = updated.slice(0, 60);
        setContinueList(sliced);
        try {
          localStorage.setItem("continueWatching", JSON.stringify(sliced));
        } catch (e) {
          // ignore localStorage write failures
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleClick = (animeId, epId) => {
    if (!animeId || !epId) return;
    navigate(`/watch/${animeId}?ep=${epId}`);
  };

  // Remove the single entry and also remove any cached poster for the same animeId
  // so that future additions won't reuse the cached poster.
  const handleRemove = (index) => {
    const updated = [...continueList];
    const removed = updated.splice(index, 1);
    const removedAnimeId = removed?.[0]?.animeId;

    // If there are remaining entries with the same animeId, clear their poster too
    const cleaned = updated.map((it) => (it.animeId === removedAnimeId ? { ...it, poster: undefined } : it));

    setContinueList(cleaned);
    try {
      localStorage.setItem("continueWatching", JSON.stringify(cleaned));
    } catch (e) {
      // ignore
    }
  };

  // quick guard: if empty or invalid
  if (!Array.isArray(continueList) || continueList.length === 0) return null;

  return (
    <div className="my-5">
      <h2 className="text-xl font-bold text-[var(--primary)] mb-3">Continue Watching</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {continueList.map((item, index) => {
          // thumb priority: poster (from API if available, else storage) -> thumbnail -> placeholder
          const thumb =
            item?.poster ||
            item?.thumbnail ||
            `https://via.placeholder.com/320x180?text=${encodeURIComponent(
              formatAnimeName(item?.animeName || item?.animeId)
            )}`;

          return (
            <div
              key={`${item?.animeId}-${item?.episodeId}-${index}`}
              className="item flex flex-col items-center overflow-hidden px-1 md:px-2 relative"
            >
              <button
                aria-label="remove"
                className="absolute top-3 right-5 bg-[#89bcf8] rounded-md w-9 h-9 flex items-center justify-center z-40 shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    stroke="black"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    stroke="black"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                role="button"
                tabIndex={0}
                onClick={() => handleClick(item?.animeId, item?.episodeId)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleClick(item?.animeId, item?.episodeId);
                }}
                className="poster group w-full h-0 pb-[150%] bg-lightbg relative overflow-hidden rounded-md"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(31,79,112,0.6), rgba(76,52,140,0.5), rgba(0,0,0,0.7))",
                    backdropFilter: "blur(4px)",
                  }}
                  aria-hidden="true"
                />

                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <img
                    src={playIcon}
                    alt="play icon"
                    className="w-10 h-10 md:w-12 md:h-12 drop-shadow-lg"
                  />
                </div>

                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  src={thumb}
                  alt={item?.animeName || item?.animeId}
                  onError={(e) => {
                    // Per API-first requirement: do NOT attempt another API call here.
                    // If the image fails to load, fall back to the placeholder only.
                    e.currentTarget.src = `https://via.placeholder.com/320x180?text=${encodeURIComponent(
                      formatAnimeName(item?.animeName || item?.animeId)
                    )}`;
                  }}
                />
              </div>

              <div className="w-full mt-2 text-center">
                <button
                  onClick={() => handleClick(item?.animeId, item?.episodeId)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleClick(item?.animeId, item?.episodeId);
                  }}
                  className="title text-base font-semibold text-center truncate w-full transition-colors duration-300 text-white hover:text-[var(--primary)] cursor-pointer"
                  title={item?.animeName || item?.animeId}
                  aria-label={`Watch ${formatAnimeName(item?.animeName || item?.animeId)}`}
                >
                  {formatAnimeName(item?.animeName || item?.animeId)}
                </button>

                <p className="text-sm font-semibold text-white mt-1">
                  Episode: {item?.episodeNumber ?? "-"} (ID: {item?.episodeId ?? "-"})
                </p>

                <p className="text-xs text-gray-300 mt-1">
                  Last watched: {" "}
                  {item?.lastWatched ? new Date(item.lastWatched).toLocaleString() : "-"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContinueWatching;
