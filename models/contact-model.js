const db = require('../data/database');


class Contact {
    constructor(name, email, message) {
        this.name = name;
        this.email = email;
        this.message = message;
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