/**
 * Reads Firebase keys from .env.local and adds them to the linked Vercel project
 * (production, preview, development). Requires Vercel CLI login (`npx vercel whoami`).
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const envPath = path.join(root, ".env.local");

const keys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

const environments = ["production", "preview", "development"];

function parseEnvFile(filePath) {
  const out = {};
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    out[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return out;
}

function runVercel(args) {
  return spawnSync("npx", ["vercel@latest", ...args], {
    cwd: root,
    encoding: "utf8",
    shell: true,
    stdio: ["inherit", "pipe", "pipe"],
  });
}

if (!fs.existsSync(envPath)) {
  console.error("No .env.local found. Copy .env.example and add your Firebase web app config.");
  process.exit(1);
}

const env = parseEnvFile(envPath);
const missing = keys.filter((k) => !env[k]);
if (missing.length) {
  console.error("Missing in .env.local:", missing.join(", "));
  process.exit(1);
}

for (const key of keys) {
  for (const environment of environments) {
    const result = runVercel([
      "env",
      "add",
      key,
      "--environment",
      environment,
      "--type",
      "config",
      "--value",
      env[key],
      "--yes",
    ]);

    const out = `${result.stdout ?? ""}${result.stderr ?? ""}`;
    if (result.status !== 0 && !/already exists|Updated|Added/i.test(out)) {
      console.error(out);
      console.error(`Failed to set ${key} for ${environment}`);
      process.exit(result.status ?? 1);
    }
    console.log(`Set ${key} (${environment})`);
  }
}

console.log("\nDone. Redeploy production:\n  npx vercel deploy --prod\n");
