interface FilterPillsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

const FilterPills = ({ filters, activeFilter, onFilterChange, className = '' }: FilterPillsProps) => {
  return (
    <div className={`flex flex-wrap justify-start gap-2 mb-6 ${className}`}>
      {filters.map((filter) => (
        <button
          type="button"
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm border border-accent/10 hover:border-accent/30 ${
            activeFilter === filter
              ? 'bg-accent text-window shadow-md'
              : 'bg-secondary-button text-accent hover:bg-accent hover:text-window'
          }`}
          aria-pressed={activeFilter === filter}
          aria-label={`Filter by ${filter === 'all' ? 'all certifications' : filter}`}
        >
          {filter === 'all' ? '★' : filter}
        </button>
      ))}
    </div>
  );
};

export default FilterPills;
