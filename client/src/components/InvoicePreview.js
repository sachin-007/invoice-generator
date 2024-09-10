// Import libraries at the top
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import React, { useState } from 'react';


const generatePdf = () => {
  const input = document.getElementById('invoice-preview');
  const button = document.getElementById('generate-pdf-button');

  if (input) {
    // Hide the button and any other unwanted elements
    if (button) {
      button.style.display = 'none';
    }

    // Use html2canvas to capture the content
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait mode, A4 size
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

      if (heightLeft > pageHeight) {
        let yPosition = -pageHeight;
        while (heightLeft > 0) {
          yPosition = yPosition + pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, yPosition, imgWidth, imgHeight);
        }
      }

      pdf.save('invoice.pdf');

      // Show the button again after generating the PDF
      if (button) {
        button.style.display = 'block';
      }
    });
  }
};


// const InvoicePreview = ({ invoiceData, pdfUrl }) => {
//   console.log('Invoice Data:', invoiceData);

//   return (
//     <div id="invoice-preview" className="bg-white shadow-lg rounded p-8 mb-4 border">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-3xl font-bold">Invoice</h2>
//         <div className="text-right">
//           <p>{invoiceData.sellerName}</p>
//           <p>{invoiceData.sellerAddress.replace(/\n/g, ', ')}</p>
//           <p>PAN: {invoiceData.sellerPAN}</p>
//           <p>GST: {invoiceData.sellerGST}</p>
//         </div>
//       </div>

//       {/* Billing & Shipping Details */}
//       <div className="mb-6">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <h3 className="text-lg font-semibold">Billing Details</h3>
//             <p>{invoiceData.billingName}</p>
//             <p>{invoiceData.billingAddress.replace(/\n/g, ', ')}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">Shipping Details</h3>
//             <p>{invoiceData.shippingName}</p>
//             <p>{invoiceData.shippingAddress.replace(/\n/g, ', ')}</p>
//           </div>
//         </div>
//       </div>

//       {/* Order & Invoice Details */}
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold">Order & Invoice Details</h3>
//         <div className="grid grid-cols-2 gap-4">
//           <p><strong>Order Number:</strong> {invoiceData.orderNumber}</p>
//           <p><strong>Order Date:</strong> {invoiceData.orderDate}</p>
//           <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
//           <p><strong>Invoice Date:</strong> {invoiceData.invoiceDate}</p>
//         </div>
//       </div>

//       {/* Items Section */}
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold mb-6">Items</h3>
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">Description</th>
//               <th className="border p-2">Unit Price</th>
//               <th className="border p-2">Quantity</th>
//               <th className="border p-2">Net Amount</th>
//               <th className="border p-2">Tax Rate</th>
//               <th className="border p-2">Tax Amount</th>
//               <th className="border p-2">Total Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoiceData.items.map((item, index) => (
//               <tr key={index}>
//                 <td className="border p-2">{item.description}</td>
//                 <td className="border p-2">
//                   {Number(item.unitPrice).toFixed(2)}
//                 </td>
//                 <td className="border p-2">{item.quantity}</td>
//                 <td className="border p-2">
//                   {Number(item.netAmount).toFixed(2)}
//                 </td>
//                 <td className="border p-2">{item.taxRate}%</td>
//                 <td className="border p-2">
//                   {Number(item.taxAmount).toFixed(2)}
//                 </td>
//                 <td className="border p-2">
//                   {Number(item.totalAmount).toFixed(2)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Totals Section */}
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold">Totals</h3>
//         <p>
//           <strong>Subtotal:</strong> 
//           {invoiceData.subtotal !== undefined 
//             ? Number(invoiceData.subtotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
//             : 'Invalid subtotal'}
//         </p>
//         <p>
//           <strong>Tax:</strong> 
//           {invoiceData.tax !== undefined 
//             ? Number(invoiceData.tax).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
//             : 'Invalid tax'}
//         </p>
//         <p>
//           <strong>Total:</strong> 
//           {invoiceData.total !== undefined 
//             ? Number(invoiceData.total).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
//             : 'Invalid total'}
//         </p>
//       </div>

//       {/* Payment Terms */}
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold">Payment Terms</h3>
//         <p>{invoiceData.paymentTerms}</p>
//       </div>

//       {/* Generate PDF Button */}
      
//       {pdfUrl && (
//   <div className="text-right">
//     <button 
//       id="generate-pdf-button"
//       onClick={generatePdf} 
//       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//     >
//       Generate PDF
//     </button>
//   </div>
// )}


//     </div>
//   );
// };


const InvoicePreview = ({ invoiceData, pdfUrl }) => {
  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);


  // Handle file upload for logo
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result); // Set logo as base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file upload for signature
  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignature(reader.result); // Set signature as base64 image
      };
      reader.readAsDataURL(file);
    }
  };


  // Generate PDF
  // const generatePdf = () => {
  //   const input = document.getElementById('invoice-preview');
  //   html2canvas(input, { scale: 2 }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'px',
  //       format: [canvas.width, canvas.height],
  //     });
  //     pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  //     pdf.save('invoice.pdf');
  //   });
  // };


  return (
    <div id="invoice-preview" style={{ fontFamily: 'Arial, sans-serif', padding: '16px', maxWidth: '800px', margin: '0 auto', border: '1px solid #000' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        
      <div style={{ marginBottom: '10px' }}>
        <label>Upload Logo:</label>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Upload Signature:</label>
        <input type="file" accept="image/*" onChange={handleSignatureUpload} />
      </div>

        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" style={{ height: '50px' }} /> */}
        <div style={{ textAlign: 'right' }}>
          <p><strong>Sold By :</strong> {invoiceData.sellerName}</p>
          <p>{invoiceData.sellerAddress.replace(/\n/g, ', ')}</p>
          <p>PAN: {invoiceData.sellerPAN}</p>
          <p>GST: {invoiceData.sellerGST}</p>
        </div>
      </div>

      {/* Billing & Shipping Details */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Billing Address</h3>
            <p>{invoiceData.billingName}</p>
            <p>{invoiceData.billingAddress.replace(/\n/g, ', ')}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Shipping Address</h3>
            <p>{invoiceData.shippingName}</p>
            <p>{invoiceData.shippingAddress.replace(/\n/g, ', ')}</p>
          </div>
        </div>
      </div>

      {/* Order & Invoice Details */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Order & Invoice Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <p><strong>Order Number:</strong> {invoiceData.orderNumber}</p>
          <p><strong>Order Date:</strong> {invoiceData.orderDate}</p>
          <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
          <p><strong>Invoice Date:</strong> {invoiceData.invoiceDate}</p>
        </div>
      </div>

      {/* Items Section */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Items</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead style={{ backgroundColor: '#f3f3f3', fontWeight: 'bold' }}>
            <tr>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Description</th>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Unit Price</th>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Quantity</th>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Net Amount</th>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Tax Rate</th>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Tax Amount</th>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{item.description}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{Number(item.unitPrice).toFixed(2)}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{item.quantity}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{Number(item.netAmount).toFixed(2)}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{item.taxRate}%</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{Number(item.taxAmount).toFixed(2)}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{Number(item.totalAmount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Totals</h3>
        <p><strong>Subtotal:</strong> {Number(invoiceData.subtotal).toFixed(2)}</p>
        <p><strong>Tax:</strong> {Number(invoiceData.tax).toFixed(2)}</p>
        <p><strong>Total:</strong> {Number(invoiceData.total).toFixed(2)}</p>
      </div>

      {/* Payment Terms */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Payment Terms</h3>
        <p>{invoiceData.paymentTerms}</p>
      </div>

 {/* Render uploaded signature */}
 {signature && <img src={signature} alt="Signature" style={{ maxWidth: '150px', marginTop: '20px' }} />}
 
      {/* Generate PDF Button */}
      {pdfUrl && (
        <div style={{ textAlign: 'right' }}>
          <button
            id="generate-pdf-button"
            onClick={generatePdf}
            style={{ backgroundColor: '#4CAF50', color: 'white', fontWeight: 'bold', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
          >
            Generate PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default InvoicePreview;
