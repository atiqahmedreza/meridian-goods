import { Suspense } from "react";
import { ItemsCatalog } from "./ItemsCatalog";

export default function ItemsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-ink-muted">
          Loading catalog…
        </div>
      }
    >
      <ItemsCatalog />
    </Suspense>
  );
}
