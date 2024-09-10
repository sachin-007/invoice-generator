const express = require('express');
const cors = require('cors');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', invoiceRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));