import React, { useState } from 'react';
import { createInvoice } from '../services/api';

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState({
    client_id: '',
    number: '',
    line_items: [{ quantity: 1, cost: 10 }]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createInvoice(invoiceData);
      alert('Invoice created successfully');
    } catch (error) {
      alert('Invoice creation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Client ID" onChange={(e) => setInvoiceData({ ...invoiceData, client_id: e.target.value })} />
      <input type="text" placeholder="Invoice Number" onChange={(e) => setInvoiceData({ ...invoiceData, number: e.target.value })} />
      <button type="submit">Create Invoice</button>
    </form>
  );
};

export default InvoiceForm;
