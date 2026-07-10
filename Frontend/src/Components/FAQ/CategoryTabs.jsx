import React from "react";

// Horizontal category navigation shown right below the FAQ hero. Purely a
// filter control - it doesn't touch the accordion's design in any way.
export default function CategoryTabs({ categories, activeCategory, onSelect }) {
  return (
    <div className="sticky top-0 z-20 bg-[#F5F7F8]/95 backdrop-blur-sm border-b border-gray-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto py-4 sm:py-5">
          {categories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                onClick={() => onSelect(category.id)}
                className={`flex-shrink-0 whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium border transition-all duration-300 ${
                  isActive
                    ? "bg-yellow-600 border-yellow-600 text-white shadow-sm shadow-yellow-600/20"
                    : "bg-white border-gray-200 text-gray-700 hover:border-yellow-600/40 hover:text-yellow-600"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
