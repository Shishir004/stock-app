const {AllStocks,AddnewStock,stockUpdate,removeStock} =require('../controllers/controllers')
const express=require('express');
const router=express.Router();
router.get('/stocks',AllStocks);
router.post('/stocks',AddnewStock);
router.put('/stocks/:id',stockUpdate);
router.delete('/stocks/:id',removeStock)
module.exports={router};