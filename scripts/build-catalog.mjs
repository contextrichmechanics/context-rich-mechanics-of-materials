import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const problemsDir = path.join(root, "problems");
const dataDir = path.join(root, "data");
const allowedQuestionSections = new Set(["context", "transition", "analysis"]);

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function requireFields(object, fields, filePath) {
  const missing = fields.filter((field) => object[field] === undefined || object[field] === "");
  if (missing.length > 0) {
    throw new Error(`${path.relative(root, filePath)} is missing required field(s): ${missing.join(", ")}`);
  }
}

function normalizeSitePath(...parts) {
  return parts.join("/").replace(/\/+/g, "/");
}

function placeholders(text) {
  return [...String(text || "").matchAll(/\{\{([A-Za-z0-9_]+)\}\}/g)].map((match) => match[1]);
}

function problemPackages() {
  return readdirSync(problemsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  values.forEach((value) => {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  });
  return [...duplicates];
}

function readVariants(packageDir, slug, variableKeys, questionIds) {
  const variantsDir = path.join(packageDir, "variants");
  if (!existsSync(variantsDir)) {
    return [];
  }

  return readdirSync(variantsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => {
      const variantPath = path.join(variantsDir, entry.name);
      const variant = readJson(variantPath);
      requireFields(variant, ["id", "title"], variantPath);

      const overrides = variant.variables || {};
      Object.keys(overrides).forEach((key) => {
        if (!variableKeys.has(key)) {
          throw new Error(`${slug} variant ${variant.id} overrides unknown variable: ${key}`);
        }
      });

      (variant.selectedQuestions || []).forEach((id) => {
        if (!questionIds.has(id)) {
          throw new Error(`${slug} variant ${variant.id} selects unknown question: ${id}`);
        }
      });

      return variant;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

const catalog = problemPackages().flatMap((slug) => {
  const packageDir = path.join(problemsDir, slug);
  const problemPath = path.join(packageDir, "problem.json");
  const variablesPath = path.join(packageDir, "variables.json");
  const questionsPath = path.join(packageDir, "questions.json");

  let problem;
  try {
    problem = readJson(problemPath);
  } catch {
    return [];
  }

  const variables = readJson(variablesPath);
  const questions = readJson(questionsPath);

  requireFields(problem, [
    "id",
    "slug",
    "title",
    "studentDocumentTitle",
    "instructorDocumentTitle",
    "summary",
    "problemStatement",
    "engineeringGoal",
    "image"
  ], problemPath);

  variables.forEach((variable, index) => {
    requireFields(variable, ["key", "symbol", "label", "value", "unit"], `${variablesPath}#${index}`);
  });

  questions.forEach((question, index) => {
    requireFields(question, ["id", "title", "student", "instructor"], `${questionsPath}#${index}`);
    if (question.section && !allowedQuestionSections.has(question.section)) {
      throw new Error(`${slug} question ${question.id} has invalid section: ${question.section}`);
    }
  });

  const duplicateVariableKeys = duplicateValues(variables.map((variable) => variable.key));
  if (duplicateVariableKeys.length > 0) {
    throw new Error(`${slug} has duplicate variable key(s): ${duplicateVariableKeys.join(", ")}`);
  }

  const duplicateQuestionIds = duplicateValues(questions.map((question) => question.id));
  if (duplicateQuestionIds.length > 0) {
    throw new Error(`${slug} has duplicate question id(s): ${duplicateQuestionIds.join(", ")}`);
  }

  const imagePath = path.join(packageDir, problem.image);
  if (!existsSync(imagePath)) {
    throw new Error(`${path.relative(root, problemPath)} references missing image: ${problem.image}`);
  }
  if (problem.idealizedImage) {
    const idealizedImagePath = path.join(packageDir, problem.idealizedImage);
    if (!existsSync(idealizedImagePath)) {
      throw new Error(`${path.relative(root, problemPath)} references missing idealized image: ${problem.idealizedImage}`);
    }
  }

  ["index.qmd", "student-packet.qmd", "instructor-guide.qmd"].forEach((fileName) => {
    const filePath = path.join(packageDir, fileName);
    if (!existsSync(filePath)) {
      throw new Error(`${slug} is missing ${fileName}`);
    }
  });

  const allowedPlaceholders = new Set(["weight_N"]);
  (problem.derivedPlaceholders || []).forEach((placeholder) => {
    allowedPlaceholders.add(placeholder);
  });
  const variableKeys = new Set();
  variables.forEach((variable) => {
    variableKeys.add(variable.key);
    allowedPlaceholders.add(variable.key);
    allowedPlaceholders.add(`${variable.key}_unit`);
    allowedPlaceholders.add(`${variable.key}_label`);
  });

  const questionIds = new Set(questions.map((question) => question.id));
  const variants = readVariants(packageDir, slug, variableKeys, questionIds);
  const duplicateVariantIds = duplicateValues(variants.map((variant) => variant.id));
  if (duplicateVariantIds.length > 0) {
    throw new Error(`${slug} has duplicate variant id(s): ${duplicateVariantIds.join(", ")}`);
  }

  const templatedFields = [
    ["problemStatement", problem.problemStatement],
    ["engineeringGoal", problem.engineeringGoal],
    ...questions.flatMap((question) => [
      [`${question.id}.student`, question.student],
      [`${question.id}.instructor`, question.instructor]
    ])
  ];

  templatedFields.forEach(([field, text]) => {
    placeholders(text).forEach((placeholder) => {
      if (!allowedPlaceholders.has(placeholder)) {
        throw new Error(`${slug} uses unknown placeholder {{${placeholder}}} in ${field}`);
      }
    });
  });

  return [{
    ...problem,
    image: normalizeSitePath("problems", slug, problem.image),
    idealizedImage: problem.idealizedImage
      ? normalizeSitePath("problems", slug, problem.idealizedImage)
      : "",
    source: normalizeSitePath("problems", slug, problem.source || "index.html"),
    variables,
    questions,
    variants
  }];
});

const duplicateProblemIds = duplicateValues(catalog.map((problem) => problem.id));
if (duplicateProblemIds.length > 0) {
  throw new Error(`Duplicate problem id(s): ${duplicateProblemIds.join(", ")}`);
}

const duplicateProblemSlugs = duplicateValues(catalog.map((problem) => problem.slug));
if (duplicateProblemSlugs.length > 0) {
  throw new Error(`Duplicate problem slug(s): ${duplicateProblemSlugs.join(", ")}`);
}

mkdirSync(dataDir, { recursive: true });

const json = `${JSON.stringify(catalog, null, 2)}\n`;
const health = catalog.map((problem) => {
  const warnings = [];
  const questionsWithoutTags = problem.questions.filter((question) => !Array.isArray(question.tags) || question.tags.length === 0);
  const questionsWithoutType = problem.questions.filter((question) => !question.type);
  const questionsWithoutDifficulty = problem.questions.filter((question) => !question.difficulty);
  const questionsWithoutObjectives = problem.questions.filter((question) => !Array.isArray(question.learningObjectives) || question.learningObjectives.length === 0);
  const questionsWithoutSection = problem.questions.filter((question) => !question.section);

  if (questionsWithoutTags.length > 0) {
    warnings.push(`${questionsWithoutTags.length} question(s) missing tags`);
  }
  if (questionsWithoutType.length > 0) {
    warnings.push(`${questionsWithoutType.length} question(s) missing type`);
  }
  if (questionsWithoutDifficulty.length > 0) {
    warnings.push(`${questionsWithoutDifficulty.length} question(s) missing difficulty`);
  }
  if (questionsWithoutObjectives.length > 0) {
    warnings.push(`${questionsWithoutObjectives.length} question(s) missing learning objectives`);
  }
  if (questionsWithoutSection.length > 0) {
    warnings.push(`${questionsWithoutSection.length} question(s) missing template section`);
  }
  if ((problem.variants || []).length === 0) {
    warnings.push("No saved variants");
  }

  return {
    id: problem.id,
    slug: problem.slug,
    title: problem.title,
    status: warnings.length === 0 ? "OK" : "Review",
    variables: problem.variables.length,
    questions: problem.questions.length,
    variants: (problem.variants || []).length,
    warnings
  };
});
const healthJson = `${JSON.stringify(health, null, 2)}\n`;

writeFileSync(path.join(dataDir, "problem-catalog.json"), json);
writeFileSync(
  path.join(dataDir, "problem-catalog.js"),
  `window.PROBLEM_CATALOG = ${json};`
);
writeFileSync(path.join(dataDir, "problem-health.json"), healthJson);
writeFileSync(
  path.join(dataDir, "problem-health.js"),
  `window.PROBLEM_HEALTH = ${healthJson};`
);

console.log(`Wrote ${catalog.length} problem(s) to data/problem-catalog.json, data/problem-catalog.js, and health files`);
