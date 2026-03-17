interface FilterChipsProps {
  filters: string[];
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

const FilterChips = ({ filters, activeFilter, onFilterChange }: FilterChipsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(isActive ? null : filter)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-heading font-bold transition-colors ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};

export default FilterChips;
