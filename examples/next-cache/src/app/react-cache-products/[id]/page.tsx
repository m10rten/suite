import { api } from "@/lib/api";

export default async function DetailPage({ params }: { params: { id: string } }) {
  const product = await api.reactCache.products.get(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}
