// import React, { useState } from 'react';
// import InvoiceForm from './components/InvoiceForm';
// import NinjaInvoiceForm from './components/NinjaInvoiceForm';
// import ClientForm from './components/ClientForm';
// import InvoicePreview from './components/InvoicePreview';
// import { generateInvoice } from './services/api';

// function App() {
//   const [invoiceData, setInvoiceData] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState(null);

//   const handleInvoiceSubmit = async (data) => {
//     setInvoiceData(data);
//     try {
//       const response = await generateInvoice(data);
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = URL.createObjectURL(blob);
//       setPdfUrl(url);
//     } catch (error) {
//       console.error('Error generating invoice:', error);
//       alert('Error generating invoice. Please try again.');
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Invoice Generator</h1>
//       <InvoiceForm onSubmit={handleInvoiceSubmit} />
//       {invoiceData && <InvoicePreview invoiceData={invoiceData} pdfUrl={pdfUrl} />}
//       {/* <div>
//       <h1>Create Client</h1>
//       <ClientForm />
//       <h1>Create Invoice</h1>
//       <NinjaInvoiceForm />
//     </div> */}
      
//     </div>
//   );
// }

// export default App;

// App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import InvoiceForm from './components/InvoiceForm';
// import InvoicePreview from './components/InvoicePreview';

// function App() {
//   const [invoiceData, setInvoiceData] = useState(null);

//   const handleInvoiceSubmit = (data) => {
//     setInvoiceData(data);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <h1>Invoice Generator</h1>
//         <Routes>
//           <Route
//             path="/"
//             element={<InvoiceForm onSubmit={handleInvoiceSubmit} />}
//           />
//           <Route
//             path="/preview"
//             element={<InvoicePreview invoiceData={invoiceData} />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);
  const navigate = useNavigate();

  const handleInvoiceSubmit = (data) => {
    setInvoiceData(data);
    // After form submission, navigate to the preview page
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
