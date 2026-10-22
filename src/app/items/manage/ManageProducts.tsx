"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { accentFilledClassName } from "@/components/ui/Button";
import {
  deleteCustomProduct,
  getAllProducts,
  getCustomProducts,
  type Product,
} from "@/lib/products";

export function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const load = useCallback(() => {
    setProducts(getAllProducts());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const customIds = new Set(getCustomProducts().map((p) => p.id));

  function handleDelete(id: string) {
    if (!customIds.has(id)) {
      alert("Built-in catalog items cannot be deleted.");
      return;
    }
    if (confirm("Delete this product?")) {
      deleteCustomProduct(id);
      load();
    }
  }

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-ink">Manage Products</h1>
            <p className="mt-2 text-ink-muted">
              View the full catalog. Delete only applies to products you added.
            </p>
          </div>
          <Link
            href="/items/add"
            className={`rounded-full px-4 py-2 text-sm ${accentFilledClassName}`}
          >
            Add Product
          </Link>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-app glass-panel shadow-soft">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-app text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-[rgba(30,51,72,0.04)]">
                  <td className="px-4 py-3 font-medium text-ink">{p.title}</td>
                  <td className="px-4 py-3 text-ink-muted">{p.category}</td>
                  <td className="px-4 py-3 text-ink">${p.price}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        p.custom
                          ? "bg-accent-soft text-accent"
                          : "bg-[rgba(30,51,72,0.08)] text-ink-muted"
                      }`}
                    >
                      {p.custom ? "Custom" : "Catalog"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/items/${p.id}`}
                      className="mr-3 font-medium text-accent hover:text-accent-bright"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="font-medium text-[#8b3a3a] hover:opacity-80 disabled:opacity-40"
                      disabled={!p.custom}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-4 sm:hidden">
          {products.map((p) => (
            <div key={p.id} className="rounded-xl border border-app glass-panel p-4 shadow-soft">
              <p className="font-semibold text-ink">{p.title}</p>
              <p className="mt-1 text-sm text-ink-muted">
                {p.category} · ${p.price}
              </p>
              <div className="mt-3 flex gap-3">
                <Link href={`/items/${p.id}`} className="text-sm font-medium text-accent">
                  View
                </Link>
                {p.custom && (
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    className="text-sm font-medium text-[#8b3a3a]"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
