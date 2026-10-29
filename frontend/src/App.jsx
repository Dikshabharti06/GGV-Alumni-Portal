import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { api } from "./lib/api";
import Brand from "./components/Brand";
import Protected from "./components/Protected";
import PortalLayout from "./components/PortalLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AlumniDirectory from "./pages/AlumniDirectory";
import Events from "./pages/Events";
import Announcements from "./pages/Announcements";
import AdminDashboard from "./pages/AdminDashboard";
import "./index.css";

function PortalApp() {
  const [user, setUser] = useState(null),
    [checked, setChecked] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    api
      .me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setChecked(true));
  }, [loc.pathname]);
  if (!checked)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-5.5 bg-navy text-white">
        <Brand />
        <span className="text-[12px] text-[#b6c8d2]">
          Opening your GGV network…
        </span>
      </div>
    );
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/register"
        element={
          user ? <Navigate to="/dashboard" /> : <Register />
        }
      />
      <Route
        path="/dashboard"
        element={
          <Protected user={user}>
            <PortalLayout user={user}>
              <Dashboard user={user} />
            </PortalLayout>
          </Protected>
        }
      />
      <Route
        path="/directory"
        element={
          <Protected user={user}>
            <PortalLayout user={user}>
              <AlumniDirectory />
            </PortalLayout>
          </Protected>
        }
      />
      <Route
        path="/events"
        element={
          <Protected user={user}>
            <PortalLayout user={user}>
              <Events />
            </PortalLayout>
          </Protected>
        }
      />
      <Route
        path="/announcements"
        element={
          <Protected user={user}>
            <PortalLayout user={user}>
              <Announcements />
            </PortalLayout>
          </Protected>
        }
      />
      <Route
        path="/admin"
        element={
          <Protected user={user} roles={["admin"]}>
            <PortalLayout user={user}>
              <AdminDashboard />
            </PortalLayout>
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PortalApp />
    </BrowserRouter>
  );
}
