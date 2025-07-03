import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          News App
        </Link>

        <div className="space-x-4">
          {!user && (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link to="/register" className="text-gray-300 hover:text-white">
                Register
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={logout}
              className="text-gray-300 hover:text-white"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
