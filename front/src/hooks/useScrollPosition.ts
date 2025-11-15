import { useRef, useState, useEffect, RefObject } from 'react';

interface UseScrollPositionOptions {
  itemWidth: number;
  gap: number;
}

interface UseScrollPositionReturn {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  activeIndex: number;
}

export const useScrollPosition = ({ 
  itemWidth, 
  gap 
}: UseScrollPositionOptions): UseScrollPositionReturn => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const itemTotalWidth = itemWidth + gap;
      const index = Math.round(scrollLeft / itemTotalWidth);
      setActiveIndex(index);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [itemWidth, gap]);

  return { scrollContainerRef, activeIndex };
};
