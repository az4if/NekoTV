import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Uncomment and adjust if you want the component to attempt fetching missing thumbnails
// import { API_BASE_URL } from "../services/useApi";

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

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("continueWatching")) || [];
      setContinueList(stored.slice(0, 60));
    } catch (err) {
      console.error("Failed to parse continueWatching from localStorage:", err);
      setContinueList([]);
    }
  }, []);

  const handleClick = (animeId, epId) => {
    if (!animeId || !epId) return;
    navigate(`/watch/${animeId}?ep=${epId}`);
  };

  const handleRemove = (index) => {
    const updated = [...continueList];
    updated.splice(index, 1);
    setContinueList(updated);
    localStorage.setItem("continueWatching", JSON.stringify(updated));
  };

  // OPTIONAL: backfill missing thumbnails by calling your API
  // This is commented out by default to avoid unexpected network calls.
  /*
  useEffect(() => {
    let mounted = true;
    const needsFetch = continueList.some((i) => !i.thumbnail);
    if (!needsFetch) return;

    (async () => {
      const updated = await Promise.all(
        continueList.map(async (item) => {
          if (item.thumbnail) return item;
          try {
            const res = await axios.get(`${API_BASE_URL}/anime/${item.animeId}`);
            const image =
              res?.data?.data?.image || res?.data?.data?.poster || res?.data?.image || null;
            return {
              ...item,
              thumbnail:
                image ||
                `https://via.placeholder.com/320x180?text=${encodeURIComponent(
                  formatAnimeName(item.animeName || item.animeId)
                )}`,
            };
          } catch (err) {
            return {
              ...item,
              thumbnail: `https://via.placeholder.com/320x180?text=${encodeURIComponent(
                formatAnimeName(item.animeName || item.animeId)
              )}`,
            };
          }
        })
      );

      if (mounted) {
        setContinueList(updated);
        localStorage.setItem("continueWatching", JSON.stringify(updated));
      }
    })();

    return () => {
      mounted = false;
    };
  }, [continueList]);
  */

  if (!Array.isArray(continueList) || continueList.length === 0) return null;

  return (
    <div className="my-5">
      <h2 className="text-xl font-bold text-[var(--primary)] mb-3">Continue Watching</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {continueList.map((item, index) => {
          const thumb =
            item?.thumbnail ||
            `https://via.placeholder.com/320x180?text=${encodeURIComponent(
              formatAnimeName(item?.animeName || item?.animeId)
            )}`;

          return (
            <article
              key={`${item?.animeId}-${item?.episodeId}-${index}`}
              className="bg-[#145183] rounded-lg p-2 relative cursor-pointer hover:opacity-90"
            >
              <button
                aria-label="remove"
                className="absolute top-1 right-1 text-white font-extrabold text-lg z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
              >
                ✕
              </button>

              <div
                onClick={() => handleClick(item?.animeId, item?.episodeId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleClick(item?.animeId, item?.episodeId);
                }}
              >
                <div className="w-full h-36 md:h-40 overflow-hidden rounded-md mb-2 bg-gray-200">
                  <img
                    src={thumb}
                    alt={`${formatAnimeName(item?.animeName || item?.animeId)} poster`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/320x180?text=${encodeURIComponent(
                        formatAnimeName(item?.animeName || item?.animeId)
                      )}`;
                    }}
                  />
                </div>

                <h3 className="text-base text-white font-semibold truncate">
                  {formatAnimeName(item?.animeName || item?.animeId)}
                </h3>
                <p className="text-sm text-gray-200 mt-1">
                  Episode: {item?.episodeNumber ?? "-"} (ID: {item?.episodeId ?? "-"})
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  Last watched: {item?.lastWatched ? new Date(item.lastWatched).toLocaleString() : "-"}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ContinueWatching;
