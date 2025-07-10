const Product = require('../models/ProductModel');

// business logic

const getProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        if (!allProducts || allProducts.length === 0) {
            res.json({
                message: "there is no product"
            })
        }
        // if we have
        res.status(200).json({ success: true, products: allProducts });
    }
    catch {
        res.status(500).json({ success: false, message: "internal server error" });
    }
}

const createProducts = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const newProduct = new Product({ name, price, description, category });
        await newProduct.save();
        res.status(200).json({ success: true, product: newProduct });
    }
    catch {
        res.status(500).json({ success: false, message: "internal server error" });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description, category }, { new: true });
        res.status(200).json({ success: true, product: updatedProduct });
    }
    catch {
        res.status(500).json({ success: false, message: "internal server error" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            res.json({
                message: "product not found"
            })
        }
        res.status(200).json({ success: true, product: deletedProduct });
    }
    catch {
        res.status(500).json({ success: false, message: "internal server error" });
    }
}

module.exports = { getProducts, createProducts, updateProduct, deleteProduct };