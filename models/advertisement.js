const mongoose = require("mongoose");

const ads = new mongoose.Schema({
    adsname:{
        type:String,
        require:true
    },
    fdate:{
        type:String
    },
    tdate:{
        type:String
    },
    adsImg:{
        type:String
    }
},{
    timestamps: true // Adds createdAt and updatedAt fields
})

module.exports = mongoose.model("Ads",ads);