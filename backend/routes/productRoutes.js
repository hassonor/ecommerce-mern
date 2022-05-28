require('../dal/dal');
const express = require('express');
const Product = require('../models/productModel');
const expressAsyncHandler = require("express-async-handler");
const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
})

productRouter.get(
    '/categories', expressAsyncHandler(async (req, res) => {
        const categories = await Product.find().distinct('category');
        res.send(categories);
    })
)

productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({slug: req.params.slug});
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
});

productRouter.get('/:id', async (req, res) => {

    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
});

module.exports = productRouter;
