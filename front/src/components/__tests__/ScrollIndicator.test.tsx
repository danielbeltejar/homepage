import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScrollIndicator from "../ScrollIndicator";

describe("ScrollIndicator", () => {
  it("renders correct number of dots", () => {
    render(<ScrollIndicator totalItems={5} activeIndex={0} />);
    const dots = screen.getAllByRole("generic").filter(
      (el) => el.getAttribute("aria-label")?.startsWith("Item")
    );
    expect(dots).toHaveLength(5);
  });

  it("marks the active dot with aria-current", () => {
    render(<ScrollIndicator totalItems={3} activeIndex={1} />);
    const activeItem = screen.getByLabelText("Item 2 (active)");
    expect(activeItem).toHaveAttribute("aria-current", "true");
  });

  it("calls onPillClick when a dot is clicked", async () => {
    const onClick = vi.fn();
    render(<ScrollIndicator totalItems={3} activeIndex={0} onPillClick={onClick} />);
    await userEvent.click(screen.getByLabelText("Item 3"));
    expect(onClick).toHaveBeenCalledWith(2);
  });
});
