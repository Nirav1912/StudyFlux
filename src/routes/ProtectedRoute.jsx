import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  const isGuest = localStorage.getItem("guest") === "true";

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // Allow logged-in users OR guest users
  if (!user && !isGuest) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}