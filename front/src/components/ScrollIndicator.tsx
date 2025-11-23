interface ScrollIndicatorProps {
  totalItems: number;
  activeIndex: number;
  className?: string;
  onPillClick?: (index: number) => void;
}

const ScrollIndicator = ({ totalItems, activeIndex, className = '', onPillClick }: ScrollIndicatorProps) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="flex gap-2 bg-secondary-button dark:bg-dark-accent px-4 py-2 rounded-full shadow-lg">
        {Array.from({ length: totalItems }).map((_, index) => (
          <div
            key={index}
            onClick={() => onPillClick?.(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === activeIndex 
                ? 'bg-accent dark:bg-dark-accent w-6' 
                : 'bg-white dark:bg-dark-window w-2 shadow-sm outline outline-1 outline-gray-200'
            }`}
            aria-label={`Item ${index + 1}${index === activeIndex ? ' (active)' : ''}`}
            aria-current={index === activeIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollIndicator;
