const express = require('express');
const cors = require('cors');
const db = require('./db');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up Multer for file uploads (MUST be before using 'upload')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload image and return its URL
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Get all categories
app.get('/api/categories', (req, res) => {
  db.all('SELECT name FROM categories', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(r => r.name));
  });
});

// Add a category
app.post('/api/categories', (req, res) => {
  const { name } = req.body;
  db.run('INSERT OR IGNORE INTO categories (name) VALUES (?)', [name], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name });
  });
});

// Get all products
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a product
app.post('/api/products', (req, res) => {
  const { name, price, oldPrice, image, quantity, category, description, onSale } = req.body;
  db.run(
    `INSERT INTO products (name, price, oldPrice, image, quantity, category, description, onSale)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, price, oldPrice, image, quantity, category, description, onSale ? 1 : 0],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, ...req.body });
    }
  );
});

// Update a product
app.put('/api/products/:id', (req, res) => {
  const { name, price, oldPrice, image, quantity, category, description, onSale } = req.body;
  db.run(
    `UPDATE products SET name=?, price=?, oldPrice=?, image=?, quantity=?, category=?, description=?, onSale=?
     WHERE id=?`,
    [name, price, oldPrice, image, quantity, category, description, onSale ? 1 : 0, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  db.run('DELETE FROM products WHERE id=?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Create a new order
app.post('/api/orders', (req, res) => {
  const { orderNumber, name, phone, email, address, total, cart } = req.body;
  db.run(
    `INSERT INTO orders (orderNumber, name, phone, email, address, total, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [orderNumber, name, phone, email, address, total, "Booked"],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const orderId = this.lastID;
      // Insert order items
      const stmt = db.prepare(
        `INSERT INTO order_items (orderId, productId, name, price, quantity)
         VALUES (?, ?, ?, ?, ?)`
      );
      cart.forEach(item => {
        stmt.run(orderId, item.id, item.name, item.price, item.cartQuantity || 1);
      });
      stmt.finalize();
      res.json({ orderId, orderNumber });
    }
  );
});

// Get all orders (for admin)
app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get order items for an order
app.get('/api/orders/:orderId/items', (req, res) => {
  db.all('SELECT * FROM order_items WHERE orderId=?', [req.params.orderId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


app.post('/api/admin-login', (req, res) => {
  const { username, password } = req.body;
  db.get(
    'SELECT * FROM admins WHERE username = ? AND password = ?',
    [username, password],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (row) {
        // For real apps, use JWT/session, but for demo:
        res.json({ success: true, role: "ADMIN" });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));