import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  requirements: { type: String, required: true },
}, {
  timestamps: true,
});

const Quote = mongoose.model('Quote', quoteSchema);
export default Quote;


