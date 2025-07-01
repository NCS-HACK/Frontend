import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Common/Sidebar";
import Topbar from "./components/Common/Topbar";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Events from "./pages/Events";
import Tasks from "./pages/Tasks";
import Minutes from "./pages/Minutes";
import Files from "./pages/Files";
import Polls from "./pages/Polls";
import MemberProfile from "./pages/MemberProfile";
import EventDetails from "./pages/EventDetails";
import TaskDetails from "./pages/TaskDetails";
import MinutesDetails from "./pages/MinutesDetails";
import Login from "./pages/Login";

// Auth wrapper to protect routes
function RequireAuth({ children }) {
  const token = localStorage.getItem("access_token");
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <div className="flex h-screen bg-background">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Topbar />
                  <main className="flex-1 p-6 overflow-y-auto">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/members" element={<Members />} />
                      <Route path="/members/:id" element={<MemberProfile />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/events/:id" element={<EventDetails />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/tasks/:id" element={<TaskDetails />} />
                      <Route path="/minutes" element={<Minutes />} />
                      <Route path="/minutes/:id" element={<MinutesDetails />} />
                      <Route path="/files" element={<Files />} />
                      <Route path="/polls" element={<Polls />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
