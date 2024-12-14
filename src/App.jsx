import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";
import TopUp from "./components/TopUp";
import ServicePayment from "./components/ServicePayment";
import Transactions from "./components/Transactions";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/topup"
          element={
            <ProtectedRoute>
              <TopUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:serviceId"
          element={
            <ProtectedRoute>
              <ServicePayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
