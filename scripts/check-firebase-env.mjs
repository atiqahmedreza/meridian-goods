import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const envPath = path.join(root, ".env.local");

const required = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    out[key] = value;
  }
  return out;
}

const env = { ...parseEnvFile(path.join(root, ".env.example")), ...parseEnvFile(envPath) };
const missing = required.filter((key) => !env[key]);

if (missing.length === 0) {
  console.log("Firebase: all NEXT_PUBLIC_FIREBASE_* variables are set in .env.local");
  process.exit(0);
}

console.warn("\nFirebase is not configured for local development.\n");
if (!fs.existsSync(envPath)) {
  console.warn("  • Copy .env.example → .env.local");
} else {
  console.warn("  • Fill in missing keys in .env.local");
}
console.warn("  • Missing:", missing.join(", "));
console.warn("\nSee README → Firebase setup, then restart: npm run dev\n");
process.exit(0);
