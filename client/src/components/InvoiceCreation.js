import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const InvoiceCreation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract invoiceData from location state
  const { invoiceData: initialInvoiceData } = location.state || {};

  const [clients, setClients] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    client_id: "",
    sellerName: "",
    sellerAddress: "",
    sellerPAN: "",
    sellerGST: "",
    billingName: "",
    billingAddress: "",
    shippingName: "",
    shippingAddress: "",
    orderNumber: "",
    orderDate: "",
    invoiceNumber: "",
    invoiceDate: "",
    stateCode: "",
    placeOfSupply: "",
    placeOfDelivery: "",
    items: [],
    logo: "",
    signature: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  useEffect(() => {
    if (initialInvoiceData) {
      setInvoiceData(initialInvoiceData);
    }

    const fetchClients = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/clients`, {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        });

        const clientList = response.data.map((client) => ({
          id: client.id,
          first_name: client.contacts[0]?.first_name || "",
          last_name: client.contacts[0]?.last_name || "",
        }));

        setClients(clientList);
      } catch (error) {
        console.error("Failed to fetch clients", error);
        setErrorMessage("Failed to fetch clients");
      }
    };

    fetchClients();
  }, [token, initialInvoiceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData((prevData) => ({
      ...prevData,
      items: newItems,
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData((prevData) => ({
          ...prevData,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };
  
  

  const addItem = () => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        { description: "", unitPrice: "", quantity: "", taxRate: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure client_id is set
    if (!invoiceData.client_id) {
      setErrorMessage("Client ID is required");
      return;
    }

    const invoiceNumber = `INV-${Date.now()}`;

    // Map the form data to NinjaInvoice fields
    const ninjaInvoiceData = {
      logo: invoiceData.logo, // Ensure proper format if required
      signature: invoiceData.signature, // Ensure proper format if required
      client_id: invoiceData.client_id,
      public_notes: invoiceData.sellerAddress, // Seller Address
      custom_value1: invoiceData.sellerPAN, // PAN No
      custom_value2: invoiceData.sellerGST, // GST Registration No
      number: invoiceNumber, // Invoice Number
      public_notes: invoiceData.billingAddress, // Billing Address
      custom_value3: invoiceData.shippingName, // Shipping Name
      custom_value4: invoiceData.shippingAddress, // Shipping Address
      po_number: invoiceData.orderNumber, // Order Number
      date: invoiceData.orderDate, // Order Date
      due_date: invoiceData.invoiceDate, // Invoice Date
      line_items: invoiceData.items.map((item) => ({
        product_key: item.description, // Description of item
        product_cost: item.unitPrice, // Unit Price of item
        quantity: item.quantity, // Quantity of item
        tax_rate1: item.taxRate, // Tax Rate
      })),
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/invoices`,
        ninjaInvoiceData,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("brefore",invoiceData);
      
      // Navigate to /preview with invoiceData in state
      navigate("/preview", { state: { invoiceData } });
      
    } catch (error) {
      setErrorMessage(
        "Failed to create invoice: " +
          (error.response ? error.response.data.message : error.message)
      );
      console.error("Error creating invoice:", error);
    }
  };

  const handleAutoFill = () => {
    setInvoiceData({
      sellerName: "Auto Client ID", // Ensure this matches an existing client ID
      sellerAddress: "Auto Seller Address",
      sellerPAN: "Auto PAN No",
      sellerGST: "Auto GST No",
      billingName: "Auto Invoice Number",
      billingAddress: "Auto Billing Address",
      shippingName: "Auto Shipping Name",
      shippingAddress: "Auto Shipping Address",
      orderNumber: "Auto Order Number",
      orderDate: "2024-01-01", // Example date
      invoiceNumber: `INV-${Date.now()}`,
      invoiceDate: "2024-01-01", // Example date
      stateCode: "Auto State Code",
      placeOfSupply: "Auto Place of Supply",
      placeOfDelivery: "Auto Place of Delivery",
      items: [
        {
          description: "Auto Item Description",
          unitPrice: 100,
          quantity: 1,
          taxRate: 10,
        },
      ],
      logo: "",
      signature: "",
    });
  };

  return (
    <>
      <button
        style={{
          margin: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
        onClick={handleAutoFill}
      >
        Auto Fill Invoice
      </button>

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
                style={{ width: 300, height: 100 }}
              />
            )}
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Client Details</h2>
            <select
              name="client_id"
              value={invoiceData.client_id}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              required
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.first_name} {client.last_name}
                </option>
              ))}
            </select>
          </div>

          <h2 className="text-2xl font-bold mb-2">Seller Details</h2>
          <input
            name="sellerName"
            placeholder="Seller Name"
            value={invoiceData.sellerName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
          />
          <textarea
            name="sellerAddress"
            placeholder="Seller Address"
            value={invoiceData.sellerAddress}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
          />
          <input
            name="sellerPAN"
            placeholder="PAN No"
            value={invoiceData.sellerPAN}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
          />
          <input
            name="sellerGST"
            placeholder="GST Registration No"
            value={invoiceData.sellerGST}
            onChange={handleChange}
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
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
          />
          <textarea
            name="billingAddress"
            placeholder="Billing Address"
            value={invoiceData.billingAddress}
            onChange={handleChange}
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
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
          />
          <textarea
            name="shippingAddress"
            placeholder="Shipping Address"
            value={invoiceData.shippingAddress}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
          />
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Order and Invoice Details</h2>
          <input
            name="orderNumber"
            placeholder="Order Number"
            value={invoiceData.orderNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
          />
          <input
            name="orderDate"
            type="date"
            value={invoiceData.orderDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
          />
          <input
            name="invoiceNumber"
            placeholder="Invoice Number"
            value={invoiceData.invoiceNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
          />
          <input
            name="invoiceDate"
            type="date"
            value={invoiceData.invoiceDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
          />
        </div>

        {/* <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Additional Details</h2>
          <input
            name="stateCode"
            placeholder="State Code"
            value={invoiceData.stateCode}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <input
            name="placeOfSupply"
            placeholder="Place of Supply"
            value={invoiceData.placeOfSupply}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <input
            name="placeOfDelivery"
            placeholder="Place of Delivery"
            value={invoiceData.placeOfDelivery}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
        </div> */}

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Invoice Items</h2>
          {invoiceData.items.map((item, index) => (
            <div key={index} className="mb-4 border p-4 rounded">
              <input
                name={`description-${index}`}
                placeholder="Item Description"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                required
              />
              <input
                name={`unitPrice-${index}`}
                placeholder="Unit Price"
                type="number"
                value={item.unitPrice}
                onChange={(e) =>
                  handleItemChange(index, "unitPrice", e.target.value)
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                required
              />
              <input
                name={`quantity-${index}`}
                placeholder="Quantity"
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                required
              />
              <input
                name={`taxRate-${index}`}
                placeholder="Tax Rate"
                type="number"
                value={item.taxRate}
                onChange={(e) =>
                  handleItemChange(index, "taxRate", e.target.value)
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setInvoiceData((prevData) => ({
                    ...prevData,
                    items: prevData.items.filter((_, i) => i !== index),
                  }))
                }
                className="text-red-500 mt-2"
              >
                Remove Item
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Item
          </button>
        </div>

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
              style={{ width: 300, height: 100 }}
            />
          )}
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Invoice
        </button>
      </form>
    </>
  );
};

export default InvoiceCreation;
