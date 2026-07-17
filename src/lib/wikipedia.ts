const WIKI_BASE = "https://en.wikipedia.org";

export interface WikiSearchResult {
  title: string;
  description: string;
  pageUrl: string;
}

export interface WikiSummary {
  title: string;
  extract: string;
  thumbnailUrl: string | null;
  sourceUrl: string;
  isDisambiguation: boolean;
}

export async function searchWikipedia(query: string): Promise<WikiSearchResult[]> {
  const url = new URL(`${WIKI_BASE}/w/api.php`);
  url.search = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: query,
    format: "json",
    origin: "*",
  }).toString();

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Wikipedia search failed: ${res.status}`);
  const data = await res.json();

  return data.query.search.map((r: any) => ({
    title: r.title,
    description: r.snippet.replace(/<[^>]+>/g, ""),
    pageUrl: `${WIKI_BASE}/wiki/${encodeURIComponent(r.title.replace(/ /g, "_"))}`,
  }));
}

export async function getWikipediaSummary(title: string): Promise<WikiSummary> {
  const url = `${WIKI_BASE}/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(url);

  if (res.status === 404) {
    throw new Error(`No Wikipedia page found for "${title}"`);
  }
  if (!res.ok) throw new Error(`Wikipedia summary fetch failed: ${res.status}`);

  const data = await res.json();

  return {
    title: data.title,
    extract: data.extract,
    thumbnailUrl: data.thumbnail?.source ?? null,
    sourceUrl: data.content_urls?.desktop?.page ?? `${WIKI_BASE}/wiki/${title}`,
    isDisambiguation: data.type === "disambiguation",
  };
}