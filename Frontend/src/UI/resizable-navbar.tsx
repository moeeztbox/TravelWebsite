"use client";
import { cn } from "../lib/utils";
import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import React, { ReactNode, useState, useRef, useEffect } from "react";

// 1. Simple Navbar Container
interface NavbarProps {
  children: ReactNode;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ children, className }) => {
  return (
    <nav className={cn("fixed inset-x-0 top-0 z-40 w-full bg-white shadow-sm border-b border-gray-200", className)}>
      <div className="w-full">
        {children}
      </div>
    </nav>
  );
};

// 2. Desktop Navigation - Responsive padding
interface NavBodyProps {
  children: ReactNode;
  className?: string;
}

export const NavBody: React.FC<NavBodyProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn(
      "hidden lg:flex items-center justify-between w-full",
      "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-32",
      "py-3 lg:py-4 xl:py-5",
      className
    )}>
      {children}
    </div>
  );
};

// 3. Navigation Items - With underline hover animation
interface NavItem {
  name: string;
  link: string;
  subItems?: NavItem[];
}

interface NavItemsProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
  isMobile?: boolean;
}

export const NavItems: React.FC<NavItemsProps> = ({
  items,
  className,
  onItemClick,
  isMobile = false,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        parentRef.current &&
        !parentRef.current.contains(event.target as Node)
      ) {
        setHoveredItem(null);
        setIsHoveringDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (itemName: string) => {
    if (!isMobile) {
      setHoveredItem(itemName);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !isHoveringDropdown) {
      // Small delay to allow moving to dropdown
      setTimeout(() => {
        if (!isHoveringDropdown) {
          setHoveredItem(null);
        }
      }, 100);
    }
  };

  const handleDropdownMouseEnter = () => {
    setIsHoveringDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHoveringDropdown(false);
    setHoveredItem(null);
  };

  const handleItemClick = () => {
    setHoveredItem(null);
    setIsHoveringDropdown(false);
    onItemClick?.();
  };

  const baseClasses = isMobile
    ? "flex flex-col divide-y divide-gray-100 w-full"
    : "flex items-center space-x-4 md:space-x-5 lg:space-x-6 xl:space-x-8 2xl:space-x-10 text-sm md:text-base font-semibold";

  return (
    <div className={cn(baseClasses, className)}>
      {items.map((item, idx) => (
        <div
          key={`nav-item-${idx}`}
          className="relative"
          ref={idx === items.findIndex(i => i.name === "Guide") ? parentRef : undefined}
          onMouseEnter={() => handleMouseEnter(item.name)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            to={item.link}
            onClick={handleItemClick}
            className={cn(
              "transition-all duration-300 whitespace-nowrap relative group flex items-center",
              isMobile
                ? "block px-6 py-5 text-lg font-semibold text-black hover:text-yellow-600 hover:bg-gray-50 first:pt-4 last:pb-4 w-full"
                : "text-gray-700 hover:text-yellow-600"
            )}
          >
            {item.name}
            {!isMobile && item.subItems && item.subItems.length > 0 && (
              <IconChevronDown
                size={16}
                className={cn(
                  "ml-1 transition-transform duration-200",
                  (hoveredItem === item.name || isHoveringDropdown) && "rotate-180"
                )}
              />
            )}
            {!isMobile && (
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full"></span>
            )}
          </Link>

          {/* Desktop Dropdown */}
          {!isMobile && item.subItems && item.subItems.length > 0 && (
            <div
              ref={idx === items.findIndex(i => i.name === "Guide") ? dropdownRef : undefined}
              className={cn(
                "absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transition-all duration-200 transform origin-top",
                (hoveredItem === item.name || isHoveringDropdown)
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              )}
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
              style={{
                transition: 'opacity 200ms ease, transform 200ms ease'
              }}
            >
              {item.subItems.map((subItem, subIdx) => (
                <Link
                  key={`subitem-${subIdx}`}
                  to={subItem.link}
                  className="block px-4 py-3 text-sm text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-200 font-medium"
                  onClick={handleItemClick}
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          )}

          {/* Mobile Sub-items */}
          {isMobile && item.subItems && item.subItems.length > 0 && (
            <div className="pl-6 bg-gray-50">
              {item.subItems.map((subItem, subIdx) => (
                <Link
                  key={`mobile-subitem-${subIdx}`}
                  to={subItem.link}
                  onClick={handleItemClick}
                  className="block px-6 py-4 text-base font-medium text-gray-600 hover:text-yellow-600 hover:bg-gray-100 border-b border-gray-100 last:border-b-0 transition-all duration-200"
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// 4. Mobile Navigation
interface MobileNavProps {
  children: ReactNode;
  className?: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn(
      "lg:hidden w-full px-4 sm:px-6 py-4 relative",
      className
    )}>
      {children}
    </div>
  );
};

// 5. Mobile Navigation Header
interface MobileNavHeaderProps {
  children: ReactNode;
  className?: string;
}

export const MobileNavHeader: React.FC<MobileNavHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn(
      "flex items-center justify-between w-full",
      className
    )}>
      {children}
    </div>
  );
};

// 6. Mobile Navigation Menu
interface MobileNavMenuProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  children,
  className,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay - full width */}
      <div
        className="fixed inset-0 top-16 lg:top-20 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Menu content - Full width design */}
      <div className={cn(
        "fixed left-0 right-0 z-50",
        "bg-white border-b border-gray-200 shadow-xl",
        className
      )}>

        {/* Menu items container */}
        <div className="w-full py-4 max-h-[70vh] overflow-y-auto text-black">
          {children}
        </div>
      </div>
    </>
  );
};

// 7. Mobile Navigation Toggle
interface MobileNavToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileNavToggle: React.FC<MobileNavToggleProps> = ({
  isOpen,
  onClick,
}) => {
  const Icon = isOpen ? IconX : IconMenu2;
  return (
    <button
      onClick={onClick}
      className="relative p-2 sm:p-3 rounded-2xl text-gray-700 hover:text-yellow-600 hover:bg-yellow-50/80 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-yellow-200/50 group"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/5 group-hover:to-yellow-500/10 rounded-2xl transition-all duration-300" />
      <Icon size={20} className="sm:w-6 sm:h-6 relative z-10 transition-transform duration-200 group-hover:scale-110" />
    </button>
  );
};

// 8. Responsive Logo
export const NavbarLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 lg:space-x-4 xl:space-x-5">
      <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 flex items-center justify-center">
        <img
          src="./src/Assets/Images/logo/AL-BURAQ.png"
          alt="Al Burak International Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-yellow-600 text-lg lg:text-xl xl:text-2xl font-bold leading-tight">
          AL BURAQ
        </span>
        <span className="text-gray-600 text-xs lg:text-sm xl:text-base font-medium leading-tight">
          INTERNATIONAL
        </span>
      </div>
    </Link>
  );
};

// 9. Responsive Buttons - UPDATED VERSION
interface NavbarButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  to?: string; // Add 'to' prop for React Router
  as?: React.ElementType;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({
  href,
  to,
  as: Tag = to ? Link : "a", // Use Link if 'to' prop is provided
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles = "px-4 py-2 lg:px-6 lg:py-2.5 xl:px-8 xl:py-3.5 rounded-lg text-sm lg:text-base xl:text-lg font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer";

  const variantStyles = {
    primary: "bg-yellow-500 text-white hover:bg-yellow-600",
    secondary: "border lg:border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50",
  };

  // Determine the props to pass based on component type
  const linkProps = to 
    ? { to } // For React Router Link
    : { href }; // For regular anchor tag

  return (
    <Tag
      {...linkProps}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

// 10. Button Container - Responsive spacing
interface NavbarActionsProps {
  children: ReactNode;
  className?: string;
}

export const NavbarActions: React.FC<NavbarActionsProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn(
      "flex items-center space-x-2 sm:space-x-3 lg:space-x-4 xl:space-x-6 w-full lg:w-auto",
      className
    )}>
      {children}
    </div>
  );
};

// 11. Mobile-specific actions container
interface MobileNavActionsProps {
  children: ReactNode;
  className?: string;
}

export const MobileNavActions: React.FC<MobileNavActionsProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn(
      "px-4 sm:px-6 py-4 border-t border-gray-100 space-y-3 w-full",
      className
    )}>
      {children}
    </div>
  );
};