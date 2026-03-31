import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { DashboardPage } from "@/pages/DashboardPage";
import { setToken } from "@/lib/api";
import { vi } from "vitest";

function renderDashboard() {
  setToken("test-token");
  return render(
    <BrowserRouter>
      <AuthProvider>
        <DashboardPage />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe("DashboardPage", () => {
  afterEach(() => {
    setToken(null);
    vi.restoreAllMocks();
  });

  it("shows loading state initially", () => {
    vi.spyOn(globalThis, "fetch").mockReturnValueOnce(new Promise(() => {}));
    renderDashboard();
    expect(screen.getByText(/loading posts/i)).toBeInTheDocument();
  });

  it("shows empty state when no posts", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ posts: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
    });
  });

  it("renders posts in a table", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          posts: [
            { filename: "hello.md", title: "Hello World", date: "2025-01-01", author: "Author" },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText("Hello World")).toBeInTheDocument();
    });
    expect(screen.getByText("2025-01-01")).toBeInTheDocument();
    // "Author" appears in both table header and cell — use getAllByText
    expect(screen.getAllByText("Author").length).toBeGreaterThanOrEqual(1);
  });
});
