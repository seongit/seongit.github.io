const entityMap = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
      if (entity[0] === "#") {
        const codePoint =
          entity[1]?.toLowerCase() === "x"
            ? Number.parseInt(entity.slice(2), 16)
            : Number.parseInt(entity.slice(1), 10);
        return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
      }

      return entityMap[entity.toLowerCase()] ?? match;
    });
}

function getTagValue(item, tagName) {
  const match = item.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? decodeEntities(match[1].trim()) : "";
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const part = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return `${part.year}.${part.month}.${part.day}`;
}

function extractImage(html) {
  return html.match(/<img\b[^>]*?\bsrc=["']([^"']+)["']/i)?.[1] ?? "";
}

function toPlainText(html) {
  const text = decodeEntities(html)
    .replace(/<img\b[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > 140 ? `${text.slice(0, 140).trim()}...` : text;
}

export function parseBlogPosts(rss, limit = 3) {
  return [...rss.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)]
    .map(([, item]) => {
      const descriptionHtml = getTagValue(item, "description");
      const pubDate = getTagValue(item, "pubDate");

      return {
        title: getTagValue(item, "title"),
        link: getTagValue(item, "link"),
        date: formatDate(pubDate),
        image: extractImage(descriptionHtml),
        description: toPlainText(descriptionHtml),
        timestamp: new Date(pubDate).getTime() || 0,
      };
    })
    .filter((post) => post.title && post.link)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit)
    .map(({ timestamp, ...post }) => post);
}

export async function fetchBlogPosts(rssUrl, limit = 3) {
  if (!rssUrl) return [];

  try {
    const response = await fetch(rssUrl, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) return [];

    return parseBlogPosts(await response.text(), limit);
  } catch {
    return [];
  }
}
