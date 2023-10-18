const MONGO_ROOT_USERNAME = process.env.MONGO_ROOT_USERNAME || 'root';
const MONGO_ROOT_PASSWORD = process.env.MONGO_ROOT_PASSWORD || 'root';
const MONGO_HOST = process.env.MONGO_HOST || 'localhost:27017';

const mongoose = require('mongoose');

async function getMongooseCfg() {
    let mongooseClient = await mongoose.connect(`mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${MONGO_HOST}`);

    const productSchema = new mongoose.Schema({
        name: String, description: String, price: Number, quantity: Number, category: String
    });

    const categoriesSchema = new mongoose.Schema({
        name: String
    });

    return {
        Product: mongooseClient.model('Product', productSchema),
        Categories: mongooseClient.model('Categories', categoriesSchema)
    }
}

module.exports = {
    getMongooseCfg
}