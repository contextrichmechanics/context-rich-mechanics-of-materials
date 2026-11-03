import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PressFixtureModel from "./press-fixture-model.js";
import PlatformModel from "./platform-model.js";
import JibCraneModel from "./jib-crane-model.js";

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
  const supplementaryImages = problem.supplementaryImages || [];
  if (!Array.isArray(supplementaryImages)) {
    throw new Error(`${path.relative(root, problemPath)} supplementaryImages must be an array`);
  }
  const supplementaryImageOrders = new Set();
  supplementaryImages.forEach((image, index) => {
    const field = `supplementaryImages[${index}]`;
    if (!image || typeof image !== "object" || Array.isArray(image)) {
      throw new Error(`${path.relative(root, problemPath)} ${field} must be an object`);
    }
    requireFields(image, ["path", "order"], `${problemPath}#${field}`);
    if (typeof image.path !== "string" || /^(?:[a-z]+:|\/|\\)/i.test(image.path) || image.path.split(/[\\/]+/).includes("..")) {
      throw new Error(`${path.relative(root, problemPath)} ${field}.path must be a relative in-package asset path`);
    }
    if (!Number.isInteger(image.order)) {
      throw new Error(`${path.relative(root, problemPath)} ${field}.order must be an integer`);
    }
    if (supplementaryImageOrders.has(image.order)) {
      throw new Error(`${path.relative(root, problemPath)} has duplicate supplementary image order: ${image.order}`);
    }
    supplementaryImageOrders.add(image.order);
    if (image.caption !== undefined && typeof image.caption !== "string") {
      throw new Error(`${path.relative(root, problemPath)} ${field}.caption must be a string`);
    }
    if (image.alt !== undefined && typeof image.alt !== "string") {
      throw new Error(`${path.relative(root, problemPath)} ${field}.alt must be a string`);
    }
    if (image.widthPercent !== undefined && (!Number.isFinite(image.widthPercent) || image.widthPercent <= 0 || image.widthPercent > 100)) {
      throw new Error(`${path.relative(root, problemPath)} ${field}.widthPercent must be greater than 0 and at most 100`);
    }
    const supplementaryImagePath = path.join(packageDir, image.path);
    if (!existsSync(supplementaryImagePath)) {
      throw new Error(`${path.relative(root, problemPath)} references missing supplementary image: ${image.path}`);
    }
  });

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
  if (problem.packetLayout !== undefined && problem.packetLayout !== "geometry-first" && !(PlatformModel.isPlatform(problem) && problem.packetLayout === "platform-common-model") && !(JibCraneModel.isJib(problem) && problem.packetLayout === "jib-common-model")) throw new Error(`${slug} has an unknown packetLayout`);
  if (PressFixtureModel.isPress(problem)) {
    if (problem.packetLayout !== "geometry-first") throw new Error(`${slug} requires geometry-first layout`);
    if (problem.showIdealizedImageInStudentPacket === true) throw new Error(`${slug} instructor figure must remain instructor-only`);
    if (JSON.stringify([...(problem.derivedPlaceholders || [])].sort()) !== JSON.stringify([...PressFixtureModel.registry].sort())) throw new Error(`${slug} requires the 20 nominal-check placeholders`);
    const modelProblem = { ...problem, variables };
    PressFixtureModel.evaluate(modelProblem);
    variants.forEach(variant => PressFixtureModel.evaluate(modelProblem, variant.variables || {}));
  }
  if (PlatformModel.isPlatform(problem)) {
    if (problem.packetLayout !== "platform-common-model" || problem.showIdealizedImageInStudentPacket !== false) throw new Error(slug + " requires the platform common-model layout and instructor-only free bodies");
    if (JSON.stringify([...(problem.derivedPlaceholders || [])].sort()) !== JSON.stringify([...PlatformModel.registry].sort())) throw new Error(slug + " requires the exact 61-key registry");
    requireFields(problem, ["commonModelStatement", "commonModelAssumptions", "modelValidityPolicy", "idealizedImageCaption", "contextImageNote"], problemPath);
    if (!Array.isArray(problem.commonModelAssumptions) || problem.commonModelAssumptions.length !== 11) throw new Error(slug + " requires eleven common-model assumptions");
    if (supplementaryImages.filter(i => i.role === "common-model-geometry").length !== 1) throw new Error(slug + " requires one unsolved common geometry");
    const commonFields = [problem.commonModelStatement, ...problem.commonModelAssumptions, ...supplementaryImages.flatMap(i => [i.alt, i.caption])];
    if (commonFields.some(text => placeholders(text).some(key => !variableKeys.has(key) && ![...variableKeys].some(k => key === k + "_unit" || key === k + "_label")))) throw new Error(slug + " common geometry/assumptions may not expose solved placeholders");
    if (typeof problem.nativeContextImage !== "string" || /^(?:[a-z]+:|\/|\\)/i.test(problem.nativeContextImage) || problem.nativeContextImage.split(/[\\/]+/).includes("..") || !existsSync(path.join(packageDir, problem.nativeContextImage))) throw new Error(slug + " requires the format-correct context delivery copy");
    const modelProblem = { ...problem, variables };
    PlatformModel.assertPacket(PlatformModel.evaluate(modelProblem));
    variants.forEach(variant => PlatformModel.assertPacket(PlatformModel.evaluate(modelProblem, variant.variables || {})));
  }
  if (JibCraneModel.isJib(problem)) {
    if (problem.packetLayout !== "jib-common-model" || problem.showIdealizedImageInStudentPacket !== false) throw new Error(slug + " requires the jib common-model layout and instructor-only FBDs");
    if (JSON.stringify([...(problem.derivedPlaceholders || [])].sort()) !== JSON.stringify([...JibCraneModel.registry].sort())) throw new Error(slug + " requires the exact 104-key jib registry");
    requireFields(problem, ["commonModelStatement", "commonModelAssumptions", "contextImageNote", "idealizedImageCaption"], problemPath);
    if (!Array.isArray(problem.commonModelAssumptions) || problem.commonModelAssumptions.length !== 12) throw new Error(slug + " requires twelve explicit common-model assumptions");
    if (supplementaryImages.filter(i => i.role === "common-model-geometry").length !== 1) throw new Error(slug + " requires one unsolved authoritative common-model image");
    const studentFields = [problem.problemStatement, problem.engineeringGoal, problem.commonModelStatement, ...problem.commonModelAssumptions, ...questions.map(q => q.student), ...supplementaryImages.flatMap(i => [i.alt, i.caption])];
    if (studentFields.some(t => placeholders(t).some(k => (problem.derivedPlaceholders || []).includes(k)))) throw new Error(slug + " student fields may not contain solved output placeholders");
    const modelProblem = { ...problem, variables };
    JibCraneModel.evaluate(modelProblem);
    variants.forEach(v => JibCraneModel.evaluate(modelProblem, v.variables || {}));
  }
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
    ...(PlatformModel.isPlatform(problem) ? {nativeContextImage: normalizeSitePath("problems", slug, problem.nativeContextImage)} : {}),
    image: normalizeSitePath("problems", slug, problem.image),
    idealizedImage: problem.idealizedImage
      ? normalizeSitePath("problems", slug, problem.idealizedImage)
      : "",
    supplementaryImages: supplementaryImages
      .map((image) => ({
        ...image,
        path: normalizeSitePath("problems", slug, image.path)
      }))
      .sort((a, b) => a.order - b.order),
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
  if (PlatformModel.isPlatform(problem) && PlatformModel.evaluate(problem).status === "unassessed") warnings.push("Quantitative strain/rotation screening is unassessed; values and axial stiffness are instructional assignments, not documented industrial specifications.");
  if (JibCraneModel.isJib(problem)) warnings.push("Instructional nominal assessment only: brace section axes, physical compression resistance, quantitative model validity and industrial provenance remain unvalidated. Formal Euler and the fixed-cantilever comparison are excluded from acceptance.");
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
