import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SectionHeader from "../SectionHeader";

describe("SectionHeader", () => {
  it("renders the title", () => {
    render(
      <BrowserRouter>
        <SectionHeader title="Projects" link="#projects" />
      </BrowserRouter>
    );
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders a link element", () => {
    render(
      <BrowserRouter>
        <SectionHeader title="Projects" link="#projects" />
      </BrowserRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#projects");
  });
});
