import { Suspense } from "react";
import { ItemDetail } from "./ItemDetail";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-16 text-center text-ink-muted sm:px-6">
          Loading product…
        </div>
      }
    >
      <ItemDetail id={id} />
    </Suspense>
  );
}
