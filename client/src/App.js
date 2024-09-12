import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import InvoiceCreation from "./components/InvoiceCreation";
import ClientCreation from "./components/ClientCreation";
import Login from "./components/Login";
import InvoiceListPage from "./components/InvoiceListPage";

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  const [invoiceData, setInvoiceData] = useState(null);
  const navigate = useNavigate();

  const handleInvoiceSubmit = (data) => {
    setInvoiceData(data);
    navigate("/preview");
  };

  const handleLoginSuccess = () => {
    // Redirect to create-invoice page after successful login
    navigate("/create-invoice");
  };

  return (
    <div className="App">
      <Routes>
      <Route path="/listing" element={<InvoiceListPage />} />

        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route 
          path="/create-client" 
          element={
            <PrivateRoute>
              <ClientCreation />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/create-invoice" 
          element={
            <PrivateRoute>
              <InvoiceCreation />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/preview" 
          element={
            <PrivateRoute>
              <InvoicePreview invoiceData={invoiceData} />
            </PrivateRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}