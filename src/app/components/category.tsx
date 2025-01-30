// components/categoryFilter.tsx

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex justify-center mb-5 pb-5 space-x-4">
      {["All", ...categories].map((category) => (
        <button
          key={category}
          className={`btn btn-outline-dark hover:bg-gray-700 hover:text-white py-2 px-4 rounded-lg transition-all ${
            selectedCategory === category ? "bg-gray-700 text-white" : "text-black"
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;