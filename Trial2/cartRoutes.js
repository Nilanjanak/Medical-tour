const express = require('express');
const Cart = require('../models/cart'); // Import the Cart class
const Product = require('../models/product'); // Example product model
const router = express.Router();

// Add to cart
router.post('/add/:id', async (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session);

    try {
        // Fetch product from DB (simulate product retrieval)
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const quantity = parseInt(req.body.quantity || 1);
        const override = req.body.override === 'true';

        cart.add(product, quantity, override);
        res.redirect('/cart'); // Redirect to cart page
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Remove from cart
router.post('/remove/:id', (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session);

    const product = { id: productId }; // Simplify product object
    cart.remove(product);

    res.redirect('/cart');
});

// View cart
router.get('/', (req, res) => {
    const cart = new Cart(req.session);
    res.render('cart', { items: cart.getItems(), totalPrice: cart.getTotalPrice() });
});

module.exports = router;