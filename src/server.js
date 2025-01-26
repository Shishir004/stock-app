const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { getStocks, addStock, updateStock, deleteStock } = require('./stock')

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
const routes=require('../route/route');
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});