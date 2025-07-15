import { useEffect, useState } from "react";
import { fetchNewsData } from "../services/newsApi";
import NewsCard from "../components/NewsCard"; // ✅ if you made a separate NewsCard

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");

  const topics = ["Cricket", "Politics", "Technology", "Sports", "Finance"];

  // ✅ Call the helper function based on type
  const handleFetch = async (type, term = "") => {
    setLoading(true);
    try {
      const results = await fetchNewsData(type, term);
      setArticles(results);
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
    handleFetch("search", searchItem);
  };

  // ✅ When user clicks a topic
  const handleTopicClick = (topic) => {
    setSearchItem(topic);
    handleFetch("topic", topic);
  };

  return (
    <>
      {/* TOP BAR: Popular Topics + Search */}
      <div className="mb-2 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-6xl mx-auto px-4">
        {/* Popular Topics */}
        <div className="hidden sm:flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-700 mr-2">Popular:</span>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className="bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-800 px-3 py-1 rounded-md transition duration-200 text-sm"
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="flex w-full sm:w-auto flex-col sm:flex-row items-center gap-2">
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

      {/* NEWS GRID */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-700">Loading news....</p>
        </div>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-600">No articles found.</p>
      ) : (
        <div className="container mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} /> // ✅ if using NewsCard
          ))}
        </div>
      )}
    </>
  );
}
