"use client"; // Explicitly mark this as a Client-Side Component

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  colors: string[];
  inventory: number;
  category: string;
  status: string;
  imageUrl: string;
};

type ProductsClientProps = {
  products: Product[];
};

const ProductsClient = ({ products }: ProductsClientProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 6; // Number of products per page

  // Update filtered products whenever selectedCategory or searchQuery changes
  useEffect(() => {
    let updatedProducts = products;

    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter((product) => product.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [selectedCategory, searchQuery, products]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Extract unique categories from products
  const categories = [...new Set(products.map((product) => product.category))];

  // Calculate the products to display for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-4 h-screen sticky top-0">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Categories</h2>
        <ul className="space-y-3">
          {["All", ...categories].map((category) => (
            <li key={category}>
              <button
                className={`w-full text-left py-2 px-4 rounded-lg transition-all ${
                  selectedCategory === category
                    ? "bg-gray-800 text-white"
                    : "bg-white hover:bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for products..."
            className="border border-gray-300 rounded-lg p-2 w-2/3 text-sm shadow-sm focus:ring-2 focus:ring-gray-400 focus:outline-none transform -translate-y-3"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-3 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                key={product._id}
              >
                <Link href={`/products/${product._id}`}>
                  <div className="w-full h-48 flex justify-center items-center">
                    <Image
                      src={product.imageUrl}
                      alt={product.productName}
                      className="object-cover rounded-md"
                      width={300}
                      height={300}
                    />
                  </div>
                </Link>
                <p className="text-red-600 text-sm mt-2">{product.status}</p>
                <h2 className="text-md font-semibold text-gray-800 mt-2">
                  {product.productName || "No name available"}
                </h2>
                <p className="text-gray-500">{product.category}</p>
                <p className="text-lg font-bold text-gray-800 mt-2">₹ {product.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-lg text-gray-500">No products found</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 px-3 py-1 rounded-lg ${
                currentPage === page
                  ? "bg-gray-800 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsClient;
