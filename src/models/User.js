import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    email: { type: String, requeired: true },
    password: { type: String, requeired: true },
    cel: { type: String }
}, { versionKey: false });

const user = mongoose.model("Users", userSchema);

export default user;