import React from "react";

// Left sidebar navigation, styled and behaving exactly like the sidebar on
// the Policies page (same card, spacing, active/hover states, and the
// up/down indicator next to the active item). On mobile it collapses into a
// horizontal scrolling row of pills so it stays usable on small screens.
export default function FaqSidebar({ title, items, activeItem, onSelect }) {
  const activeIndex = items.indexOf(activeItem);

  return (
    <>
      {/* Mobile / tablet: horizontal scroll */}
      <nav className="lg:hidden -mx-4 px-4 sm:-mx-6 sm:px-6 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {items.map((item) => {
            const isActive = item === activeItem;
            return (
              <button
                key={item}
                onClick={() => onSelect(item)}
                className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-amber-600 font-semibold bg-amber-50"
                    : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop: sidebar card, copied from the Policies page sidebar */}
      <nav className="hidden lg:block lg:w-64 lg:flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <ul className="p-4 space-y-1">
            {items.map((item, index) => {
              const isActive = item === activeItem;
              const isAbove = index < activeIndex;
              const isBelow = index > activeIndex;

              return (
                <li key={item} className="relative">
                  <button
                    onClick={() => onSelect(item)}
                    className={`group relative w-full text-left px-2 py-3 text-sm font-medium transition-all duration-300 overflow-hidden ${
                      isActive
                        ? "text-amber-600 font-semibold bg-amber-50 rounded-lg"
                        : "text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item}</span>
                      {isActive && (
                        <div className="flex items-center space-x-1">
                          {isAbove && (
                            <svg
                              className="w-3 h-3 text-amber-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          )}
                          {isBelow && (
                            <svg
                              className="w-3 h-3 text-amber-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          )}
                        </div>
                      )}
                    </div>

                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-amber-500 transition-all duration-300 ease-in-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
