import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PostCard from "../PostCard";

function renderPostCard(props: Partial<Parameters<typeof PostCard>[0]> = {}) {
  const defaults = {
    title: "Test Post Title",
    date: "2025-01-15",
    content: "Some markdown content here",
    onClick: vi.fn(),
  };
  return render(
    <BrowserRouter>
      <PostCard {...defaults} {...props} />
    </BrowserRouter>
  );
}

describe("PostCard", () => {
  it("renders title and date", () => {
    renderPostCard();
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(screen.getByText("2025-01-15")).toBeInTheDocument();
  });

  it("extracts and displays first image from markdown", () => {
    const contentWithImage = "Some text ![alt](https://example.com/img.png) more text";
    renderPostCard({ content: contentWithImage });
    const img = screen.getByAltText("Post");
    expect(img).toHaveAttribute("src", "https://example.com/img.png");
  });

  it("shows placeholder when no image in content", () => {
    renderPostCard({ content: "No images here" });
    expect(screen.queryByAltText("Post")).not.toBeInTheDocument();
  });

  it("renders an action element for navigation", () => {
    const onClick = vi.fn();
    renderPostCard({ onClick });
    // Button renders an <a> tag for the arrow action
    const container = document.querySelector("a");
    expect(container).toBeInTheDocument();
  });
});
