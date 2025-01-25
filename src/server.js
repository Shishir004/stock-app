const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { getStocks, addStock, updateStock, deleteStock } = require('./stock')

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Fetch all stocks
app.get('/stocks', async (req, res) => {
  try {
    const stocks = await getStocks();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a new stock
// In server.js (or wherever you have your POST request handler)
app.post('/stocks', async (req, res) => {
  try {
    const { name, ticker, quantity, buyPrice, currentValue } = req.body;
    
    console.log('Received data:', { name, ticker, quantity, buyPrice, currentValue });

    // Ensure correct data types (convert strings to numbers)
    const stock = await addStock({
      name,
      ticker,
      quantity: parseInt(quantity, 10),  // Ensure quantity is an integer
      buyPrice: parseFloat(buyPrice),    // Ensure buyPrice is a float
      currentValue: parseFloat(currentValue), // Ensure currentValue is a float
    });
    
    res.status(201).json(stock);
  } catch (error) {
    console.error('Error adding stock:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Update an existing stock
app.put('/stocks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const stock = req.body;
    const updatedStock = await updateStock(parseInt(id, 10), stock);
    if (!updatedStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a stock
app.delete('/stocks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStock = await deleteStock(parseInt(id, 10));
    if (!deletedStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.json(deletedStock);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});