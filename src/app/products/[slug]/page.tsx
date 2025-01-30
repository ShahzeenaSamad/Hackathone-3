import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import ProductButton from "@/app/components/productButton";

interface ProductPageProps {
  params: { slug: string };
}

async function GetProduct(slug: string): Promise<Product | null> {
  try {
    const product = await client.fetch(
      groq`*[_type == "product" && slug.current == $slug][0]{
        _id,
        productName,
        _type,
        category,
        price,
        inventory,
        colors,
        status,
        image,
        description
      }`,
      { slug }
    );
    return product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = await GetProduct(slug);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-red-500">Product Not Found</h1>
        <p className="text-gray-500 mt-2">Sorry, the product you are looking for is unavailable.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 py-10 px-6">
      <div className="max-w-5xl bg-white rounded-xl shadow-xl p-8 flex flex-col md:flex-row gap-12 transform hover:scale-[1.02] transition duration-300">
        {/* Product Image */}
        <div className="relative w-full md:w-1/2 flex justify-center bg-gray-300 p-4 rounded-lg shadow-lg">
          {product.image ? (
            <Image
              src={urlFor(product.image).url()}
              alt={product.productName}
              width={500}
              height={500}
              className="rounded-lg"
            />
          ) : (
            <p className="text-gray-500">No image available</p>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col space-y-4">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">{product.productName}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
          <p className="text-gray-700 font-medium">Category: <span className="text-indigo-600">{product.category}</span></p>

          {product.colors?.length > 0 && (
            <div>
              <p className="text-gray-700 font-medium">Available Colors:</p>
              <div className="flex gap-3 mt-2">
                {product.colors.map((color, index) => (
                  <span key={index} className="w-7 h-7 rounded-full border border-gray-400" style={{ backgroundColor: color }}></span>
                ))}
              </div>
            </div>
          )}

          <p className="text-gray-700 font-medium">Inventory: <span className="text-gray-900">{product.inventory}</span></p>
          <p className="text-3xl font-bold text-indigo-600">MRP: ₹ {product.price.toFixed(2)}</p>

          <ProductButton product={product} />
        </div>
      </div>
    </div>
  );
}