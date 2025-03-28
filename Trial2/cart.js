class Cart {
    constructor(session) {
        this.session = session;
        this.cart = session.cart || {};
    }

    add(product, quantity = 1, overrideQuantity = false) {
        const productId = product.id.toString();
        if (!this.cart[productId]) {
            // Initialize product in cart
            this.cart[productId] = {
                quantity: 0,
                price: product.price,
                product: product, // Store the product details
            };
        }
        // Update quantity
        if (overrideQuantity) {
            this.cart[productId].quantity = quantity;
        } else {
            this.cart[productId].quantity += quantity;
        }
        this.save();
    }

    remove(product) {
        const productId = product.id.toString();
        if (this.cart[productId]) {
            delete this.cart[productId];
            this.save();
        }
    }

    save() {
        this.session.cart = this.cart;
        this.session.save();
    }

    clear() {
        this.cart = {};
        this.save();
    }

    getItems() {
        return Object.values(this.cart).map(item => ({
            ...item,
            totalPrice: item.quantity * item.price,
        }));
    }

    getTotalQuantity() {
        return Object.values(this.cart).reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return Object.values(this.cart).reduce((total, item) => total + item.quantity * item.price, 0);
    }
}

module.exports = Cart;