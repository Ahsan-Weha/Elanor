const db = require('../data/database');
const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');

class User {
    constructor(name, email, password, address, city, postal, number) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.location = {
            address: address,
            city: city,
            postalcode: postal,
            number: number
        };
    }
    getUserWithSameEmail() {
        return db.getDb().collection('users').findOne({ email: this.email });
    }
    async existsAlready() {
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser) {
            return true;
        }
        return false;
    }

    async postSignup() {
        const hashedPassword = await bcrypt.hash(this.password, 12)

        await db.getDb().collection('users').insertOne({
            name: this.name,
            email: this.email,
            password: hashedPassword,
            location: this.location,
        });
    }
    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
    };


    static async findById(userId) {
        const uid = new mongodb.ObjectId(userId);
        return db.getDb().collection('users').findOne({ _id: uid });
    }

    async updateAddress(userId) {

        const userid = new mongodb.ObjectId(userId);


        await db.getDb().collection('users').updateOne(
            { _id: userid },
            {
                $set: {
                    name: this.name,
                    email: this.email,
                    location: this.location,
                }
            }
        );
    }

    async addAddress() {
        const userData = {
            name: this.name,
            email: this.email,
            location: this.location,
        }
        await db.getDb().collection('orderData').insertOne(userData);
    }
}



module.exports = User; 