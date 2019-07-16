const mongoose = require('mongoose');
const alamatSchema = mongoose.Schema({
    kodealamat     : {type: String, unique: true},
    namarestoran   : String,
    alamat	       : String,
    created_at	   : String
});
module.exports = mongoose.model('alamat', alamatSchema);