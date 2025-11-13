import { useState } from "react";

interface SearchResult {
  title: string;
  path: string;
  snippet: string;
  html?: string;
  score?: number;
}

export default function App() {
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // 🔵 Single Button → Index + Search
  const runIndexAndSearch = async () => {
    if (!url.trim() || !query.trim()) return;
    setLoading(true);

    try {
      // Step 1: Index website
      const indexRes = await fetch(`/index?url=${encodeURIComponent(url)}`, {
        method: "POST",
      });

      if (!indexRes.ok) {
        alert("Failed to index the site.");
        return;
      }

      // Step 2: Search
      const searchRes = await fetch(
        `/search?query=${encodeURIComponent(query)}`
      );
      const data = await searchRes.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const toggleHtml = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center space-y-10">
      <h1 className="text-4xl font-bold">DomSearch</h1>

      {/* Input Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl space-y-4">
        <h2 className="text-xl font-semibold">Index & Search</h2>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="text"
          placeholder="Search Query (AI)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        <button
          onClick={runIndexAndSearch}
          className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-lg text-gray-600">Loading...</p>}

      {/* Results */}
      <div className="w-full max-w-4xl space-y-6">
        {results.map((r, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 relative"
          >
            {/* Match % badge */}
            {r.score && (
              <div className="absolute right-4 top-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                {Math.round(r.score)}% match
              </div>
            )}

            {/* Title */}
            <h2 className="text-xl font-semibold mb-2">{r.title}</h2>

            {/* Path */}
            <p className="text-gray-600 text-sm mb-3">Path: {r.path}</p>

            {/* View HTML toggle */}
            <button
              className="text-blue-600 text-sm font-medium mb-3"
              onClick={() => toggleHtml(i)}
            >
              {openIndex === i ? "▼ View HTML" : "► View HTML"}
            </button>

            {/* HTML snippet */}
            {openIndex === i && (
              <pre className="bg-gray-900 text-green-200 p-4 rounded-xl overflow-auto text-sm max-h-64 whitespace-pre-wrap">
                {r.html || r.snippet || "No HTML available"}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
