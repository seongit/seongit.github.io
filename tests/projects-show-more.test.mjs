import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const configSource = readFileSync(new URL("../src/config.ts", import.meta.url), "utf8")
  .replace("export const siteConfig =", "module.exports.siteConfig =");
const sandbox = { module: { exports: {} } };
vm.runInNewContext(configSource, sandbox);

const { siteConfig } = sandbox.module.exports;
const componentSource = readFileSync(
  new URL("../src/components/Projects.astro", import.meta.url),
  "utf8",
);
const aboutSource = readFileSync(
  new URL("../src/components/About.astro", import.meta.url),
  "utf8",
);
const indexSource = readFileSync(
  new URL("../src/pages/index.astro", import.meta.url),
  "utf8",
);
const headerSource = readFileSync(
  new URL("../src/components/Header.astro", import.meta.url),
  "utf8",
);
const globalCssSource = readFileSync(
  new URL("../src/styles/global.css", import.meta.url),
  "utf8",
);

assert.ok(siteConfig.projects.length > 3, "Projects should have more than the initial visible batch");

for (const project of siteConfig.projects) {
  assert.ok(project.company, `${project.name} should show the company`);
  assert.ok(project.year, `${project.name} should show the year`);
  assert.ok(project.problem, `${project.name} should describe the problem`);
  assert.ok(project.approach, `${project.name} should describe the approach`);
  assert.ok(project.result, `${project.name} should describe the result`);
  assert.ok(Array.isArray(project.skills), `${project.name} should list skills`);
}

assert.match(componentSource, /data-project-card/, "Projects component should mark revealable cards");
assert.match(componentSource, /data-project-skills/, "Project cards should expose skills for filtering");
assert.match(componentSource, /data-projects-show-more/, "Projects component should include a show-more control");
assert.match(componentSource, /data-tech-filter/, "Solutions should include skill filter chips");
assert.match(componentSource, /siteConfig\.skills\.filter/, "Solutions filters should derive from the configured skill list");
assert.match(componentSource, /projectSkillSet\.has/, "Solutions filters should hide skills with no project data");
assert.doesNotMatch(componentSource, /tech-filter-change/, "Solutions filters should not depend on a separate tech stack section");
assert.match(componentSource, /Solutions/, "Projects section should be framed as solutions");
assert.match(componentSource, /project\.company/, "Project cards should render company metadata");
assert.match(componentSource, /project\.year/, "Project cards should render year metadata");
assert.doesNotMatch(componentSource, /0\{index \+ 1\}/, "Project cards should not render numeric prefixes");
assert.doesNotMatch(indexSource, /<About \/>/, "Standalone tech stack section should be removed from the page flow");
assert.doesNotMatch(headerSource, /#tech-stack/, "Header should not link to a removed tech stack section");
assert.doesNotMatch(aboutSource, /소개/, "Intro copy section should be removed");

assert.match(componentSource, /data-detail-trigger/, "Project cards with detail should be clickable triggers");
assert.match(componentSource, /data-detail-template/, "Detail cards should render a hidden detail template");
assert.match(componentSource, /data-detail-modal/, "Projects component should include a detail modal shell");
assert.doesNotMatch(globalCssSource, /\.detail-text\s*\{[^}]*max-width:\s*68ch/s, "Detail text should fill the detail body width");

const detailProjects = siteConfig.projects.filter((project) => project.detail);
assert.ok(detailProjects.length > 0, "At least one project should provide troubleshooting detail");

for (const project of detailProjects) {
  assert.ok(Array.isArray(project.detail.steps) && project.detail.steps.length > 0, `${project.name} detail should include timeline steps`);
  for (const step of project.detail.steps) {
    assert.ok(step.title, `${project.name} detail step should have a title`);
    assert.ok(Array.isArray(step.blocks) && step.blocks.length > 0, `${project.name} step "${step.title}" should include content blocks`);
  }
  if (project.detail.metrics) {
    for (const metric of project.detail.metrics) {
      assert.ok(metric.label && metric.before && metric.after, `${project.name} metric should include label/before/after`);
    }
  }
}

assert.equal(
  JSON.stringify(siteConfig.skills),
  JSON.stringify([
    "Java",
    "Spring Boot",
    "Spring",
    "SQL",
    "JPA",
    "JUnit",
    "JavaScript",
    "TypeScript",
    "Jenkins",
    "SonarQube",
    "Docker",
    "Kubernetes",
    "Claude Code",
    "Codex",
    "Cursor",
  ]),
);
