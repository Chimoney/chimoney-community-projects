//Enhance Global Supplier Payments for E-Commerce via Payouts #122

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Simulated database of suppliers and their balances
const suppliers = {
    'supplier1': { balance: 1000, currency: 'USD' },
    'supplier2': { balance: 500, currency: 'EUR' },
};

// API endpoint to make payments
app.post('/pay_supplier', (req, res) => {
    const { supplier, amount } = req.body;

    if (!supplier || !amount) {
        return res.status(400).json({ error: 'Supplier and amount are required.' });
    }

    if (!suppliers[supplier]) {
        return res.status(404).json({ error: `Supplier '${supplier}' not found.` });
    }

    if (suppliers[supplier].balance < amount) {
        return res.status(400).json({ error: `Insufficient balance for supplier '${supplier}'.` });
    }

    suppliers[supplier].balance -= amount;

    res.json({ message: `Paid ${amount} ${suppliers[supplier].currency} to supplier '${supplier}'.` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


/*              To run this server:

1. Make sure you have Node.js installed on your system.

2.Create a new directory for your project and navigate to it in the terminal.

3. Create a new JavaScript file (e.g., server.js) and paste the code above into it.

4. Run npm install express body-parser to install the required dependencies.

5. Run the server with node server.js.                  */
