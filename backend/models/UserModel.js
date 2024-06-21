import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'

const DataSchema = new Schema({
    name: String,
    userName: String,
    email: String,
    password:{
        type:  String,
        select: false
    },
    avatar: String,
    background: String
}, {
    timestamps: true
});

DataSchema.pre('save', async function  (next) {

    this.password = await bcrypt.hash(this.password, 10)
    next()

})

const Usuario = model('Usuario', DataSchema);


export default Usuario