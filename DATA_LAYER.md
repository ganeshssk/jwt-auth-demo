# Data Layer Documentation

## **✅ MongoDB Atlas Implementation**

- Primary database: **MongoDB Atlas**
- Connection string in `.env`: `MONGO_URI=mongodb+srv://...`
- Mongoose ODM for schema and data management
- Connection established in `config/db.js`

---

## **✅ Mongoose Schemas & Validations**

### **User Schema** (`models/user.js`)

| Field | Type | Validations |
|-------|------|-------------|
| **name** | String | Required, min 2, max 50 chars, trimmed |
| **email** | String | Required, unique, lowercase, regex email validation, trimmed |
| **password** | String | Required, min 6 chars, hidden by default (select:false) |
| **taskstatus** | String | Enum: [Pending, UnderProcess, Completed] |
| **tasks** | ObjectId[] | Reference to Task model (1-to-Many) |
| **timestamps** | Date | createdAt, updatedAt auto-managed |

**Validations:**
- ✅ Email regex validation (RFC 5322 format)
- ✅ Password minimum length requirement
- ✅ Name length constraints
- ✅ Unique email constraint with custom message
- ✅ Automatic timestamp management
- ✅ Password excluded from JSON response

---

### **Task Schema** (`models/task.js`)

| Field | Type | Validations |
|-------|------|-------------|
| **title** | String | Required, min 3, max 100 chars, trimmed |
| **description** | String | Required, min 5, max 1000 chars, trimmed |
| **status** | String | Enum: [Pending, In Progress, Completed] |
| **priority** | String | Enum: [Low, Medium, High] |
| **createdDate** | Date | Auto-set, immutable |
| **dueDate** | Date | Optional, must be after createdDate |
| **assignedUser** | ObjectId | Reference to User (required, Many-to-One) |
| **completedAt** | Date | Auto-set when status = Completed |
| **timestamps** | Date | createdAt, updatedAt auto-managed |

**Validations:**
- ✅ Title and description length constraints
- ✅ Enum validation for status and priority with custom messages
- ✅ Due date validation (must be future date)
- ✅ Completed date auto-validation
- ✅ User assignment requirement
- ✅ Immutable createdDate

---

## **✅ Relationships & References**

### **One-to-Many Relationship**
```
User (1) ──────────── (Many) Task
```

- Each User can have multiple Tasks
- Each Task belongs to one User
- Reference: `Task.assignedUser` → `User._id`
- Automatic population with `.populate('assignedUser')`

---

## **✅ Data Integrity Features**

### **Indexes**
```javascript
// User Model
userSchema.index({ email: 1 });  // For fast email lookups

// Task Model
taskSchema.index({ assignedUser: 1 });   // Find tasks by user
taskSchema.index({ status: 1 });         // Filter by status
taskSchema.index({ priority: 1 });       // Filter by priority
taskSchema.index({ createdDate: -1 });   // Sort by date
```

### **Pre-Save Middleware**
```javascript
// Auto-populate completedAt when task is marked complete
taskSchema.pre('save', function(next) {
    if (this.status === "Completed" && !this.completedAt) {
        this.completedAt = new Date();
    }
    // ... validation logic
});
```

### **Virtuals (Computed Properties)**
```javascript
// Calculate task age dynamically
taskSchema.virtual('ageInDays').get(function() {
    // Returns number of days since task creation
});
```

---

## **✅ Validation Examples**

### **User Creation Validation**
```javascript
// ❌ REJECTED - Invalid email
{
    name: "John",
    email: "invalid-email",
    password: "pass"
}
// Error: "Please provide a valid email address"

// ❌ REJECTED - Duplicate email
{
    name: "Jane",
    email: "existing@test.com",
    password: "password123"
}
// Error: "Email already exists"

// ❌ REJECTED - Short password
{
    name: "Bob",
    email: "bob@test.com",
    password: "123"
}
// Error: "Password must be at least 6 characters"

// ✅ ACCEPTED
{
    name: "John Doe",
    email: "john@test.com",
    password: "secure123"
}
```

### **Task Creation Validation**
```javascript
// ❌ REJECTED - Missing required fields
{
    title: "Buy",
    priority: "High"
}
// Error: "Task description is required"

// ❌ REJECTED - Invalid status
{
    title: "Important Task",
    description: "Complete this task",
    status: "Cancelled",
    assignedUser: "user_id"
}
// Error: "Status must be one of: Pending, In Progress, or Completed"

// ❌ REJECTED - Invalid due date
{
    title: "Task",
    description: "Complete this task",
    dueDate: "2026-07-09",
    assignedUser: "user_id"
}
// Error: "Due date must be after created date"

// ✅ ACCEPTED
{
    title: "Complete Report",
    description: "Prepare the quarterly report",
    priority: "High",
    dueDate: "2026-07-20",
    assignedUser: "user_id"
}
```

---

## **✅ Data Security**

- ✅ Password hashed with bcrypt (20+ chars generated salt)
- ✅ Email validation prevents invalid data entry
- ✅ Password excluded from API responses (select: false)
- ✅ Unique constraints prevent duplicate records
- ✅ Data trimming removes whitespace
- ✅ Lowercase email normalization
- ✅ Immutable createdDate prevents manipulation

---

## **✅ Database Collection Structure**

### **login collection (Users)**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  taskstatus: String,
  tasks: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### **tasks collection (Tasks)**
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String,
  priority: String,
  createdDate: Date,
  dueDate: Date,
  assignedUser: ObjectId (references User),
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## **✅ Mongoose Features Used**

| Feature | Purpose | Status |
|---------|---------|--------|
| **Schemas** | Define data structure | ✅ |
| **Validation** | Enforce data quality | ✅ |
| **Unique Constraints** | Prevent duplicates | ✅ |
| **References (Ref)** | Implement relationships | ✅ |
| **Enums** | Restrict values | ✅ |
| **Pre-hooks** | Auto-processing before save | ✅ |
| **Virtuals** | Computed properties | ✅ |
| **Indexes** | Query optimization | ✅ |
| **Select** | Field visibility control | ✅ |
| **Timestamps** | Auto audit trail | ✅ |

---

## **Summary**

✅ **MongoDB Atlas** as primary database  
✅ **Mongoose schemas** with comprehensive validation  
✅ **Data relationships** (1-to-Many: User ↔ Task)  
✅ **Input validation** prevents invalid data entry  
✅ **Indexes** for optimal query performance  
✅ **Data integrity** through constraints and middleware  
✅ **Security** with password hashing and validation  

**All Data Layer Requirements Implemented!** 🚀
