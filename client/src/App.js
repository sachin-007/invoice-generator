// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { generateInvoice } from './services/api';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleInvoiceSubmit = async (data) => {
    setInvoiceData(data);
    try {
      const response = await generateInvoice(data);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Error generating invoice. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Invoice Generator</h1>
      <InvoiceForm onSubmit={handleInvoiceSubmit} />
      {invoiceData && <InvoicePreview invoiceData={invoiceData} pdfUrl={pdfUrl} />}
    </div>
  );
}

export default App;