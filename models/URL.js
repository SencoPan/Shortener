const database = require("mongoose");

const {Schema} = database;

const URLSchema = new Schema({
    URL: {type:String, required:true, unique: true},
    short: {type:String, required: true, unique: true},
    amountOfVisiting: {type:Number, default: 0},
    userId: {type:String, required: true, unique: true}
});

module.exports = mongoose.model('urls', URLSchema);