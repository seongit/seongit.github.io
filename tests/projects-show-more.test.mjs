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
assert.match(componentSource, /data-projects-show-more/, "Projects component should include a show-more control");
assert.match(componentSource, /Problem Solving/, "Projects section should be framed as problem solving");
assert.match(componentSource, /project\.company/, "Project cards should render company metadata");
assert.match(componentSource, /project\.year/, "Project cards should render year metadata");
assert.doesNotMatch(componentSource, /0\{index \+ 1\}/, "Project cards should not render numeric prefixes");
