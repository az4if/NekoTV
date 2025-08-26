import { useParams } from "react-router-dom";
import { useInfiniteApi } from "../services/useApi";
import Loader from "../components/Loader";
import PageNotFound from "./PageNotFound";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../components/Image";
import Heading from "../components/Heading";
import AZ from "../layouts/AZ";
import React from "react";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import { genres } from "../utils/genres";

const ListPage = () => {
  const validateQueries = [
    "top-airing",
    "most-popular",
    "most-favorite",
    "completed",
    "recently-added",
    "recently-updated",
    "top-upcoming",
    "subbed-anime",
    "dubbed-anime",
    "movie",
    "tv",
    "ova",
    "ona",
    "special",
    "az-list",
    "genre",
    "producer",
  ];

  const { category, query = null } = useParams();
  const isValidQuery = validateQueries.includes(category);

  if (!isValidQuery) {
    return <PageNotFound />;
  }

  const azQueryMap = {
    "az-list": "ALL",
    other: "#",
  };

  const displayNameMap = {
    "top-airing": "Top Airing",
    "most-popular": "Most Popular",
    "most-favorite": "Most Favorite",
    completed: "Latest Completed",
    "recently-added": "Recently Added",
    "recently-updated": "Recently Updated",
    "top-upcoming": "Top Upcoming",
    "subbed-anime": "Subbed",
    "dubbed-anime": "Dubbed",
    movie: "Movies",
    tv: "TV Shows",
    ova: "OVAs",
    ona: "ONAs",
    special: "Specials",
    "az-list": "A-Z List",
    genre: "Genre",
  };

  let displayTitle = "";

  if (category === "az-list") {
    displayTitle = azQueryMap[query] || query?.toUpperCase() || "ALL";
  } else if (category === "genre") {
    const matchedGenre = genres.find(
      (g) => g.toLowerCase() === query?.toLowerCase()
    );
    displayTitle = matchedGenre ? `${matchedGenre} Anime` : "Genre Anime";
  } else if (category === "producer") {
    displayTitle = `${query
      ?.replace(/-/g, " ")
      ?.replace(/\b\w/g, (l) => l.toUpperCase())} Anime`;
  } else {
    displayTitle = `${displayNameMap[category] || category} Anime`;
  }

  const endpoint = `/animes/${category}${query ? `/${query}` : ""}?page=`;
  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteApi(endpoint);

  if (isError) {
    return <PageNotFound />;
  }

  const pages = data?.pages;

  return (
    <div className="list-page pt-14">
      <Helmet>
        <title>{displayTitle}</title>
        <meta property="og:title" content="explore - AniMix" />
      </Helmet>

      {category === "az-list" && (
        <div className="mt-10 mb-6">
          <AZ selected={query} />
        </div>
      )}

      <div className="xl:mx-10 sm:mx-2">
        {pages && !isLoading ? (
          <InfiniteScroll
            dataLength={data?.pages.flat().length || 0}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<Loader className="h-fit" />}
            endMessage={<Footer />}
          >
            <Heading
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mt-2 mb-3 font-bold ml-0"
              style={{ color: "var(--primary)" }}
            >
              {displayTitle}
            </Heading>

            <div className="flex flex-wrap justify-around items-center">
              {pages?.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {page.data.response.map((item, index) => (
                    <div key={item.id + index} className="flw-item">
                      <Image data={item} />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <Loader className="h-[100dvh]" />
        )}
      </div>
    </div>
  );
};

export default ListPage;
