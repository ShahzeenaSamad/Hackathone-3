// components/SearchBar.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Product } from "../../../types/products";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa"; // Importing search icon for styling
import { urlFor } from "@/sanity/lib/image";

interface SearchBarProps {
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ products}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredSearchResults, setFilteredSearchResults] = useState<Product[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSearchResults(filtered);
      setDropdownOpen(true); // Open dropdown when search query exists
    } else {
      setFilteredSearchResults([]);
      setDropdownOpen(false); // Close dropdown when search query is empty
    }
  }, [searchQuery, products]);

  // Handle selecting a product
  const handleSelectProduct = (slug: string) => {
    router.push(`/products/${slug}`);
    setSearchQuery(""); // Clear search query after selection
    setDropdownOpen(false); // Close dropdown after product selection
  };

  return (
    <div className="relative flex justify-center mb-6">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-800"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600" />
      </div>

      {/* Dropdown List for search results */}
      {dropdownOpen && filteredSearchResults.length > 0 && (
        <div className="absolute z-10 w-[400px] bg-white border border-gray-300 rounded-md mt-10 shadow-lg max-h-80 overflow-y-auto">
          <ul>
            {filteredSearchResults.map((product) => (
              <li
                key={product._id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                onClick={() => handleSelectProduct(product.slug?.current || "")}
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                    {product.image && (
                      <img
                        src={urlFor(product.image).url() || "/default-image.jpg"}
                        alt={product.productName}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>

                  {/* Product Name and Price */}
                  <div className="flex flex-col justify-center">
                    <p className="font-bold text-black">{product.productName}</p>
                    <p className="text-sm font-bold text-blue-600">₹ {product.price.toFixed(2)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;