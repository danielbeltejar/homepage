import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import App from "@/App";

function renderApp(route = "/") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("App routing", () => {
  it("renders login page when not authenticated", () => {
    renderApp("/login");
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it("redirects to login for protected routes when not authenticated", () => {
    renderApp("/");
    // Should show login form since user is not authenticated
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it("redirects unknown routes", () => {
    renderApp("/nonexistent");
    // Should redirect to / → then to login
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });
});
