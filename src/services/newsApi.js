// src/services/newsApi.js

export const fetchNewsData = async (type, searchItem = "") => {
  const apiKey = "ef18c5b3b9724af789e0b6b374d9d9ad";
  let url = "";

  const domains = [
    "indiatimes.com",
    "ndtv.com",
    "thehindu.com",
    "hindustantimes.com",
    "indiatoday.in",
  ];

  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);
  const from = weekAgo.toISOString().split("T")[0];
  const to = today.toISOString().split("T")[0];

  if (type === "default") {
    url = `https://newsapi.org/v2/top-headlines?sources=the-times-of-india,the-hindu&apiKey=${apiKey}`;
  } else {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      searchItem
    )}&domains=${domains.join(",")}&from=${from}&to=${to}&sortBy=publishedAt&apiKey=${apiKey}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "ok") throw new Error(data.message || "API error");

  const validArticles = (data.articles || []).filter(
    (a) => a.title && a.description && a.urlToImage
  );

  return validArticles;
};
