import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templateDir = path.join(root, "templates", "problem-package");
const problemsDir = path.join(root, "problems");

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function usage() {
  console.log("Usage: node scripts/new-problem.mjs \"Problem Title\" [problem-slug]");
  process.exit(1);
}

const title = process.argv[2];
const slug = process.argv[3] || slugify(title || "");

if (!title || !slug) {
  usage();
}

const targetDir = path.join(problemsDir, slug);
if (existsSync(targetDir)) {
  throw new Error(`Problem folder already exists: problems/${slug}`);
}

cpSync(templateDir, targetDir, { recursive: true });
mkdirSync(path.join(targetDir, "assets"), { recursive: true });
mkdirSync(path.join(targetDir, "variants"), { recursive: true });

const id = `MOS-${slug.toUpperCase().replace(/[^A-Z0-9]+/g, "-").slice(0, 18)}-001`;

const problemPath = path.join(targetDir, "problem.json");
const problem = JSON.parse(readFileSync(problemPath, "utf8"));
problem.id = id;
problem.slug = slug;
problem.title = title;
problem.summary = "Replace with a one-sentence context-rich mechanics problem summary.";
writeFileSync(problemPath, `${JSON.stringify(problem, null, 2)}\n`);

const indexPath = path.join(targetDir, "index.qmd");
let index = readFileSync(indexPath, "utf8");
index = index
  .replace(/title: "Replace With Problem Title"/, `title: "${title.replace(/"/g, '\\"')}"`)
  .replace(/description: "One-sentence problem summary\."/, 'description: "Replace with a one-sentence context-rich mechanics problem summary."')
  .replace(/problem_id: "MOS-NEW-001"/, `problem_id: "${id}"`);
writeFileSync(indexPath, index);

console.log(`Created problems/${slug}`);
console.log("Next steps:");
console.log(`1. Add the problem image at problems/${slug}/assets/problem-image.png`);
console.log(`2. Edit problems/${slug}/problem.json, variables.json, and questions.json`);
console.log("3. Run node scripts/build-catalog.mjs");
