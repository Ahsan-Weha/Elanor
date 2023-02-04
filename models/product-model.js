const db = require('../data/database');
const mongodb = require('mongodb');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image; // the name of image file
        this.updateImageData();
        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    updateImageData() {
        this.imagePath = `product-data/images/${this.image}`;
        this.imageUrl = `/products/assets/images/${this.image}`;
    }
    static async findAll() {

        const products = await db.getDb().collection('products').find().toArray();

        return products.map(function (productDocument) {   // we use this because we do not store the image path, url and id 
            return new Product(productDocument);
        });
    }

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image,
        };


        await db.getDb().collection('products').insertOne(productData);
    }
    
    static async findById(productId) {
        let prodId
        try {
            prodId = new mongodb.ObjectId(productId);
        } catch (error) {
            error.code = 404;
            throw error;
        }
        const product = await db.getDb().collection('products').findOne({ _id: prodId });

        if (!product) {
            const error = new Error(' Could not find product with povided id');
            error.code = 404;
            throw error;
        }
        return new Product(product);
    }

}




module.exports = Product;