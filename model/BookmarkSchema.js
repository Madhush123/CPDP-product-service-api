const mongoose = require('mongoose');
const BookmarkSchema
    =new mongoose.Schema({
    userId:{
        type:Object,
    },
    createdDate:{
        type:Date
    },
    productId:{
        type:Object
    },
});
module.exports=mongoose.model('bookmark',BookmarkSchema);