// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema);

class User {
    static async create(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ email, password: hashedPassword });
        await user.save(); // Salva o usuário no MongoDB
        return user; // Retorna o usuário criado
    }

    static async findByEmail(email) {
        return await UserModel.findOne({ email });
    }
}

export default User;
