const express = require('express');
const session = require('express-session');
const cartRoutes = require('./routes/cartRoutes'); // Import cart routes

const app = express();

// Middleware for parsing POST data
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// EJS for templating
app.set('view engine', 'ejs');

// Routes
app.use('/cart', cartRoutes);

// Example product page
app.get('/products', (req, res) => {
    // Simulate product list
    const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
    ];
    res.render('products', { products });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});