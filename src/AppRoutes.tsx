import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ContactList } from "./pages/ContactList";
import { Login } from "./pages/Login";
import { Endpoints } from "./shared/constants";

export const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to={Endpoints.Contacts} />
            ) : (
              <Navigate to={Endpoints.Login} />
            )
          }
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/contacts" element={<ContactList />} />
      </Routes>
    </>
  );
};
