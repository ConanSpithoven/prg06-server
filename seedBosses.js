import mongoose from 'mongoose';
import "./loadEnvironment.mjs";
import Boss from "./models/bossModel.js";
mongoose.connect(process.env.ATLAS_URI);

const seedBosses = [
    {
        name: 'Asylum Demon',
        weaknesses: 'Elemental',
        strengths: 'Status',
        damageType: 'Strike',
        type: 'Demon',
        special: 'Opening Drop attack',
    },
    {
        name: 'Taurus Demon',
        weaknesses: 'Elemental',
        strengths: 'Status',
        damageType: 'Strike',
        type: 'Demon',
        special: 'Drop attack available',
    },
    {
        name: 'Capra Demon',
        weaknesses: 'Lightning, Elemental',
        strengths: 'Status',
        damageType: 'Slash',
        type: 'Demon',
        special: 'Dogs in arena',
    },
    {
        name: 'Dragonslayer Ornstein',
        weaknesses: 'Status, Magic, Fire',
        strengths: 'Lightning, Physical',
        damageType: 'Pierce, Lightning',
        type: 'Divine',
        special: 'Gank fight with Smough',
    }
];

const seedBossDB = async() =>{
    await Boss.deleteMany({});
    await Boss.insertMany(seedBosses);
}

seedBossDB().then(()=>{
    console.log(`items added`);
    mongoose.connection.close() //after adding the data connection to the db is closed
})
    .catch((error)=>{
    console.log(error);
})