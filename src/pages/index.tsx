import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "../auth/AuthRoutes";
import PrivateRoutes from "../auth/PrivateRoutes";
import SignInPage from "./SignInPage/SignInPage";
import UserManagementPage from "./UserManagementPage/UserManagementPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/user-management" element={<UserManagementPage />} />
        </Route>
        <Route path="/not-found" element={<>Page not found</>} />
        <Route element={<AuthRoutes />}>
          <Route path="/sign-in" element={<SignInPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
