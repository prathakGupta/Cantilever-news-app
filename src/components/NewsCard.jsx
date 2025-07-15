export default function NewsCard({ article }) {
  return (
    <div className="bg-white shadow-2xl rounded p-4 flex flex-col h-full">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-lg font-bold mb-2">{article.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{article.description}</p>
      <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
        <span>{article.source?.name}</span>
        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
      </div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline text-sm mt-auto"
      >
        Read more →
      </a>
    </div>
  );
}
