const mongoose =require('mongoose')
const {Schema} = mongoose;
const transportSchema = new Schema({
   
    model: String,
    colour: String,
    capacity: Number,
    speed: String,
    workingday: Boolean
})

const Transports = mongoose.model('Transports', transportSchema);
module.exports = Transports



