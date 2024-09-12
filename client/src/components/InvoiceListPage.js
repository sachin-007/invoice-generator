import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InvoiceListPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/invoices`, {
        method: "GET",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to fetch invoices: ${response.statusText}, ${errorData}`);
      }

      const responseData = await response.json();
      const invoices = responseData.data || []; // Use an empty array as a fallback


      setInvoices(invoices);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleInvoiceClick = (invoice) => {
    const formattedData = {
      client_id: invoice.client_id,
      sellerName: invoice.sellerName, // Adjust if necessary based on actual data
      sellerAddress: invoice.public_notes,
      sellerPAN: invoice.custom_value1,
      sellerGST: invoice.custom_value2,
      invoiceNumber: invoice.number,
      billingAddress: invoice.public_notes,
      shippingName: invoice.custom_value3,
      shippingAddress: invoice.custom_value4,
      orderNumber: invoice.po_number,
      orderDate: invoice.date,
      invoiceDate: invoice.due_date,
      items: invoice.line_items.map(item => ({
        description: item.product_key,
        unitPrice: item.product_cost,
        quantity: item.quantity,
        taxRate: item.tax_rate1
      })),
    };

    console.log("invoiceData",invoice);
    

    navigate('/create-invoice', { state: { invoiceData: formattedData } });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Invoices</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {invoices.length ? (
          invoices.map((invoice) => (
            <div 
              key={invoice.id} 
              className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => handleInvoiceClick(invoice)}
            >
              <h2 className="text-xl font-semibold mb-2">Invoice #{invoice.number}</h2>
              <p>Client: {invoice.client_id}</p>
              <p>Date: {invoice.date}</p>
              <p>Amount: ${invoice.amount}</p>
            </div>
          ))
        ) : (
          <div>No invoices available</div>
        )}
      </div>
    </div>
  );
};

export default InvoiceListPage;
