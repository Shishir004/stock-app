import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Edit, Trash, Plus } from 'lucide-react';

export default function App() {
  const [stocks, setStocks] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    ticker: '',
    quantity: '',
    buyPrice: '',
    currentValue: '',
  });

  // Fetch all stocks on component mount
  useEffect(() => {
    fetch('http://localhost:3000/stocks')
      .then((response) => response.json())
      .then((data) => setStocks(data))
      .catch((error) => console.error('Error fetching stocks:', error));
  }, []);

  // Calculate total portfolio value and total gain/loss
  const totalPortfolioValue = stocks.reduce(
    (acc, stock) => acc + stock.currentValue * stock.quantity,
    0
  );
  const totalGainLoss = stocks.reduce(
    (acc, stock) => acc + (stock.currentValue - stock.buyPrice) * stock.quantity,
    0
  );

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Safely render values with toFixed(), ensuring no errors when undefined or null
  const renderStockValue = (value) => {
    if (value !== undefined && value !== null) {
      return value.toFixed(2); // Call toFixed only if value exists
    }
    return 'N/A'; // Or provide a default value when it's undefined or null
  };

  // Handle adding a new stock
  const handleAddStock = () => {
    const stockData = {
      ...formValues,
      quantity: Number(formValues.quantity), // Convert quantity to number
      buyPrice: parseFloat(formValues.buyPrice), // Convert buyPrice to float
      currentValue: parseFloat(formValues.currentValue), // Convert currentValue to float
    };

    fetch('http://localhost:3000/stocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stockData),
    })
      .then((response) => response.json())
      .then((newStock) => {
        setStocks([...stocks, newStock]);
        setFormValues({ name: '', ticker: '', quantity: '', buyPrice: '', currentValue: '' });
      })
      .catch((error) => console.error('Error adding stock:', error));
  };

  // Handle editing an existing stock
  const handleEditStock = () => {
    if (!editingStock) return;

    const updatedStockData = {
      ...formValues,
      quantity: Number(formValues.quantity), // Ensure number type
      buyPrice: parseFloat(formValues.buyPrice), // Ensure float type
      currentValue: parseFloat(formValues.currentValue), // Ensure float type
    };

    fetch(`http://localhost:3000/stocks/${editingStock.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStockData),
    })
      .then((response) => response.json())
      .then((updatedStock) => {
        const updatedStocks = stocks.map((stock) =>
          stock.id === updatedStock.id ? updatedStock : stock
        );
        setStocks(updatedStocks);
        setEditingStock(null);
        setFormValues({ name: '', ticker: '', quantity: '', buyPrice: '', currentValue: '' });
      })
      .catch((error) => console.error('Error editing stock:', error));
  };

  // Handle deleting a stock
  const handleDeleteStock = (id) => {
    fetch(`http://localhost:3000/stocks/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((deletedStock) => {
        const updatedStocks = stocks.filter((stock) => stock.id !== deletedStock.id);
        setStocks(updatedStocks);
      })
      .catch((error) => console.error('Error deleting stock:', error));
  };

  // Set up editing mode
  const handleEditClick = (stock) => {
    setEditingStock(stock);
    setFormValues({
      name: stock.name,
      ticker: stock.ticker,
      quantity: stock.quantity.toString(), // Convert to string for input field
      buyPrice: stock.buyPrice.toString(), // Convert to string for input field
      currentValue: stock.currentValue.toString(), // Convert to string for input field
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Stock Portfolio Manager</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Dashboard */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <CardDescription>Total Portfolio Value</CardDescription>
                <p className="text-2xl font-bold">${totalPortfolioValue.toFixed(2)}</p>
              </div>
              <div>
                <CardDescription>Total Gain/Loss</CardDescription>
                <p
                  className={`text-2xl font-bold ${
                    totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  ${totalGainLoss.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingStock ? 'Edit Stock' : 'Add Stock'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formValues.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ticker">Ticker</Label>
                  <Input id="ticker" name="ticker" value={formValues.ticker} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={formValues.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyPrice">Buy Price</Label>
                  <Input
                    id="buyPrice"
                    name="buyPrice"
                    type="number"
                    step="0.01"
                    value={formValues.buyPrice}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentValue">Current Value</Label>
                  <Input
                    id="currentValue"
                    name="currentValue"
                    type="number"
                    step="0.01"
                    value={formValues.currentValue}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <Button type="button" onClick={editingStock ? handleEditStock : handleAddStock}>
                {editingStock ? 'Save' : 'Add Stock'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Stock List */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Buy Price</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stocks.map((stock) => (
                  <TableRow key={stock.id}>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.ticker}</TableCell>
                    <TableCell>{stock.quantity}</TableCell>
                    <TableCell>${renderStockValue(stock.buyPrice)}</TableCell>
                    <TableCell>${renderStockValue(stock.currentValue)}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditClick(stock)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteStock(stock.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
