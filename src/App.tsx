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
    <div className="min-h-screen relative overflow-hidden">
      {/* Single Color Background */}
      <div className="absolute inset-0 bg-slate-800"></div>

      {/* Animated Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-indigo-300/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-purple-300/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-emerald-400/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-teal-300/40 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-16 left-16 w-32 h-32 border border-white/5 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-32 right-24 w-24 h-24 border border-cyan-300/10 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 border border-indigo-300/8 rounded-full animate-bounce" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-16 right-16 w-28 h-28 border border-purple-300/6 rounded-lg rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col items-center space-y-12 min-h-screen backdrop-blur-[0.5px]">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">

          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            DomSearch
          </h1>
        </div>
        <p className="text-slate-300 text-lg max-w-2xl">
          Intelligent web content search powered by AI. Index websites and find exactly what you need.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-slate-900/90 backdrop-blur-md shadow-2xl border border-slate-700/50 rounded-2xl p-8 w-full max-w-xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-white">Index & Search</h2>
          <p className="text-slate-400 text-sm">Enter a website URL and your search query to get started</p>
        </div>

        <div className="space-y-4">
          {/* URL Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 bg-slate-800/50"
            />
          </div>

          {/* Query Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search Query (AI-powered)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 bg-slate-800/50"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={runIndexAndSearch}
            disabled={!url.trim() || !query.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-4 rounded-xl hover:from-indigo-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Search</span>
            </div>
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-600 rounded-full animate-spin border-t-cyan-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-white">Searching...</p>
            <p className="text-sm text-slate-400">Indexing website and analyzing content</p>
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="w-full max-w-5xl space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-white mb-2">Search Results</h3>
            <p className="text-slate-400">Found {results.length} result{results.length !== 1 ? 's' : ''}</p>
          </div>

          <div className="space-y-8">
            {results.map((r, i) => (
              <div
                key={i}
                className="bg-slate-900/90 backdrop-blur-md shadow-2xl border border-slate-700/50 rounded-2xl p-8 hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] group"
              >
                {/* Match % badge */}
                {r.score && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg border-4 border-white">
                    {Math.round(r.score)}% match
                  </div>
                )}

                <div className="flex items-start space-x-4">


                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                      {r.title}
                    </h2>

                    {/* Path */}
                    <div className="flex items-center space-x-2 mb-4">
                      <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <p className="text-slate-400 text-sm truncate">{r.path}</p>
                    </div>

                    {/* Snippet preview */}
                    {r.snippet && (
                      <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {r.snippet.length > 200 ? `${r.snippet.substring(0, 200)}...` : r.snippet}
                      </p>
                    )}

                    {/* View HTML toggle */}
                    <button
                      className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors duration-200 group/btn"
                      onClick={() => toggleHtml(i)}
                    >
                      <svg className={`w-4 h-4 transition-transform duration-200 ${openIndex === i ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span>{openIndex === i ? 'Hide HTML Source' : 'View HTML Source'}</span>
                    </button>

                    {/* HTML snippet */}
                    {openIndex === i && (
                      <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="bg-gray-900 text-green-400 p-6 rounded-xl overflow-auto text-sm max-h-96 border border-gray-700 shadow-inner">
                          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
                            {r.html || r.snippet || "No HTML available"}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && results.length === 0 && (
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">No Results Found</h3>
            <p className="text-slate-400 text-sm">Try searching for different keywords or indexing a different website.</p>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
