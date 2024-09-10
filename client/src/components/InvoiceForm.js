import React, { useState } from "react";
import { calculateInvoice } from "../utils/invoiceCalculations";

const InvoiceForm = ({ onSubmit }) => {
  const [invoiceData, setInvoiceData] = useState({
    sellerName: "Varasiddhi Silk Exports",
    sellerAddress:
      "75, 3rd Cross, Lalbagh Road\nBENGALURU, KARNATAKA, 560027\nIN",
    sellerPAN: "AACFV3325K",
    sellerGST: "29AACFV3325K1ZY",
    billingName: "Madhu B",
    billingAddress:
      "Eurofins IT Solutions India Pvt Ltd., 1st Floor,\nMaruti Platinum, Lakshminarayana Pura, AECS\nLayout\nBENGALURU, KARNATAKA, 560037\nIN",
    shippingName: "Madhu B",
    shippingAddress:
      "Eurofins IT Solutions India Pvt Ltd., 1st Floor,\nMaruti Platinum, Lakshminarayana Pura, AECS\nLayout\nBENGALURU, KARNATAKA, 560037\nIN",
    orderNumber: "555454",
    orderDate: "",
    invoiceNumber: "6545",
    invoiceDate: "",
    stateCode: "29",
    placeOfSupply: "KARNATAKA",
    placeOfDelivery: "KARNATAKA",
    items: [{ description: "", unitPrice: 4000000, quantity: 10, taxRate: 5 }],
    logo: null, // New field for logo
    signature: null, // New field for signature
  });

  const handleInputChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        { description: "", unitPrice: 0, quantity: 0, taxRate: 5 },
      ],
    });
  };

  // Handle file uploads for logo and signature
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setInvoiceData({ ...invoiceData, [e.target.name]: reader.result }); // Save the Base64 data
    };
    reader.readAsDataURL(file); // Convert file to Base64
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedInvoiceData = calculateInvoice(invoiceData);
    onSubmit(calculatedInvoiceData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Upload Logo</h2>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          {invoiceData.logo && (
            <img
              src={invoiceData.logo}
              alt="Logo Preview"
              className="w-32 h-32 mb-2"
            />
          )}{" "}
          {/* Logo Preview */}
        </div>

        {/* Billing and Shipping details... */}

        <h2 className="text-2xl font-bold mb-2">Seller Details</h2>
        <input
          name="sellerName"
          placeholder="Seller Name"
          value={invoiceData.sellerName}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
        <textarea
          name="sellerAddress"
          placeholder="Seller Address"
          value={invoiceData.sellerAddress}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
        <input
          name="sellerPAN"
          placeholder="PAN No"
          value={invoiceData.sellerPAN}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
        <input
          name="sellerGST"
          placeholder="GST Registration No"
          value={invoiceData.sellerGST}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Billing Details</h2>
        <input
          name="billingName"
          placeholder="Billing Name"
          value={invoiceData.billingName}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
        <textarea
          name="billingAddress"
          placeholder="Billing Address"
          value={invoiceData.billingAddress}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Shipping Details</h2>
        <input
          name="shippingName"
          placeholder="Shipping Name"
          value={invoiceData.shippingName}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
        <textarea
          name="shippingAddress"
          placeholder="Shipping Address"
          value={invoiceData.shippingAddress}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Order Details</h2>
        <input
          name="orderNumber"
          placeholder="Order Number"
          value={invoiceData.orderNumber}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
        <input
          name="orderDate"
          placeholder="Order Date"
          type="date"
          value={invoiceData.orderDate}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
        <input
          name="invoiceNumber"
          placeholder="Invoice Number"
          value={invoiceData.invoiceNumber}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
        <input
          name="invoiceDate"
          placeholder="Invoice Date"
          type="date"
          value={invoiceData.invoiceDate}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Additional Details</h2>
        <input
          name="stateCode"
          placeholder="State/UT Code"
          value={invoiceData.stateCode}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
        <input
          name="placeOfSupply"
          placeholder="Place of Supply"
          value={invoiceData.placeOfSupply}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
        <input
          name="placeOfDelivery"
          placeholder="Place of Delivery"
          value={invoiceData.placeOfDelivery}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          required
        />
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Items</h2>
        {invoiceData.items.map((item, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <input
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              required
            />
            <input
              type="number"
              placeholder="Unit Price"
              value={item.unitPrice}
              onChange={(e) =>
                handleItemChange(index, "unitPrice", parseFloat(e.target.value))
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", parseInt(e.target.value))
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              required
            />
            <input
              type="number"
              placeholder="Tax Rate (%)"
              value={item.taxRate}
              onChange={(e) =>
                handleItemChange(index, "taxRate", parseFloat(e.target.value))
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              required
            />
          </div>
        ))}

        {/* File Upload for Signature */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Upload Signature</h2>
          <input
            type="file"
            name="signature"
            accept="image/*"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          {invoiceData.signature && (
            <img
              src={invoiceData.signature}
              alt="Signature Preview"
              className="w-32 h-32 mb-2"
            />
          )}{" "}
          {/* Signature Preview */}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Item
        </button>
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Generate Invoice
      </button>
    </form>
  );
};

export default InvoiceForm;
