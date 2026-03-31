import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterPills from "../FilterPills";

const filters = ["all", "Microsoft", "Kubernetes", "Cisco"];

describe("FilterPills", () => {
  it("renders all filter buttons", () => {
    render(
      <FilterPills filters={filters} activeFilter="all" onFilterChange={() => {}} />
    );
    expect(screen.getByText("★")).toBeInTheDocument(); // "all" shows ★
    expect(screen.getByText("Microsoft")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
  });

  it("marks active filter with aria-pressed", () => {
    render(
      <FilterPills filters={filters} activeFilter="Microsoft" onFilterChange={() => {}} />
    );
    expect(screen.getByText("Microsoft")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("★")).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onFilterChange when clicked", async () => {
    const onChange = vi.fn();
    render(
      <FilterPills filters={filters} activeFilter="all" onFilterChange={onChange} />
    );
    await userEvent.click(screen.getByText("Kubernetes"));
    expect(onChange).toHaveBeenCalledWith("Kubernetes");
  });

  it("displays ★ for 'all' filter", () => {
    render(
      <FilterPills filters={filters} activeFilter="all" onFilterChange={() => {}} />
    );
    expect(screen.getByText("★")).toBeInTheDocument();
  });
});
