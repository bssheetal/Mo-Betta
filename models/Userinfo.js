const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfoSchema=new Schema({

    _id:{
       type:Schema.Types.ObjectId,
       ref:"User"
    },
    symbol:{type:String,required:true},
    companyname:{type:String,required:true}
});

var UserInfo=mongoose.model("UserInfo",userInfoSchema);

module.exports=UserInfo;