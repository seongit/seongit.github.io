import assert from "node:assert/strict";
import { parseBlogPosts } from "../src/utils/rss.js";

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <item>
      <title>첫 번째 글 &amp; 정리</title>
      <link>https://example.com/1</link>
      <pubDate>Tue, 30 Jun 2026 16:22:55 +0900</pubDate>
      <description>&lt;p&gt;&lt;img src=&quot;https://example.com/thumb.png&quot; /&gt;문제 해결 과정입니다.&lt;/p&gt;</description>
    </item>
    <item>
      <title><![CDATA[두 번째 글]]></title>
      <link>https://example.com/2</link>
      <pubDate>Mon, 29 Jun 2026 10:00:00 +0900</pubDate>
      <description><![CDATA[<p>이미지 없는 글입니다.</p>]]></description>
    </item>
    <item>
      <title>세 번째 글</title>
      <link>https://example.com/3</link>
      <pubDate>Sun, 28 Jun 2026 10:00:00 +0900</pubDate>
      <description>설명</description>
    </item>
    <item>
      <title>네 번째 글</title>
      <link>https://example.com/4</link>
      <pubDate>Sat, 27 Jun 2026 10:00:00 +0900</pubDate>
      <description>보이면 안 됨</description>
    </item>
  </channel>
</rss>`;

const posts = parseBlogPosts(rss, 3);

assert.equal(posts.length, 3);
assert.deepEqual(
  posts.map((post) => post.title),
  ["첫 번째 글 & 정리", "두 번째 글", "세 번째 글"],
);
assert.equal(posts[0].link, "https://example.com/1");
assert.equal(posts[0].date, "2026.06.30");
assert.equal(posts[0].image, "https://example.com/thumb.png");
assert.equal(posts[0].description, "문제 해결 과정입니다.");
assert.equal(posts[1].image, "");

const longDescription = parseBlogPosts(`
<rss><channel><item>
  <title>긴 글</title>
  <link>https://example.com/long</link>
  <pubDate>Tue, 30 Jun 2026 16:22:55 +0900</pubDate>
  <description>${"가".repeat(160)}</description>
</item></channel></rss>
`);

assert.ok(longDescription[0].description.endsWith("..."));
assert.ok(longDescription[0].description.length <= 143);
