'use client';

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  Transition,
  Variant,
} from 'motion/react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/utils';
import { XIcon, Plus } from 'lucide-react';
import { useScrollLock } from '../Hooks/useScrollLock';

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const DialogContext = React.createContext<DialogContextType | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

type DialogProviderProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function DialogProvider({ children, transition }: DialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
    [isOpen, uniqueId]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogContext.Provider>
  );
}

type DialogProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function Dialog({ children, transition }: DialogProps) {
  return (
    <DialogProvider>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogProvider>
  );
}

type DialogTriggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  triggerRef?: React.RefObject<HTMLDivElement | null>;
};

function DialogTrigger({
  children,
  className,
  style,
  triggerRef,
}: DialogTriggerProps) {
  const { setIsOpen, isOpen, uniqueId } = useDialog();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen]
  );

  return (
    <motion.div
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('relative cursor-pointer group', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      role='button'
      aria-haspopup='dialog'
      aria-expanded={isOpen}
      aria-controls={`dialog-content-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

type DialogContent = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogContent({ children, className, style }: DialogContent) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();
  const containerRef = useRef<HTMLDivElement>(null);
  const [firstFocusableElement, setFirstFocusableElement] =
    useState<HTMLElement | null>(null);
  const [lastFocusableElement, setLastFocusableElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
      if (event.key === 'Tab') {
        if (!firstFocusableElement || !lastFocusableElement) return;

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsOpen, firstFocusableElement, lastFocusableElement]);

  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus();
      return;
    }
    const focusableElements = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements && focusableElements.length > 0) {
      setFirstFocusableElement(focusableElements[0] as HTMLElement);
      setLastFocusableElement(
        focusableElements[focusableElements.length - 1] as HTMLElement
      );
      requestAnimationFrame(() => {
        (focusableElements[0] as HTMLElement).focus();
      });
    }

    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [isOpen, triggerRef]);

  return (
    <>
      <motion.div
        ref={containerRef}
        layoutId={`dialog-${uniqueId}`}
        className={cn('overflow-hidden', className)}
        style={{
          ...style,
          willChange: 'transform, opacity',
        }}
        role='dialog'
        aria-modal='true'
        aria-labelledby={`dialog-title-${uniqueId}`}
        aria-describedby={`dialog-description-${uniqueId}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
          mass: 0.8,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

type DialogContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogContainer({ children, className }: DialogContainerProps) {
  const { isOpen, setIsOpen, uniqueId } = useDialog();
  const [mounted, setMounted] = useState(false);

  useScrollLock(isOpen);

  useEffect(() => {
    const drawerWrapper = document.querySelectorAll('[drawer-wrapper]');

    if (isOpen) {
      drawerWrapper.forEach((wrapper) => wrapper?.classList.add('open'));
    } else {
      drawerWrapper.forEach((wrapper) => wrapper?.classList.remove('open'));
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode='wait'>
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            data-lenis-prevent
            className='fixed inset-0 h-full z-50 w-full overflow-hidden backdrop-blur-sm bg-black/60'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0.0, 0.4, 1],
            }}
            onClick={() => setIsOpen(false)}
          ></motion.div>
          <motion.div
            className={cn(`fixed inset-0 z-50 w-fit mx-auto flex items-center justify-center overflow-hidden p-4`, className)}
            style={{ willChange: 'transform' }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogTitle({ children, className, style }: DialogTitleProps) {
  const { uniqueId } = useDialog();

  return (
    <motion.h1
      layoutId={`dialog-title-container-${uniqueId}`}
      className={className}
      style={style}
      layout
    >
      {children}
    </motion.h1>
  );
}

type DialogSubtitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogSubtitle({ children, className, style }: DialogSubtitleProps) {
  const { uniqueId } = useDialog();

  return (
    <motion.div
      layoutId={`dialog-subtitle-container-${uniqueId}`}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

type DialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function DialogDescription({
  children,
  className,
  variants,
  disableLayoutAnimation,
}: DialogDescriptionProps) {
  const { uniqueId } = useDialog();

  return (
    <motion.div
      key={`dialog-description-${uniqueId}`}
      layoutId={
        disableLayoutAnimation
          ? undefined
          : `dialog-description-content-${uniqueId}`
      }
      variants={variants}
      className={className}
      initial='initial'
      animate='animate'
      exit='exit'
      id={`dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

type DialogImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

function DialogImage({ src, alt, className, style }: DialogImageProps) {
  const { uniqueId } = useDialog();

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn(className)}
      layoutId={`dialog-img-${uniqueId}`}
      style={style}
    />
  );
}

type DialogCloseProps = {
  children?: React.ReactNode;
  className?: string;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function DialogClose({ children, className, variants }: DialogCloseProps) {
  const { setIsOpen, uniqueId } = useDialog();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <motion.button
      onClick={handleClose}
      type='button'
      aria-label='Close dialog'
      key={`dialog-close-${uniqueId}`}
      className={cn('absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-200 shadow-lg', className)}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={variants}
    >
      {children || <XIcon className='w-5 h-5 text-gray-800' />}
    </motion.button>
  );
}

// New Umrah-specific card components
type UmrahCardProps = {
  item: {
    id: number;
    url: string;
    title: string;
    description: string;
    tags?: string[];
    detailedContent?: string;
  };
  className?: string;
};

function UmrahCard({ item, className }: UmrahCardProps) {
  return (
    <Dialog
      transition={{
        type: 'spring',
        bounce: 0.05,
        duration: 0.5,
      }}
    >
      <DialogTrigger
        style={{
          borderRadius: '12px',
        }}
        className={cn(
          'flex w-full flex-col overflow-hidden bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative h-80 border border-gray-200',
          className
        )}
      >
        <DialogImage
          src={item.url}
          alt={item.title}
          className='h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
        <div className='flex flex-grow flex-row items-end justify-between p-4'>
          <div className='flex-1'>
            <DialogTitle className='text-black text-lg font-semibold'>
              {item.title}
            </DialogTitle>
            <p className='text-gray-600 text-sm mt-1 line-clamp-2'>
              {item.description}
            </p>
          </div>
          <button className='absolute bottom-4 right-4 p-2 bg-white hover:bg-gray-50 rounded-lg shadow-md transition-colors'>
            <Plus className='w-5 h-5 text-gray-700' />
          </button>
        </div>
      </DialogTrigger>
      
      <DialogContainer className='pt-20'>
        <DialogContent
          style={{
            borderRadius: '24px',
          }}
          className='relative flex flex-col overflow-hidden bg-white max-w-3xl w-full max-h-[85vh] shadow-2xl'
        >
          <DialogImage
            src={item.url}
            alt={item.title}
            className='w-full h-64 object-cover'
          />
          
          <DialogClose />
          
          <div className='p-6 overflow-y-auto flex-1'>
            <DialogTitle className='text-3xl font-bold text-black mb-4'>
              {item.title}
            </DialogTitle>

            <DialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
              }}
            >
              {item.detailedContent ? (
                <div
                  className='prose prose-lg max-w-none text-gray-700'
                  dangerouslySetInnerHTML={{ __html: item.detailedContent }}
                />
              ) : (
                <p className='text-gray-700 leading-relaxed'>
                  {item.description}
                </p>
              )}
              
              {item.tags && item.tags.length > 0 && (
                <div className='flex flex-wrap gap-2 mt-6'>
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </DialogDescription>
          </div>
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
}

// Grid layout component for Umrah cards
type UmrahCardsGridProps = {
  items: Array<{
    id: number;
    url: string;
    title: string;
    description: string;
    tags?: string[];
    detailedContent?: string;
  }>;
  className?: string;
};

function UmrahCardsGrid({ items, className }: UmrahCardsGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto', className)}>
      {items.map((item) => (
        <UmrahCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContainer,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogSubtitle,
  DialogDescription,
  DialogImage,
  UmrahCard,
  UmrahCardsGrid,
};