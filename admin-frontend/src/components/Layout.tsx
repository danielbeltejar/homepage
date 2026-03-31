import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogOut, FileText, Plus } from "lucide-react";

export function Layout() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <header className="border-b border-[hsl(var(--border))]">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <FileText className="h-5 w-5" />
              Post Manager
            </Link>
            <Link to="/posts/new">
              <Button variant="ghost" size="sm">
                <Plus className="mr-1 h-4 w-4" />
                New Post
              </Button>
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[hsl(var(--muted-foreground))]">
              {username}
            </span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
