require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./db');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.get('/health', (req, res) => res.json({ status: 'ok' }));

initDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('Failed to initialize DB:', err);
  process.exit(1);
});