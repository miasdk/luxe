import BrandModel from "../models/BrandModel.js";

class BrandService {
    async getAllBrands() {
        try {
            return await BrandModel.getAllBrands();
        } catch (error) {
            console.error("BrandService.getAllBrands():", error.message);
            throw error;
        }
    }

    async getBrandById(brandId) {
        try {
            return await BrandModel.getBrandById(brandId);
        } catch (error) {
            console.error("BrandService.getBrandById():", error.message);
            throw error;
        }
    }

    async getBrandsWithCount(categoryName = null) {
    try {
        return await BrandModel.getBrandsWithCount(categoryName);
    } catch (error) {
        console.error("BrandService.getBrandsWithCount():", error.message);
        throw error;
    }
}
}

export default new BrandService();