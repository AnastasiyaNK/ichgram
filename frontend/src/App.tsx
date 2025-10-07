import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreatePage from "./pages/CreatePage/CreatePage";
import MessagesPage from "./pages/MessagesPages/MessagesPages";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import Layout from "./components/layouts/Layout";
import PrivateRoute from "./utils/PrivateRoute";
import AppInitializer from "./utils/AppInitializer";
import EditProfil from "./components/EditProfil/EditProfil";
import "@ant-design/v5-patch-for-react-19";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <AppInitializer>
            <PrivateRoute />
          </AppInitializer>
        }
      >
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/create" element={<CreatePage />} />

          {/* 🔹 власний профіль */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* 🔹 чужий профіль */}
          <Route path="/profile/:userId" element={<ProfilePage />} />

          {/* 🔹 редагування профілю */}
          <Route path="/profile/edit" element={<EditProfil />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
