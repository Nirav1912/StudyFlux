import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { createProfile } from "../services/profileService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get existing session
    supabase.auth.getSession().then(async ({ data }) => {
      const currentUser = data.session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        await createProfile(currentUser);
      }

      setLoading(false);
    });

    // Listen for login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        await createProfile(currentUser);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}