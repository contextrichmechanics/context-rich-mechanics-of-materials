import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
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

function existingProblemIds() {
  if (!existsSync(problemsDir)) {
    return new Set();
  }

  return new Set(readdirSync(problemsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const problemPath = path.join(problemsDir, entry.name, "problem.json");
      if (!existsSync(problemPath)) {
        return [];
      }
      try {
        return [JSON.parse(readFileSync(problemPath, "utf8")).id];
      } catch {
        return [];
      }
    })
    .filter(Boolean));
}

function nextProblemId(slug) {
  const usedIds = existingProblemIds();
  const stem = slug.toUpperCase().replace(/[^A-Z0-9]+/g, "-").slice(0, 18).replace(/-$/, "");
  for (let sequence = 1; sequence <= 999; sequence += 1) {
    const candidate = `MOS-${stem}-${String(sequence).padStart(3, "0")}`;
    if (!usedIds.has(candidate)) {
      return candidate;
    }
  }
  throw new Error(`Unable to assign a unique problem ID for slug: ${slug}`);
}

function renderTemplate(filePath, replacements) {
  let content = readFileSync(filePath, "utf8");
  Object.entries(replacements).forEach(([token, value]) => {
    content = content.replaceAll(token, value);
  });
  writeFileSync(filePath, content);
}

const title = process.argv[2]?.trim();
const slug = process.argv[3] || slugify(title || "");

if (!title || !slug) {
  usage();
}

if (slug !== slugify(slug)) {
  throw new Error(`Invalid problem slug: ${slug}. Use lowercase letters, numbers, and hyphens only.`);
}

const requiredTemplateFiles = [
  "problem.json",
  "variables.json",
  "questions.json",
  "index.qmd",
  "_student-problem.qmd",
  "student-packet.qmd",
  "instructor-guide.qmd",
  "assets/context-placeholder.svg",
  "assets/instructor-idealization-placeholder.svg",
  "variants/section-a.json"
];

requiredTemplateFiles.forEach((fileName) => {
  if (!existsSync(path.join(templateDir, fileName))) {
    throw new Error(`Problem template is incomplete: templates/problem-package/${fileName} is missing`);
  }
});

const targetDir = path.join(problemsDir, slug);
if (existsSync(targetDir)) {
  throw new Error(`Problem folder already exists: problems/${slug}`);
}

cpSync(templateDir, targetDir, { recursive: true });
mkdirSync(path.join(targetDir, "assets"), { recursive: true });
mkdirSync(path.join(targetDir, "variants"), { recursive: true });

const id = nextProblemId(slug);

const problemPath = path.join(targetDir, "problem.json");
const problem = JSON.parse(readFileSync(problemPath, "utf8"));
problem.id = id;
problem.slug = slug;
problem.title = title;
problem.studentDocumentTitle = `Student Packet - ${title}`;
problem.instructorDocumentTitle = `Instructor Guide - ${title}`;
problem.summary = "Replace with a one-sentence context-rich mechanics problem summary.";
writeFileSync(problemPath, `${JSON.stringify(problem, null, 2)}\n`);

const replacements = {
  "__PROBLEM_TITLE_YAML__": JSON.stringify(title),
  "__STUDENT_PACKET_TITLE_YAML__": JSON.stringify(`Student Packet - ${title}`),
  "__INSTRUCTOR_GUIDE_TITLE_YAML__": JSON.stringify(`Instructor Guide - ${title}`),
  "__PROBLEM_TITLE__": title,
  "__PROBLEM_SLUG__": slug,
  "__PROBLEM_ID__": id
};

[
  "index.qmd",
  "_student-problem.qmd",
  "student-packet.qmd",
  "instructor-guide.qmd"
].forEach((fileName) => renderTemplate(path.join(targetDir, fileName), replacements));

console.log(`Created problems/${slug}`);
console.log(`Assigned problem ID: ${id}`);
console.log("Next steps:");
console.log(`1. Replace the two SVG placeholder assets in problems/${slug}/assets and update problem.json paths if needed`);
console.log(`2. Complete problems/${slug}/problem.json, variables.json, questions.json, and index.qmd`);
console.log(`3. Review the generated context and packet pages, then add or revise variants`);
console.log("4. Run node scripts/build-catalog.mjs");
console.log(`5. Render problems/${slug}/index.qmd, student-packet.qmd, and instructor-guide.qmd`);
