import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const configSource = readFileSync(
  new URL("../src/config.ts", import.meta.url),
  "utf8",
).replace("export const siteConfig =", "module.exports.siteConfig =");

const sandbox = { module: { exports: {} } };
vm.runInNewContext(configSource, sandbox);

const { siteConfig } = sandbox.module.exports;
const heroSource = readFileSync(
  new URL("../src/components/Hero.astro", import.meta.url),
  "utf8",
);

assert.equal(siteConfig.resumeHero.greeting, "안녕하세요");
assert.equal(siteConfig.resumeHero.particle, "을");
assert.equal(siteConfig.resumeHero.assetSuffix, "자산으로 만드는");
assert.equal(siteConfig.resumeHero.closing, "풀스택 개발자 김성은입니다.");
assert.equal(
  JSON.stringify(siteConfig.resumeHero.rotatorWords),
  JSON.stringify(["지식", "경험", "노하우"]),
);

assert.match(heroSource, /data-rotator-word/);
assert.doesNotMatch(heroSource, /data-rotator-progress/);
assert.match(heroSource, /resumeHero\.greeting/);
assert.match(heroSource, /data-rotator-particle/);
assert.match(heroSource, /resumeHero\.assetSuffix/);
assert.doesNotMatch(heroSource, /data-asset-underline/);
assert.match(heroSource, /resumeHero\.closing/);
assert.doesNotMatch(heroSource, /data-name-underline/);
assert.match(heroSource, /data-hero-evidence/);
assert.match(heroSource, /hero-contact-link/);
assert.match(heroSource, /data-resume-download/);
assert.match(heroSource, /PUBLIC_RESUME_ADMIN_PASSWORD/);
assert.match(heroSource, /seongeun_resume_\$/);
