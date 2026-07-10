const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title:{
        type:String,
        required:[true, "Task title is required"],
        trim:true,
        minlength:[3, "Title must be at least 3 characters"],
        maxlength:[100, "Title cannot exceed 100 characters"]
    },

    description:{
        type:String,
        required:[true, "Task description is required"],
        trim:true,
        minlength:[5, "Description must be at least 5 characters"],
        maxlength:[1000, "Description cannot exceed 1000 characters"]
    },

    status:{
        type:String,
        enum:{
            values:["Pending", "In Progress", "Completed"],
            message:"Status must be one of: Pending, In Progress, or Completed"
        },
        default:"Pending"
    },

    priority:{
        type:String,
        enum:{
            values:["Low", "Medium", "High"],
            message:"Priority must be one of: Low, Medium, or High"
        },
        default:"Medium"
    },

    createdDate:{
        type:Date,
        default:Date.now,
        immutable:true
    },

    dueDate:{
        type:Date,
        validate:{
            validator: function(v) {
                return !v || v > this.createdDate;
            },
            message: "Due date must be after created date"
        }
    },

    assignedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "Task must be assigned to a user"]
    },

    completedAt:{
        type:Date,
        default:null,
        validate:{
            validator: function(v) {
                return this.status !== "Completed" || v !== null;
            },
            message: "Completed date is required when status is Completed"
        }
    }

},
{
    timestamps:true
},
{
    collection:"tasks"
});

// Create indexes for better query performance
taskSchema.index({ assignedUser: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ createdDate: -1 });

// Pre-save middleware for validations
taskSchema.pre('save', function(next) {
    if (this.status === "Completed" && !this.completedAt) {
        this.completedAt = new Date();
    }
    if (this.status !== "Completed") {
        this.completedAt = null;
    }
    next();
});

// Virtual for task age in days
taskSchema.virtual('ageInDays').get(function() {
    const now = new Date();
    const created = new Date(this.createdDate);
    const diffTime = Math.abs(now - created);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Populate user by default
taskSchema.pre(/^find/, function() {
    this.populate({
        path: 'assignedUser',
        select: 'name email'
    });
});

module.exports = mongoose.model("Task", taskSchema);
