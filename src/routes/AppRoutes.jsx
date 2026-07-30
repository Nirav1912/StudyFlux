import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Landing from "../pages/Landing";
import Auth from "../pages/Auth";

// Protected Pages
import Dashboard from "../pages/Dashboard";
import CreateTest from "../pages/CreateTest";
import Test from "../pages/Test";
import Result from "../pages/Result";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

// Layout
import MainLayout from "../layouts/MainLayout";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";
import History from "../pages/History";
import Progress from "../pages/Progress";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/Auth/ForgotPassword";

export default function AppRoutes() {
  return (
    <BrowserRouter>
    
      <Routes>

        

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
        {/* Protected Routes */}
       <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-test"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CreateTest />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Test />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Result />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
  path="/history"
  element={
    <ProtectedRoute>
      <MainLayout>
        <History />
      </MainLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/progress"
  element={
    <ProtectedRoute>
      <MainLayout>
        <Progress />
      </MainLayout>
    </ProtectedRoute>
  }
/>



        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Settings />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-4xl font-bold">
              404 | Page Not Found
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}