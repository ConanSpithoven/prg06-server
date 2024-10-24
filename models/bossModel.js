import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const bossSchema = new Schema({
    name: {type: String, required : true},
    weaknesses: {type: String, required : true},
    strengths: {type: String, required : true},
    damageType: {type: String, required : true},
    type: {type: String, required : true},
    special: {type: String, required : true},
});

const Boss = model('Boss', bossSchema);
export default Boss;