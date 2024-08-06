
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Quote from '../models/quoteModel.js';

const quoteRouter = express.Router();

quoteRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const { name, email, phone, address, requirements, areaCoverage, features, price, btu, energyEfficiency } = req.body;

    // Save the quote details
    const quote = new Quote({
      name,
      email,
      phone,
      address,
      requirements,
    });

    try {
      const savedQuote = await quote.save();
      console.log('Saved Quote:', savedQuote);

      // // Convert areaCoverage from square feet to square meters
      // const areaCoverageSqMeters = areaCoverage * 0.092903;

      const numericPrice = parseFloat(price);
      const numericBtu = parseFloat(btu);
      const numericEnergyEfficiency = parseFloat(energyEfficiency);

      const query = {
        areaCoverage: { $gte: areaCoverage * 0.8, $lte: areaCoverage * 1.2 },
        features: { $all: features },
        price: { $lte: numericPrice },
        btu: { $gte: numericBtu },
        energyEfficiency: { $gte: numericEnergyEfficiency },
      };

      console.log('Received Data:', req.body);
      console.log('Query:', query);

      const products = await Product.find(query);

      console.log('Air Conditioners Found:', products.length);

      if (products.length === 0) {
        res.status(404).send({ message: 'No suitable air conditioners found.' });
      } else {
        res.send(products);
      }
    } catch (error) {
      res.status(500).send({ message: 'Error processing quote', error: error.message });
    }
  })
);

export default quoteRouter;