const bcrypt = require('bcrypt');


class User {
    static async create(db, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { email, password: hashedPassword };
        await db.collection('users').insertOne(user);
        return user;
    }

    static async findByEmail(db, email) {
        return await db.collection('users').findOne({ email: email });
    }
}

module.exports = User;
