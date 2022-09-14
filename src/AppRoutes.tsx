import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { ContactList } from "./pages/Contacts/ContactList";
import { Login } from "./pages/Login";
import { Endpoints } from "./shared/constants";
import { useAppSelector } from "./store/hooks";
import {selectIsLoggedIn} from "./store/slices/auth/authSlice"

export const AppRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <>
    {isLoggedIn && <Header/>}
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
          element={
            isLoggedIn ? <Navigate to={Endpoints.Contacts} /> : <Login />
          }
        />
        <Route
          path="/contacts"
          element={
            isLoggedIn ? <ContactList /> : <Navigate to={Endpoints.Login} />
          }
        />
      </Routes>
    </>
  );
};
