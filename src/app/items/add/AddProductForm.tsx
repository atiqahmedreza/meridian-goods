"use client";

import { FormEvent, useState, type ReactNode } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toast } from "@/components/Toast";
import { accentFilledClassName } from "@/components/ui/Button";
import {
  CATEGORIES,
  saveCustomProduct,
  type ProductCategory,
} from "@/lib/products";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1560393464-5c7596c5573b?w=800&q=80";

export function AddProductForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function validate(form: FormData) {
    const next: Record<string, string> = {};
    if (!String(form.get("title")).trim()) next.title = "Title is required";
    if (!String(form.get("shortDescription")).trim())
      next.shortDescription = "Short description is required";
    if (!String(form.get("fullDescription")).trim())
      next.fullDescription = "Full description is required";
    const price = Number(form.get("price"));
    if (!price || price <= 0) next.price = "Enter a valid price";
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    const category = form.get("category") as ProductCategory;
    const specsRaw = String(form.get("specifications") || "");
    const specifications: Record<string, string> = {};
    specsRaw.split("\n").forEach((line) => {
      const [k, ...rest] = line.split(":");
      if (k?.trim() && rest.length) specifications[k.trim()] = rest.join(":").trim();
    });

    saveCustomProduct({
      title: String(form.get("title")).trim(),
      shortDescription: String(form.get("shortDescription")).trim(),
      fullDescription: String(form.get("fullDescription")).trim(),
      price: Number(form.get("price")),
      category,
      rating: Number(form.get("rating")) || 4.5,
      imageUrl: String(form.get("imageUrl")).trim() || DEFAULT_IMAGE,
      specifications:
        Object.keys(specifications).length > 0
          ? specifications
          : { Note: "See full description" },
      createdAt: String(form.get("createdAt") || new Date().toISOString().slice(0, 10)),
    });

    setSubmitting(false);
    setToast("Product added successfully!");
    e.currentTarget.reset();
  }

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link href="/items" className="text-sm font-medium text-accent hover:text-accent-bright">
          ← Back to shop
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-ink">Add product</h1>
        <p className="mt-2 text-sm text-ink-muted">
          New listings are saved in your browser and appear in the shop alongside our curated
          catalog. Perfect for demos and assessment submissions.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-app glass-panel p-6 shadow-soft"
          noValidate
        >
          <Field label="Title" error={errors.title}>
            <input name="title" className={inputClass(errors.title)} />
          </Field>
          <Field label="Short description" error={errors.shortDescription}>
            <input name="shortDescription" className={inputClass(errors.shortDescription)} />
          </Field>
          <Field label="Full description" error={errors.fullDescription}>
            <textarea
              name="fullDescription"
              rows={4}
              className={inputClass(errors.fullDescription)}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Price ($)" error={errors.price}>
              <input name="price" type="number" min={1} className={inputClass(errors.price)} />
            </Field>
            <Field label="Category">
              <select name="category" className={inputClass()}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Date">
              <input name="createdAt" type="date" className={inputClass()} />
            </Field>
            <Field label="Rating (1–5)">
              <input
                name="rating"
                type="number"
                min={1}
                max={5}
                step={0.1}
                defaultValue={4.5}
                className={inputClass()}
              />
            </Field>
          </div>
          <Field label="Specifications (one per line: Key: Value)">
            <textarea
              name="specifications"
              rows={3}
              placeholder={"Material: Cotton\nWeight: 200g"}
              className={inputClass()}
            />
          </Field>
          <Field label="Image URL (optional)">
            <input
              name="imageUrl"
              type="url"
              placeholder="https://images.unsplash.com/..."
              className={inputClass()}
            />
          </Field>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full rounded-full py-3 text-sm transition disabled:opacity-60 ${accentFilledClassName}`}
          >
            {submitting ? "Saving…" : "Submit"}
          </button>
        </form>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </ProtectedRoute>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-muted">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </label>
  );
}

function inputClass(error?: string) {
  return `mt-0 w-full rounded-xl border bg-surface-muted px-3 py-2 text-sm text-ink shadow-sm focus:outline-none focus:ring-2 ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
      : "border-app focus:border-accent focus:ring-[rgba(26,107,107,0.25)]"
  }`;
}
