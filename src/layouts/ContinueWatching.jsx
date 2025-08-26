import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../services/useApi";

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

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("continueWatching")) || [];
    const animeIdsToFetch = [
      ...new Set(stored.filter((i) => !i?.poster).map((i) => i.animeId)),
    ];

    if (animeIdsToFetch.length === 0) return;

    let mounted = true;

    (async () => {
      const updated = [...stored];

      for (const animeId of animeIdsToFetch) {
        try {
          const res = await axios.get(`${API_BASE_URL}/anime/${animeId}`);
          const image =
            res?.data?.data?.poster ||
            res?.data?.data?.image ||
            res?.data?.poster ||
            res?.data?.image ||
            null;

          if (image) {
            for (let i = 0; i < updated.length; i++) {
              if (updated[i].animeId === animeId && !updated[i].poster) {
                updated[i] = { ...updated[i], poster: image };
              }
            }
          }
        } catch (err) {
          console.warn(
            `Failed to fetch poster for animeId=${animeId}:`,
            err?.message || err
          );
        }
      }

      if (mounted) {
        const sliced = updated.slice(0, 60);
        setContinueList(sliced);
        localStorage.setItem("continueWatching", JSON.stringify(sliced));
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

  const handleRemove = (index) => {
    const updated = [...continueList];
    updated.splice(index, 1);
    setContinueList(updated);
    localStorage.setItem("continueWatching", JSON.stringify(updated));
  };

  if (!Array.isArray(continueList) || continueList.length === 0) return null;

  return (
    <div className="my-5">
      <h2 className="text-xl font-bold text-[var(--primary)] mb-3">
        Continue Watching
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {continueList.map((item, index) => {
          const thumb =
            item?.poster ||
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
                className="absolute top-2 right-2 bg-[#89bcf8] rounded-md w-9 h-9 flex items-center justify-center z-10 shadow-md"
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
                onClick={() => handleClick(item?.animeId, item?.episodeId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    handleClick(item?.animeId, item?.episodeId);
                }}
              >
                <div className="w-full h-56 md:h-75 overflow-hidden rounded-md mb-2 bg-gray-200">
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
                  Last watched:{" "}
                  {item?.lastWatched ? new Date(item.lastWatched).toLocaleString() : "-"}
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


