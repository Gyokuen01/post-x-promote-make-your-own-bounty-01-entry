// post-x-promote-make-your-own-bounty-01 — entry program (Node 22, standard library only).
//
// The entry itself is the X post: one post of your own on X that quotes
// make.fun's make-your-own-bounty post
// (https://x.com/makefunai/status/2124915864336236646) or links to it,
// with a photo of its own attached, make.fun or the @makefunai tag and your
// play code in its text. POST.json at the repository root names that post,
// and this program has exactly one job: hand POST.json to the gate. It reads
// the file from the repository, checks it is a JSON object carrying a url
// string, and writes it unchanged into the output directory, where the house
// reads it and then reads the post itself from X. Nothing this program
// writes about the post is scored.
//
// Local run (from the repository root):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// Inside the grader's sandbox the repository is mounted at /bot and the
// output directory is /output, so the two environment variables fall back
// to those paths when they are not set.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const inputPath = join(botDir, "POST.json");
const outputPath = join(outputDir, "POST.json");

// Read POST.json out of the repository. A missing or unreadable file ends
// the run with a clear error instead of writing a stale or empty output.
let raw: Buffer;
try {
  raw = readFileSync(inputPath);
} catch (err) {
  console.error(`cannot read ${inputPath}: ${(err as Error).message}`);
  process.exit(1);
}

// The gate only accepts a JSON object, so confirm the shape here: parse it
// and require a string url field before anything is written.
let post: unknown;
try {
  post = JSON.parse(raw.toString("utf8"));
} catch (err) {
  console.error(`POST.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (
  typeof post !== "object" ||
  post === null ||
  typeof (post as { url?: unknown }).url !== "string"
) {
  console.error('POST.json must be a JSON object with a string "url" field');
  process.exit(1);
}

// Write the file byte for byte as it stands in the repository, so what the
// gate reads is exactly what was committed.
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, raw);
console.log(`wrote ${outputPath}`);
