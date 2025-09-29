"use client";
import { cn } from "../lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link } from "react-router-dom";
import React, { ReactNode, ReactElement, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

// 1. Navbar - Keep only the main navbar animation

interface NavbarProps {
  children:
  | ReactElement<{ visible?: boolean }>
  | Array<ReactElement<{ visible?: boolean }>>;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  // GSAP Load Animation - Only for navbar appearance
  useEffect(() => {
    const navbarEl = ref.current;
    if (navbarEl && !isLoaded) {
      // Set initial state - navbar starts above the viewport
      gsap.set(navbarEl, {
        y: -100,
        opacity: 0,
      });

      // Animate navbar sliding down
      gsap.to(navbarEl, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2,
        onComplete: () => setIsLoaded(true)
      });
    }
  }, [isLoaded]);

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-5 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child
      )}
    </motion.div>
  );
};

// 2. NavBody - White theme with gold accents

interface NavBodyProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
}

export const NavBody: React.FC<NavBodyProps> = ({
  children,
  className,
  visible = false,
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [naturalWidth, setNaturalWidth] = useState<number>(0);

  React.useEffect(() => {
    if (navRef.current && !isInitialized) {
      // Wait for the initial render to complete
      const timer = setTimeout(() => {
        const rect = navRef.current?.getBoundingClientRect();
        if (rect && rect.width > 0) {
          setNaturalWidth(rect.width);
          setIsInitialized(true);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [children, isInitialized]);

  React.useEffect(() => {
    if (navRef.current && isInitialized) {
      const updateWidth = () => {
        if (!visible) {
          const rect = navRef.current?.getBoundingClientRect();
          if (rect && rect.width > 0) {
            setNaturalWidth(rect.width);
          }
        }
      };

      window.addEventListener('resize', updateWidth);

      return () => {
        window.removeEventListener('resize', updateWidth);
      };
    }
  }, [visible, isInitialized]);

  const getAnimatedWidth = () => {
    if (!isInitialized || naturalWidth === 0) return "auto";
    // Ensure minimum width to prevent button overflow
    return visible ? Math.max(naturalWidth * 0.9, Math.min(naturalWidth, 650)) : "auto";
  };

  return (
    <motion.div
      ref={navRef}
      animate={{
        backdropFilter: visible ? "blur(20px) saturate(130%)" : "blur(12px) saturate(110%)",
        boxShadow: visible
          ? "0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(212, 175, 55, 0.2)"
          : "0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(212, 175, 55, 0.15)",
        width: getAnimatedWidth(),
      }}
      transition={{
        type: "tween",
        duration: 0.2,
        ease: "easeOut",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex",
        "bg-white border border-gold-300/30",
        visible && "bg-white border-gold-400/40",
        !isInitialized && "w-auto",
        className
      )}
      style={{
        background: "white"
      }}
    >
      {children}
    </motion.div>
  );
};

// 3. NavItems - White theme with gold hover effects - Improved responsiveness

interface NavItem {
  name: string;
  link: string;
}

interface NavItemsProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
}

export const NavItems: React.FC<NavItemsProps> = ({
  items,
  className,
  onItemClick,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-1 flex-row items-center justify-center text-sm font-medium gap-2",
        // Responsive adjustments for smaller screens
        "max-[1300px]:gap-1 max-[1300px]:text-xs",
        "max-[1100px]:gap-0.5",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          key={`link-${idx}`}
          to={item.link}
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          className={cn(
            "relative px-4 py-2 text-gray-700 hover:text-yellow-700 transition-colors duration-200 whitespace-nowrap flex-shrink-0 font-medium",
            // Responsive padding adjustments
            "max-[1300px]:px-3",
            "max-[1100px]:px-2",
          )}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-500/25"
              transition={{ duration: 0.15 }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

// 4. MobileNav - White theme mobile navigation

interface MobileNavProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  children,
  className,
  visible = false,
}) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(212, 175, 55, 0.2)"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
      }}
      transition={{
        type: "tween",
        duration: 0.2,
        ease: "easeOut",
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        "bg-white/90 border border-gold-300/30 rounded-2xl",
        // Small device adjustments
        "max-[400px]:max-w-[calc(100vw-1rem)] max-[400px]:py-1.5",
        visible && "bg-white/95 border-gold-400/40",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// 5. MobileNavHeader - White theme header

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
      "flex w-full flex-row items-center justify-between px-2",
      // Small device adjustments
      "max-[400px]:px-1",
      className
    )}>
      {children}
    </div>
  );
};

// 6. MobileNavMenu - White theme dropdown menu

interface MobileNavMenuProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
}

export const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  children,
  className,
  isOpen,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-3 rounded-lg px-4 py-6",
            "bg-white/96 border border-gold-300/40 backdrop-blur-xl shadow-lg shadow-black/10",
            // Small device adjustments
            "max-[400px]:top-14 max-[400px]:px-3 max-[400px]:py-4 max-[400px]:gap-2",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 7. MobileNavToggle - Gold colored toggle

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
    <Icon
      className={cn(
        "text-yellow-600 hover:text-yellow-700 transition-colors duration-150 cursor-pointer mr-4",
        // Smaller icon for small devices
        "max-[400px]:mr-2"
      )}
      size={24}
      onClick={onClick}
    />
  );
};

// 8. NavbarLogo - Keep original layout and size

export const NavbarLogo: React.FC = () => {
  return (
    <a
      href="#"
      className={cn(
        "relative z-20 flex items-center space-x-4 px-3 py-2 text-sm font-normal whitespace-nowrap flex-shrink-0",
        // Small device adjustments
        "max-[400px]:mr-2 max-[400px]:space-x-2 max-[400px]:px-2 max-[400px]:py-1"
      )}
    >
      <div className={cn(
        "w-12 h-12 flex items-center justify-center p-2",
        // Smaller logo for small devices
        "max-[400px]:w-9 max-[400px]:h-9 max-[400px]:p-1.5"
      )}>
        <img
          src="./src/Assets/Images/logo/AL-BURAQ.png"
          alt="Al Burak International Logo"
          className="w-full h-full object-contain scale-125 drop-shadow-sm"
        />
      </div>
      <span className="font-semibold">
        <span className={cn(
          "text-yellow-600 text-lg font-bold",
          // Smaller text for small devices
          "max-[400px]:text-base"
        )}>
          AL BURAQ
        </span>
        <span className={cn(
          "text-gray-600 text-lg ml-2 font-medium",
          // Smaller text for small devices
          "max-[400px]:text-xs max-[400px]:ml-1"
        )}>
          INTERNATIONAL
        </span>
      </span>
    </a>
  );
};

// 9. NavbarButton - Improved responsive buttons without changing layout

interface NavbarButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  as?: React.ElementType;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles = cn(
    "px-4 py-2 rounded-lg text-sm font-semibold relative cursor-pointer transition-all duration-200 inline-block text-center whitespace-nowrap flex-shrink-0",
    // Better responsive sizing to prevent overflow
    "max-[1300px]:px-3 max-[1300px]:py-1.5 max-[1300px]:text-xs",
    "max-[1100px]:px-2 max-[1100px]:py-1 max-[1100px]:text-xs",
    "max-[400px]:px-3 max-[400px]:py-1.5 max-[400px]:text-xs"
  );

  const variantStyles: Record<string, string> = {
    primary: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 hover:scale-[1.02] font-bold tracking-wide shadow-md",
    secondary: "border-2 border-yellow-500 text-yellow-600 bg-white/70 backdrop-blur-md hover:bg-white/90 hover:text-yellow-700 hover:border-yellow-600 font-semibold shadow-sm",
    dark: "bg-gray-700 text-white border border-gray-600 hover:bg-gray-800 hover:text-gray-100 hover:border-gray-500 backdrop-blur-sm shadow-md",
    gradient: "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 text-white hover:from-yellow-700 hover:via-yellow-600 hover:to-yellow-500 hover:scale-[1.02] font-bold",
  };

  return (
    <Tag
      href={href}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

// 10. NavbarActions - New component to handle button group responsiveness

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
      "flex items-center gap-3 flex-shrink-0",
      // Responsive gap adjustments
      "max-[1300px]:gap-2",
      "max-[1100px]:gap-1.5",
      className
    )}>
      {children}
    </div>
  );
};