const express = require("express");
const cors = require("cors");
const invoiceRoutes = require("./routes/invoiceRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(express.json());

// Step 1: Route to trigger the OAuth flow
app.get("/auth/zoho", (req, res) => {
  const authUrl = `${process.env.ZOHO_AUTH_URL}?scope=ZohoInvoice.invoices.CREATE,ZohoInvoice.invoices.READ,ZohoInvoice.invoices.UPDATE,ZohoInvoice.invoices.DELETE&client_id=${process.env.ZOHO_CLIENT_ID}&state=testing&response_type=code&redirect_uri=${process.env.ZOHO_REDIRECT_URI}&access_type=offline`;

  res.redirect(authUrl);
});

// Step 2: Callback route to handle Zoho's response and exchange the code for an access token
app.get("/callback", async (req, res) => {
  const authCode = req.query.code;

  if (!authCode) {
    return res.send("Authorization failed");
  }

  try {
    // Exchange the authorization code for access and refresh tokens
    const tokenResponse = await axios.post(
      process.env.ZOHO_TOKEN_URL,
      qs.stringify({
        grant_type: "authorization_code",
        client_id: process.env.ZOHO_CLIENT_ID,

        client_secret: process.env.ZOHO_CLIENT_SECRET,

        redirect_uri: process.env.ZOHO_REDIRECT_URI,
        code: authCode,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = tokenResponse.data;

    // Store tokens in the session or database
    // For simplicity, we just display them here
    res.send({
      access_token,
      refresh_token,
    });
  } catch (error) {
    console.error(
      "Error exchanging token",
      error.response ? error.response.data : error.message
    );
    res.send("Failed to exchange authorization code for tokens");
  }
});

app.use("/api", invoiceRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
