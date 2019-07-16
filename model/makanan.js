const mongoose = require('mongoose');
const makananSchema = mongoose.Schema({
    kodemakanan     : {type: String, unique: true},
    namamakanan     : String,
    resep 	        : String,
    harga	        : String,
    created_at		: String
});
module.exports = mongoose.model('makanan', makananSchema);