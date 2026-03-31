import { renderHook, act } from "@testing-library/react";
import { useFilter } from "../useFilter";

const items = [
  { name: "A", vendor: "Microsoft" },
  { name: "B", vendor: "Kubernetes" },
  { name: "C", vendor: "Microsoft" },
  { name: "D", vendor: "Cisco" },
];

describe("useFilter", () => {
  it("returns all items when filter is 'all'", () => {
    const { result } = renderHook(() => useFilter(items, "vendor"));
    expect(result.current.activeFilter).toBe("all");
    expect(result.current.filteredItems).toHaveLength(4);
  });

  it("extracts unique available filters", () => {
    const { result } = renderHook(() => useFilter(items, "vendor"));
    expect(result.current.availableFilters).toContain("all");
    expect(result.current.availableFilters).toContain("Microsoft");
    expect(result.current.availableFilters).toContain("Kubernetes");
    expect(result.current.availableFilters).toContain("Cisco");
  });

  it("filters items when a specific filter is set", () => {
    const { result } = renderHook(() => useFilter(items, "vendor"));

    act(() => {
      result.current.setActiveFilter("Microsoft");
    });

    expect(result.current.filteredItems).toHaveLength(2);
    expect(result.current.filteredItems.every((i) => i.vendor === "Microsoft")).toBe(true);
  });

  it("excludes 'all' when includeAll is false", () => {
    const { result } = renderHook(() => useFilter(items, "vendor", false));
    expect(result.current.availableFilters).not.toContain("all");
  });

  it("returns empty array for non-matching filter", () => {
    const { result } = renderHook(() => useFilter(items, "vendor"));

    act(() => {
      result.current.setActiveFilter("NonExistent");
    });

    expect(result.current.filteredItems).toHaveLength(0);
  });
});
