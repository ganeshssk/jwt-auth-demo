const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "Name is required"],
        trim:true,
        minlength:[2, "Name must be at least 2 characters"],
        maxlength:[50, "Name cannot exceed 50 characters"]
    },

    email:{
        type:String,
        required:[true, "Email is required"],
        unique:[true, "Email already exists"],
        lowercase:true,
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email address"
        ]
    },

    password:{
        type:String,
        required:[true, "Password is required"],
        minlength:[6, "Password must be at least 6 characters"],
        select:false
    },

    taskstatus:{
        type:String,
        enum:["Pending", "UnderProcess", "Completed"],
        default:"Pending"
    },

    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Task"
        }
    ],

    createdAt:{
        type:Date,
        default:Date.now
    },

    updatedAt:{
        type:Date,
        default:Date.now
    }

},
{
    timestamps:true,
    optimisticConcurrency:true
},
{
    collection:"login"
});

// Create index for email for faster queries
userSchema.index({ email: 1 });

// Pre-save middleware to update updatedAt
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Remove password from response
userSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

module.exports = mongoose.model("User", userSchema);