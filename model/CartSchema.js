const mongoose = require('mongoose');
const CartSchema
    =new mongoose.Schema({
    userId:{
        type:Object,
    },
    productId:{
        type:Object
    },
    qty:{
        type:Number
    },
    createdDate:{
        type:Date
    },
});
module.exports=mongoose.model('cart',CartSchema);