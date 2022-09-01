import React from 'react'
import { Login } from "./pages/Login";

export const AppRoutes = () => {
  return (
    <>
      
      <Routes>
        
        
        <Route
          path={Endpoints.Contacts}
          element={
            <Login />
          }
        />
      </Routes>
    </>
  );
}

