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
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${
            activeFilter === filter
              ? 'bg-accent text-window'
              : 'bg-background text-gray-600 hover:bg-accent hover:text-window'
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