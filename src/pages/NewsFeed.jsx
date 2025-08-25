import { useEffect, useState } from "react";
import { fetchNewsData } from "../services/newsApi";
import NewsCard from "../components/NewsCard"; // ✅ if you made a separate NewsCard

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [hasMore, setHasMore] = useState("true");
  const [page, setPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState("");

  const topics = [
    "Business",
    "Technology",
    "Sports",
    "Politics",
    "Entertainment",
    "Health",
  ];

  // ✅ Call the helper function based on type
  const handleFetch = async (type, term = "", pageNum = 1) => {
    setLoading(true);
    try {
      const results = await fetchNewsData(
        type,
        term,
        pageNum
      );
      setArticles(results);
      if (pageNum === 1) {
        setArticles(results);
      } else {
        setArticles((prev) => [...prev, ...results]);
      }
      setHasMore(results.length === 10);
    } catch (err) {
      console.error(err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ On mount, get default news
  useEffect(() => {
    handleFetch("default");
  }, []);

  // ✅ When user clicks search
  const handleSearch = () => {
    if (searchItem.trim() === "") return;
    setPage(1);
    handleFetch("search", searchItem, 1);
  };

  // ✅ When user clicks a topic
  const handleTopicClick = (topic) => {
    setSearchItem(topic);
    setPage(1);
    handleFetch("topic", topic, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    handleFetch(
      searchItem ? "search" : "default",
      searchItem || "India",
      nextPage
    );
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Top bar: Filters, Date range, Search */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Hamburger for mobile */}
        <div className="flex sm:hidden items-center mb-2">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="ml-2 font-semibold text-gray-700">Filters</span>
        </div>

        {/* Sidebar overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Sidebar drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow z-50 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Popular Topics</h2>
            <div className="flex flex-col gap-2">
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => {
                    handleTopicClick(topic);
                    setIsSidebarOpen(false);
                  }}
                  className="bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-800 px-3 py-2 rounded-md transition text-sm text-left"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-700">Filters:</span>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className="bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-800 px-3 py-1 rounded-md transition text-sm"
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search news..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200 w-full sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>

      {/* Feed */}
      {loading ? (
        <p className="text-center text-gray-600">Loading news...</p>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-600">No articles found.</p>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {articles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && !loading && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
