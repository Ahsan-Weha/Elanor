const db = require('../data/database');


class Contact {
    constructor(name, email, message, password, address, city, postal) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.password = password;
        this.location = {
            address: address,
            city: city,
            postalcode: postal
        };
    }

    async postContactUs() {
        await db.getDb().collection('contact').insertOne({
            name: this.name,
            email: this.email,
            message: this.message,
        });
    }

}



module.exports = Contact;