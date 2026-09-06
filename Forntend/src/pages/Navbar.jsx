import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // ------------------------------------------
  // Check backend session
  // ------------------------------------------

  const checkSession = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/me",
        {
          method: "GET",
          credentials: "include",
        }
      );

      setIsLoggedIn(response.ok);
    } catch (error) {
      console.error("Session check error:", error);
      setIsLoggedIn(false);
    } finally {
      setCheckingSession(false);
    }
  };

  // ------------------------------------------
  // Check session when:
  // 1. Navbar first loads
  // 2. User changes route
  // ------------------------------------------

  useEffect(() => {
    checkSession();
  }, [location.pathname]);

  // ------------------------------------------
  // Logout
  // ------------------------------------------

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "Logout failed:",
          data.message
        );
        return;
      }

      // Update Navbar immediately
      setIsLoggedIn(false);

      // Go to login
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-indigo-600"
        >
          RESIDER
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">

          {/* Logged Out */}
          {!checkingSession && !isLoggedIn && (
            <>
              <Link
                to="/register"
                className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
              >
                Login
              </Link>
            </>
          )}

          {/* Logged In */}
          {!checkingSession && isLoggedIn && (
            <>
              <Link
                to="/vault"
                className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
              >
                Vault
              </Link>

              <Link
                to="/generate"
                className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
              >
                Generate Password
              </Link>
            </>
          )}

          {/* Public Links */}

          <Link
            to="/security"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            Security
          </Link>

          <Link
            to="/how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            How It Works
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            About Us
          </Link>

          {/* Logout */}

          {!checkingSession && isLoggedIn && (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;