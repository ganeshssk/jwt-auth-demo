const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:["Pending", "In Progress", "Completed"],
        default:"Pending"
    },

    priority:{
        type:String,
        enum:["Low", "Medium", "High"],
        default:"Medium"
    },

    createdDate:{
        type:Date,
        default:Date.now
    },

    assignedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},
{
    timestamps:true
},
{
    collection:"tasks"
});

module.exports = mongoose.model("Task", taskSchema);
