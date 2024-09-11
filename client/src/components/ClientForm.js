import React, { useState } from 'react';
import { createClient } from '../services/api';

const ClientForm = () => {
  const [clientData, setClientData] = useState({
    contacts: [{ first_name: '', last_name: '', email: '' }],
    country_id: '356'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createClient(clientData);
      alert('Client created successfully');
    } catch (error) {
      alert('Client creation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="First Name" onChange={(e) => setClientData({ ...clientData, contacts: [{ ...clientData.contacts[0], first_name: e.target.value }] })} />
      <input type="text" placeholder="Last Name" onChange={(e) => setClientData({ ...clientData, contacts: [{ ...clientData.contacts[0], last_name: e.target.value }] })} />
      <input type="email" placeholder="Email" onChange={(e) => setClientData({ ...clientData, contacts: [{ ...clientData.contacts[0], email: e.target.value }] })} />
      <button type="submit">Create Client</button>
    </form>
  );
};

export default ClientForm;
