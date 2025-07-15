import { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);
  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      { loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (children) }
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
