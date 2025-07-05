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

    /**
     * Creates a new brand.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async createBrand(req, res) {
        const { name, image } = req.body;
        
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: "Brand name is required" });
        }

        try {
            const brand = await brandService.createBrand({ name: name.trim(), image });
            res.status(201).json(brand);
        } catch (error) {
            console.error("Error creating brand:", error);
            if (error.message === "Brand already exists") {
                return res.status(409).json({ message: "Brand already exists" });
            }
            res.status(500).json({ message: "Failed to create brand" });
        }
    }

    /**
     * Finds or creates a brand by name.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async findOrCreateBrand(req, res) {
        const { name } = req.body;
        
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: "Brand name is required" });
        }

        try {
            const brand = await brandService.findOrCreateBrand(name.trim());
            res.status(200).json(brand);
        } catch (error) {
            console.error("Error finding or creating brand:", error);
            res.status(500).json({ message: "Failed to find or create brand" });
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