import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { LoginPage } from "@/pages/LoginPage";
import { vi } from "vitest";

function renderLogin() {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe("LoginPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders login form", () => {
    renderLogin();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows error on failed login", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ detail: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    );

    renderLogin();

    await userEvent.type(screen.getByLabelText(/username/i), "bad");
    await userEvent.type(screen.getByLabelText(/password/i), "creds");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it("disables button while loading", async () => {
    // Never resolves — keeps button in loading state
    vi.spyOn(globalThis, "fetch").mockReturnValueOnce(new Promise(() => {}));

    renderLogin();

    await userEvent.type(screen.getByLabelText(/username/i), "admin");
    await userEvent.type(screen.getByLabelText(/password/i), "pass");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
  });
});
