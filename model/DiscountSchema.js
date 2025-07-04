const mongoose = require('mongoose');
const DiscountSchema
    =new mongoose.Schema({
    discountName:{
        type:String,
        required:true
    },
    percentage:{
        type:Number
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    lastUpdate:{
        type:Date
    },
});
module.exports=mongoose.model('discount',DiscountSchema);