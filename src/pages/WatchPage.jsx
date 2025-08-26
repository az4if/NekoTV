import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import Player from "../components/Player";
import Episodes from "../layouts/Episodes";
import { useApi } from "../services/useApi";
import PageNotFound from "./PageNotFound";
import { MdTableRows } from "react-icons/md";
import { HiMiniViewColumns } from "react-icons/hi2";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import { DiscussionEmbed } from "disqus-react";

const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const WatchPage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [layout, setLayout] = useState("row");

  const ep = searchParams.get("ep");
  const { data, isError } = useApi(`/episodes/${id}`);
  const episodes = data?.data;

  const formattedAnimeName = (() => {
    const parts = id.split("-");
    const lastPart = parts[parts.length - 1];
    const nameParts = /^\d+$/.test(lastPart) ? parts.slice(0, -1) : parts;
    const firstThree = nameParts.slice(0, 3).join(" ");
    return nameParts.length > 3
      ? `${capitalizeWords(firstThree)}...`
      : capitalizeWords(nameParts.join(" "));
  })();

  const updateParams = (newParam) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("ep", newParam);
      return newParams;
    });
  };

  useEffect(() => {
    if (!ep && Array.isArray(episodes) && episodes.length > 0) {
      const firstEp = episodes[0].id.split("ep=").pop();
      updateParams(firstEp);
    }
  }, [ep, episodes, setSearchParams]);

  useEffect(() => {
    if (!episodes) return;

    try {
      const stored = JSON.parse(localStorage.getItem("continueWatching")) || [];
      const currentEpObj =
        episodes.find((e) => e.id.split("ep=").pop() === ep) || episodes[0];
      if (!currentEpObj) return;

      const animeNameFromId = capitalizeWords(
        id.replace(/-\d+$/, "").replace(/-/g, " ")
      );

      const newEntry = {
        animeId: id,
        animeName: animeNameFromId,
        episodeNumber: currentEpObj.episodeNumber,
        episodeId: currentEpObj.id.split("ep=").pop(),
        episodesCount: episodes.length,
        lastWatched: new Date().toISOString(),
        thumbnail:
          currentEpObj?.thumbnail ||
          currentEpObj?.image ||
          currentEpObj?.poster ||
          currentEpObj?.animeImage ||
          episodes[0]?.thumbnail ||
          episodes[0]?.image ||
          episodes[0]?.poster ||
          episodes[0]?.animeImage ||
          `https://via.placeholder.com/320x180?text=${encodeURIComponent(
            animeNameFromId
          )}`,
      };

      const filtered = stored.filter((a) => a.animeId !== id);
      filtered.unshift(newEntry);
      const sliced = filtered.slice(0, 60);
      localStorage.setItem("continueWatching", JSON.stringify(sliced));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  }, [episodes, id, ep]);

  if (isError) return <PageNotFound />;
  if (!episodes) return <Loader className="h-screen" />;

  const currentEp =
    episodes &&
    ep !== null &&
    episodes.find((e) => e.id.split("ep=").pop() === ep);

  const changeEpisode = (action) => {
    if (!currentEp) return;
    const currentIndex = currentEp.episodeNumber - 1;
    const targetEp =
      action === "next"
        ? episodes[currentIndex + 1]
        : episodes[currentIndex - 1];

    if (targetEp) updateParams(targetEp.id.split("ep=").pop());
  };

  const hasNextEp = Boolean(episodes[currentEp?.episodeNumber - 1 + 1]);
  const hasPrevEp = Boolean(episodes[currentEp?.episodeNumber - 1 - 1]);

  return (
    <>
      <div className="bg-backGround pt-14 max-w-screen-xl mx-auto py-2 md:px-2">
        <Helmet>
          <title>
            Watch {formattedAnimeName} Online, Free Anime Streaming Online on
            NekoTV Anime Website
          </title>
          <meta property="og:title" content="watch - NekoTV" />
        </Helmet>

        <div className="flex flex-col gap-2">
          <div className="path flex mb-2 mx-2 items-center gap-2 text-base ">
            <Link to="/home">
              <h4 className="hover:text-primary">Home</h4>
            </Link>
            <span className="h-1 w-1 rounded-full bg-primary"></span>
            <Link to={`/anime/${id}`}>
              <h4 className="hover:text-primary">{formattedAnimeName}</h4>
            </Link>
            <span className="h-1 w-1 rounded-full bg-primary"></span>
            <h4 className="gray">{`Episode ${currentEp?.episodeNumber}`}</h4>
          </div>

          {ep && id && (
            <Player
              id={id}
              episodeId={`${id}?ep=${ep}`}
              currentEp={currentEp}
              changeEpisode={changeEpisode}
              hasNextEp={hasNextEp}
              hasPrevEp={hasPrevEp}
            />
          )}

          <div className="input w-full mt-2 flex items-end justify-end gap-3 text-end">
            <div className="btns bg-btnbg flex mx-2 rounded-child">
              <button
                className={`row item p-2 ${
                  layout === "row" ? "bg-primary text-black" : undefined
                }`}
                onClick={() => setLayout("row")}
              >
                <MdTableRows size={"20px"} />
              </button>
              <button
                className={`column item p-2 ${
                  layout === "column" ? "bg-primary text-black" : undefined
                }`}
                onClick={() => setLayout("column")}
              >
                <HiMiniViewColumns size={"20px"} />
              </button>
            </div>
          </div>

          <ul
            className={`episodes max-h-[50vh] py-4 px-2 overflow-scroll bg-lightbg grid gap-1 md:gap-2 ${
              layout === "row"
                ? " grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : " grid-cols-5 md:grid-cols-10"
            }`}
          >
            {episodes?.map((episode) => (
              <Episodes
                key={episode.id}
                episode={episode}
                currentEp={currentEp}
                layout={layout}
              />
            ))}
          </ul>
          <div className="w-full mt-6 p-4 rounded-lg" style={{ background: "#145183" }}>
            <DiscussionEmbed
              shortname="nekotv"
              config={{
                url: window.location.href,
                identifier: `${id}-ep-${ep}`,
                title: `${formattedAnimeName} - Episode ${currentEp?.episodeNumber}`,
                language: "en",
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-backGround mt-10">
        <Footer />
      </div>
    </>
  );
};

export default WatchPage;
