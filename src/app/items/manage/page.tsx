import { Suspense } from "react";
import { ManageProducts } from "./ManageProducts";

export default function ManageProductsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-ink-muted">Loading…</div>}>
      <ManageProducts />
    </Suspense>
  );
}
