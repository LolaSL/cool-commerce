import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/api/products', (req, res) => {
    res.send(data.products)
});

app.get('/api/products/slug/:slug', (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug);

    if (product) {
        res.send(product)
    } else {
        res.send(404).send({ message: "Product not found" })
    }
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})