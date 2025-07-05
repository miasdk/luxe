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

    async getBrandByName(brandName) {
        try {
            return await BrandModel.getBrandByName(brandName);
        } catch (error) {
            console.error("BrandService.getBrandByName():", error.message);
            throw error;
        }
    }

    async createBrand(brandData) {
        try {
            return await BrandModel.createBrand(brandData);
        } catch (error) {
            console.error("BrandService.createBrand():", error.message);
            throw error;
        }
    }

    async findOrCreateBrand(brandName) {
        try {
            return await BrandModel.findOrCreateBrand(brandName);
        } catch (error) {
            console.error("BrandService.findOrCreateBrand():", error.message);
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