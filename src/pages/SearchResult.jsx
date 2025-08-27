import React from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteApi } from "../services/useApi";
import PageNotFound from "./PageNotFound";
import Loader from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../components/Image";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteApi(`/search?keyword=${keyword}&page=`);

  const pages = data?.pages || [];

  const isEmpty =
    !isLoading &&
    pages.length > 0 &&
    pages.every((page) => page.data?.response?.length === 0);

  const isCompletelyEmpty = !isLoading && pages.length === 0;

  return (
    <div className="list-page pt-20">
      <Helmet>
        <title>Search Results for "{keyword}"</title>
        <meta property="og:title" content={`Search - ${keyword} - NekoTV`} />
      </Helmet>

      <div className="xl:mx-10 sm:mx-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mt-2 mb-3 font-bold ml-0" style={{ color: 'var(--primary)' }}>
          Search Results for "
          <span style={{ color: '#89bcf8' }}>{keyword}</span>"
        </h1>

        {isLoading ? (
          <Loader className="h-[100dvh]" />
        ) : isError && !isEmpty && !isCompletelyEmpty ? (
          <PageNotFound />
        ) : isEmpty || isCompletelyEmpty ? (
          <div className="text-center text-lg text-gray-400 my-10">
            No Results Found For <strong>{keyword}</strong>.
          </div>
        ) : (
          <InfiniteScroll
            dataLength={data?.pages.flat().length || 0}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<Loader className="h-fit" />}
            endMessage={<Footer />}
          >
            <div className="flex flex-wrap justify-around items-center">
              {pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {page.data?.response?.map((item, index) => (
                    <div key={item.id + index} className="flw-item">
                      <Image data={item} />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
