
    static async getProductsBySeller(req, res) {
        const productService = new ProductService();
        const { sellerId } = req.params;
        try {
            const products = await productService.getProductsBySeller(sellerId);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error fetching products by seller:", error);
            res.status(500).json({ message: "Failed to retrieve seller products" });
        }
    }
}

export default ProductController;
