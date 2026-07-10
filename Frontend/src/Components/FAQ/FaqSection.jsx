import React, { useState } from "react";
import CategoryTabs from "./CategoryTabs";
import FaqSidebar from "./FaqSidebar";
import FaqAccordion from "./FaqAccordion";
import {
  CATEGORIES,
  SIDEBAR_ITEMS,
  GENERAL_FAQS,
  FAQ_DATA,
} from "../../data/faqData";

export default function ExtractedFAQSection() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [activeSubItem, setActiveSubItem] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    const items = SIDEBAR_ITEMS[categoryId];
    setActiveSubItem(items ? items[0] : null);
  };

  const activeCategoryLabel =
    CATEGORIES.find((category) => category.id === activeCategory)?.label ?? "";

  const isGeneral = activeCategory === "general";
  const sidebarItems = SIDEBAR_ITEMS[activeCategory];
  const faqsToShow = isGeneral
    ? GENERAL_FAQS
    : (FAQ_DATA[activeCategory] && FAQ_DATA[activeCategory][activeSubItem]) ||
      [];

  return (
    <div className="bg-[#F5F7F8]">
      <CategoryTabs
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelect={handleCategorySelect}
      />

      <div className="text-gray-800 w-full relative">
        <div className="relative z-10 py-12 sm:py-16 lg:py-20">
          {isGeneral ? (
            <div className="px-4 sm:px-6 md:px-8 lg:px-16">
              <div className="max-w-5xl mx-auto">
                <FaqAccordion faqs={faqsToShow} />
              </div>
            </div>
          ) : (
            <div className="px-4 sm:px-6 md:px-8 lg:px-8">
              <div className="mx-auto lg:max-w-[99rem] flex flex-col lg:flex-row lg:items-start gap-6">
                <FaqSidebar
                  title={`${activeCategoryLabel} FAQs`}
                  items={sidebarItems}
                  activeItem={activeSubItem}
                  onSelect={setActiveSubItem}
                />
                <div className="w-full lg:max-w-5xl">
                  <FaqAccordion faqs={faqsToShow} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
