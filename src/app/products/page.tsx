"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../../types/products";
import { client } from "@/sanity/lib/client";
import { AllProduct } from "../../sanity/lib/quries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import ProductButton from "@/app/components/productButton";
import SearchBar from "../components/searchBar";


const DataFetchByAPI = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(6); // Number of products to show per page

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedData: Product[] = await client.fetch(AllProduct);
        setProducts(fetchedData);
        setFilteredProducts(fetchedData);

        // Extract unique categories from the products
        const uniqueCategories = [
          ...new Set(fetchedData.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProduct();
  }, []);

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredProducts(products); // Show all products if no category is selected
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  // Get current products based on page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="flex">
        {/* Sidebar for category filter */}
        <div className="w-1/4 bg-white p-6 rounded-lg shadow-xl sticky top-0 max-h-screen overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Filter by Category</h2>
          <div className="space-y-4">
            <button
              className={`w-full py-2 px-4 text-left font-medium border rounded-lg transition-all ease-in-out duration-300 ${
                selectedCategory === "" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => setSelectedCategory("")}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`w-full py-2 px-4 text-left font-medium border rounded-lg transition-all ease-in-out duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product list */}
        <div className="w-3/4 ml-6">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
            Explore Our Nike Collection
          </h1>

          {/* Search Bar */}
          <SearchBar products={products} setFilteredProducts={setFilteredProducts} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105 hover:translate-y-2"
                >
                  <Link href={`/products/${product.slug?.current}`}>
                    <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                      {product.image && (
                        <Image
                          src={urlFor(product.image).url() || "/default-image.jpg"}
                          alt={product.productName}
                          fill
                          className="object-cover transition-all duration-300 hover:scale-110"
                        />
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="text-red-600 text-sm font-medium">
                      {product.status}
                    </p>
                    <h2 className="text-lg font-semibold text-gray-800 mt-2 hover:text-blue-600">
                      {product.productName || "No name available"}
                    </h2>
                    <p className="text-md text-gray-500 mt-1">{product.category}</p>
                    <p className="text-lg font-semibold text-gray-900 mt-4">
                      MRP: ₹ {product.price.toFixed(2)}
                    </p>
                    <ProductButton product={product} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No products found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <button
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 mx-2 border rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFetchByAPI;

