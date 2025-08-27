import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import useSidebarStore from "./store/sidebarStore";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import ScrollToTop from "./utils/ScrollToTop";
import SearchResult from "./pages/SearchResult";
import WatchPage from "./pages/WatchPage";
import PageNotFound from "./pages/PageNotFound";
import PeopleInfoPage from "./pages/PeopleInfoPage";
import CharacterInfoPage from "./pages/CharacterInfoPage";
import CharactersPage from "./pages/CharactersPage";
import About from "./pages/About";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DMCA from "./pages/DMCA";

const App = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const togglesidebar = useSidebarStore((state) => state.toggleSidebar);
  const location = useLocation();
  const path = location.pathname === "/";

  return (
    <>
      {!path && <Sidebar />}

      <main className={`${isSidebarOpen ? "bg-active" : ""} opacityWrapper`}>
        <div
          onClick={togglesidebar}
          className={`${isSidebarOpen ? "active" : ""} opacityBg`}
        ></div>
        {!path && <Header />}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/home" element={<Home />} />
          <Route path="/anime/:id" element={<DetailPage />} />
          <Route path="/animes/:category/:query?" element={<ListPage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/characters/:id" element={<CharactersPage />} />
          <Route path="/people/:id" element={<PeopleInfoPage />} />
          <Route path="/character/:id" element={<CharacterInfoPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/dmca" element={<DMCA />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
