import { renderHook } from "@testing-library/react";
import { useScrollPosition } from "../useScrollPosition";

describe("useScrollPosition", () => {
  it("returns ref and initial activeIndex of 0", () => {
    const { result } = renderHook(() =>
      useScrollPosition({ itemWidth: 300, gap: 16 })
    );

    expect(result.current.activeIndex).toBe(0);
    expect(result.current.scrollContainerRef).toBeDefined();
    expect(result.current.scrollContainerRef.current).toBeNull();
  });

  it("returns consistent ref across re-renders", () => {
    const { result, rerender } = renderHook(() =>
      useScrollPosition({ itemWidth: 300, gap: 16 })
    );

    const ref1 = result.current.scrollContainerRef;
    rerender();
    const ref2 = result.current.scrollContainerRef;

    expect(ref1).toBe(ref2);
  });
});
