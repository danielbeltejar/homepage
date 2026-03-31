import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth";
import { vi } from "vitest";

// Helper that renders children within AuthProvider + Router
function renderWithProviders(ui: React.ReactElement) {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  );
}

// Tiny consumer component to inspect auth state
function AuthConsumer() {
  const { isAuthenticated, username, logout } = useAuth();
  return (
    <div>
      <span data-testid="authed">{String(isAuthenticated)}</span>
      <span data-testid="username">{username ?? ""}</span>
      <button onClick={logout}>logout</button>
    </div>
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("starts unauthenticated", () => {
    renderWithProviders(<AuthConsumer />);
    expect(screen.getByTestId("authed")).toHaveTextContent("false");
    expect(screen.getByTestId("username")).toHaveTextContent("");
  });

  it("authenticates after successful login", async () => {
    // Mock fetch for login
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({ access_token: "tok123", token_type: "bearer" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    function LoginTrigger() {
      const { login, isAuthenticated, username } = useAuth();
      return (
        <div>
          <button onClick={() => login("admin", "pass")}>login</button>
          <span data-testid="authed">{String(isAuthenticated)}</span>
          <span data-testid="username">{username ?? ""}</span>
        </div>
      );
    }

    renderWithProviders(<LoginTrigger />);
    await userEvent.click(screen.getByText("login"));

    await waitFor(() => {
      expect(screen.getByTestId("authed")).toHaveTextContent("true");
    });
    expect(screen.getByTestId("username")).toHaveTextContent("admin");
  });

  it("clears state on logout", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({ access_token: "tok", token_type: "bearer" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    function LoginAndLogout() {
      const { login, logout, isAuthenticated } = useAuth();
      return (
        <div>
          <button onClick={() => login("admin", "pass")}>login</button>
          <button onClick={logout}>logout</button>
          <span data-testid="authed">{String(isAuthenticated)}</span>
        </div>
      );
    }

    renderWithProviders(<LoginAndLogout />);
    await userEvent.click(screen.getByText("login"));
    await waitFor(() =>
      expect(screen.getByTestId("authed")).toHaveTextContent("true")
    );

    await userEvent.click(screen.getByText("logout"));
    expect(screen.getByTestId("authed")).toHaveTextContent("false");
  });
});

describe("useAuth outside provider", () => {
  it("throws when used outside AuthProvider", () => {
    // Suppress React error boundary output
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    function Bad() {
      useAuth();
      return null;
    }

    expect(() => render(<Bad />)).toThrow(
      "useAuth must be used within an AuthProvider"
    );
    spy.mockRestore();
  });
});
