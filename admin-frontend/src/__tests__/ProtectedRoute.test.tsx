import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function renderWithAuth(ui: React.ReactElement, { route = "/" } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
}

describe("ProtectedRoute", () => {
  it("redirects to login when not authenticated", () => {
    renderWithAuth(
      <ProtectedRoute>
        <div>Secret</div>
      </ProtectedRoute>
    );

    // Should NOT render the protected content
    expect(screen.queryByText("Secret")).not.toBeInTheDocument();
  });
});
