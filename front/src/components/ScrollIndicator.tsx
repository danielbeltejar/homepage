interface ScrollIndicatorProps {
  totalItems: number;
  activeIndex: number;
  className?: string;
}

const ScrollIndicator = ({ totalItems, activeIndex, className = '' }: ScrollIndicatorProps) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="flex gap-2 bg-secondary-button dark:bg-dark-accent px-4 py-2 rounded-full shadow-lg">
        {Array.from({ length: totalItems }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-accent dark:bg-dark-accent w-6' 
                : 'bg-window dark:bg-dark-window w-2'
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
