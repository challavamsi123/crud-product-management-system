const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const defaultPort = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    if (!name || !price || !category || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const product = new Product({ name, price, category, description });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    if (!name || !price || !category || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, description },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`Port ${port} is busy. Trying ${nextPort} instead...`);
      startServer(nextPort);
      return;
    }

    console.error('Server error:', error);
    process.exit(1);
  });
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    startServer(defaultPort);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
