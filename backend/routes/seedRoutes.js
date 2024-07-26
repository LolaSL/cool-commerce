import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';
import Seller from '../models/sellerModel.js';


const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Seller.deleteMany({});
  

    // Insert new data
    const createdProducts = await Product.insertMany(data.products);
    const createdUsers = await User.insertMany(data.users);
    const createdSellers = await Seller.insertMany(data.sellers);
   

    res.send({
      createdProducts,
      createdUsers,
      createdSellers

    });
  } catch (error) {
    res.status(500).send({ message: 'Error seeding data', error: error.message });
  }
});

export default seedRouter;

