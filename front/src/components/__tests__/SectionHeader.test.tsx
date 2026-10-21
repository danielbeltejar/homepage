import { render, screen } from "@testing-library/react";
import SectionHeader from "../SectionHeader";

describe("SectionHeader", () => {
  it("renders the title", () => {
    render(<SectionHeader title="Projects" link="#projects" />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders a link element", () => {
    render(<SectionHeader title="Projects" link="#projects" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#projects");
  });
});
