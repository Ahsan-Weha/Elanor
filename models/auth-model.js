const db = require('../data/database');
const bcrypt = require('bcryptjs');

class User {
    constructor(name, email, password, address, city, postal) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.location = {
            address: address,
            city: city,
            postalcode: postal
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


}

module.exports = User; 