const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "name must be provided"],
        trim:true,
        maxlength:[20,"name can not be more than 20 characters"],

    },
    completed:{
        type:String,
        default:false,
    },
})

module.exports = mongoose.model('Task',taskSchema)