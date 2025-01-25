const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all stocks
const getStocks = async () => {
  try {
    return await prisma.stock.findMany();
  } catch (error) {
    console.error("Error fetching stocks:", error);
    throw new Error('Unable to fetch stocks');
  }
};

// Add a new stock
const addStock = async (stock) => {
  try {
    return await prisma.stock.create({ data: stock });
  } catch (error) {
    console.error("Error adding stock:", error);
    throw new Error('Unable to add stock');
  }
};

// Update an existing stock
const updateStock = async (id, stock) => {
  try {
    return await prisma.stock.update({
      where: { id },
      data: stock,
    });
  } catch (error) {
    console.error("Error updating stock:", error);
    throw new Error('Unable to update stock');
  }
};

// Delete a stock
const deleteStock = async (id) => {
  try {
    return await prisma.stock.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting stock:", error);
    throw new Error('Unable to delete stock');
  }
};

module.exports = { getStocks, addStock, updateStock, deleteStock };
