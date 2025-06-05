import brandService from "../services/BrandService.js";

class BrandController {
    /**
     * Fetches all brands from the server.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async getAllBrands(req, res) {
        try {
            const brands = await brandService.getAllBrands();
            res.status(200).json(brands);
        } catch (error) {
            console.error("Error fetching brands:", error);
            res.status(500).json({ message: "Failed to retrieve brands" });
        }
    }
    /**
     * Fetches a brand by its ID from the server.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async getBrandById(req, res) {
        const { brandId } = req.params;
        try {
            const brand = await brandService.getBrandById(brandId);
            if (!brand) {
                return res.status(404).json({ message: "Brand not found" });
            }
            res.status(200).json(brand);
        } catch (error) {
            console.error("Error fetching brand:", error);
            res.status(500).json({ message: "Failed to retrieve brand" });
        }
    }

    static async getBrandsWithCount(req, res) {
    try {
        const { category } = req.query;
        const brands = await brandService.getBrandsWithCount(category);
        res.status(200).json(brands);
    } catch (error) {
        console.error("Error fetching brands with count:", error);
        res.status(500).json({ message: "Failed to retrieve brands with count" });
    }
}
}

export default BrandController;