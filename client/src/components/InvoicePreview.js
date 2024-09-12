import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React from "react";
import { useLocation } from "react-router-dom";

const generatePdf = () => {
  const input = document.getElementById("invoice-preview");
  const button = document.getElementById("generate-pdf-button");

  if (input) {
    if (button) {
      button.style.display = "none";
    }

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); 
      const imgWidth = 210; 
      const pageHeight = 295; // Adjust to A4 size
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("invoice.pdf");
      if (button) {
        button.style.display = "block";
      }
    });
  }
};

const InvoicePreview = () => {
  const location = useLocation();
  const { invoiceData } = location.state || {}; // Access the state from the location

  console.log('maindata',invoiceData);
  

  return (
    <div
      id="invoice-preview"
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "16px",
        maxWidth: "800px",
        margin: "0 auto",
        border: "1px solid #000",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        {/* Header Section */}
      {/* Logo Section */}
  {invoiceData.logo && (
    <div style={{ marginBottom: "20px" }}>
      <img
        src={invoiceData.logo}
        alt="Company Logo"
        style={{
          width: "150px",
          height: "auto",
          objectFit: "contain",
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
  )}
        <div style={{ textAlign: "right" }}>
          <p>
            <strong>Tax Invoice/Bill of Supply/Cash Memo</strong>
          </p>
          <p>(Original for Recipient)</p>
        </div>
      </div>

      {/* Billing & Shipping Details */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <p>
              <strong>Sold By:</strong> {invoiceData.sellerName}
            </p>
            <p>{invoiceData.sellerAddress.replace(/\n/g, ", ")}</p>
            <p style={{ fontSize: "16px" }}>
              <strong>PAN No:</strong> {invoiceData.sellerPAN}
            </p>
            <p>
              <strong>GST Reg No:</strong> {invoiceData.sellerGST}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>
              Billing Address
            </h3>
            <p>{invoiceData.billingName}</p>
            <p>{invoiceData.billingAddress.replace(/\n/g, ", ")}</p>
            <p>
              <strong>State/UT Code:</strong> {invoiceData.stateCode}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>
              Shipping Address
            </h3>
            <p>{invoiceData.shippingName}</p>
            <p>{invoiceData.shippingAddress.replace(/\n/g, ", ")}</p>
            <p>
              <strong>State/UT Code:</strong> {invoiceData.stateCode}
            </p>
          </div>
        </div>
      </div>

      {/* Order & Invoice Details */}
      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>
          Order & Invoice Details
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <p>
            <strong>Order Number:</strong> {invoiceData.orderNumber}
          </p>
          <p>
            <strong>Order Date:</strong> {invoiceData.orderDate}
          </p>
          <p>
            <strong>Invoice Number:</strong> {invoiceData.invoiceNumber}
          </p>
          <p>
            <strong>Invoice Date:</strong> {invoiceData.invoiceDate}
          </p>
        </div>
      </div>

      {/* Items Section */}
      <div style={{ marginBottom: "24px" }}>
  <h3
    style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px" }}
  >
    Items
  </h3>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "12px",
    }}
  >
    <thead style={{ backgroundColor: "#f3f3f3", fontWeight: "bold" }}>
      <tr>
        <th style={{ border: "1px solid #000", padding: "8px" }}>
          Description
        </th>
        <th style={{ border: "1px solid #000", padding: "8px" }}>
          Unit Price
        </th>
        <th style={{ border: "1px solid #000", padding: "8px" }}>
          Quantity
        </th>
        <th style={{ border: "1px solid #000", padding: "8px" }}>
          Net Amount
        </th>
        <th style={{ border: "1px solid #000", padding: "8px" }}>
          Tax Rate
        </th>
        <th style={{ border: "1px solid #000", padding: "8px" }}>
          Tax Amount
        </th>
        <th style={{ border: "1px solid #000", padding: "8px" }}>
          Total Amount
        </th>
      </tr>
    </thead>
    <tbody>
      {invoiceData.items.map((item, index) => {
        // Calculate Net Amount, Tax Amount, and Total Amount
        const netAmount = item.unitPrice * item.quantity;
        const taxAmount = netAmount * (item.taxRate / 100);
        const totalAmount = netAmount + taxAmount;

        return (
          <tr key={index}>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              {item.description}
            </td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              {Number(item.unitPrice).toFixed(2)}
            </td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              {item.quantity}
            </td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              {Number(netAmount).toFixed(2)}
            </td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              {item.taxRate}%
            </td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              {Number(taxAmount).toFixed(2)}
            </td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              {Number(totalAmount).toFixed(2)}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


      {/* Totals Section */}
<div style={{ marginBottom: "24px" }}>
  <p>
    <strong>Total:</strong> 
    {Number(
      invoiceData.items.reduce((acc, item) => {
        const netAmount = item.unitPrice * item.quantity;
        const taxAmount = netAmount * (item.taxRate / 100);
        const totalAmount = netAmount + taxAmount;
        return acc + totalAmount;
      }, 0)
    ).toFixed(2)}
  </p>
</div>

      {/* Signature Section */}
      {invoiceData.signature && (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ textAlign: "right", marginBottom: "10px" }}>
        For {invoiceData.sellerName}:
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <img
          style={{
            width: "150px",
            height: "auto",
            objectFit: "cover",
            border: "1px solid #000",
            borderRadius: "2px",
            padding: "2px",
          }}
          src={invoiceData.signature}
          alt="Signature"
        />
      </div>
      <h2 style={{ textAlign: "right", marginTop: "10px" }}>
        Authorized Signature
      </h2>
    </div>
  )}

      <div style={{ textAlign: "left" }}>
        <button
          id="generate-pdf-button"
          onClick={generatePdf}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default InvoicePreview;
