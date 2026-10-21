import { Suspense } from "react";
import { AddProductForm } from "./AddProductForm";

export default function AddProductPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-ink-muted">Loading…</div>}>
      <AddProductForm />
    </Suspense>
  );
}
