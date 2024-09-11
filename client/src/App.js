import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);
  const navigate = useNavigate();

  const handleInvoiceSubmit = (data) => {
    setInvoiceData(data);
    navigate('/preview');
  };

  return (
    <div className="App">
      <h1>Invoice Generator</h1>
      <Routes>
        <Route path="/" element={<InvoiceForm onSubmit={handleInvoiceSubmit} />} />
        <Route path="/preview" element={<InvoicePreview invoiceData={invoiceData} />} />
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
