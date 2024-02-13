import { api } from "@/lib/api";

export default async function Page() {
  const products = await api.reactCache.products.list();

  return (
    <div className="flex gap-2 flex-wrap flex-col">
      {products.map((product) => (
        <div key={product.id} className="border p-4">
          <h2>
            {product.name},{product.id}
          </h2>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}
