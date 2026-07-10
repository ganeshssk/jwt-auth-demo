# Complete Setup Guide - Task Management Application

## **QUICK START**

### **Step 1: Install Backend Dependencies**
```bash
cd c:\WorkShop\jwt-auth-demo
npm install
```

### **Step 2: Install Frontend Dependencies**
```bash
cd c:\WorkShop\jwt-auth-demo\frontend
npm install
```

### **Step 3: Run Backend** (Terminal 1)
```bash
cd c:\WorkShop\jwt-auth-demo
npm start
```
✅ Backend runs on: `http://localhost:3000`

### **Step 4: Run Frontend** (Terminal 2)
```bash
cd c:\WorkShop\jwt-auth-demo\frontend
npm start
```
✅ Frontend runs on: `http://localhost:3001`

---

## **Access the Application**

Open your browser and go to:
```
http://localhost:3001
```

---

## **Project Structure**

```
jwt-auth-demo/
├── Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js (MongoDB connection)
│   ├── controllers/
│   │   ├── authController.js (Register/Login)
│   │   └── taskController.js (Task CRUD)
│   ├── models/
│   │   ├── user.js
│   │   └── task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   └── auth.js (JWT verification)
│   ├── app.js
│   └── package.json
│
└── Frontend (React)
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── CreateTask.jsx
    │   │   └── EditTask.jsx
    │   ├── services/
    │   │   └── api.js (API calls)
    │   ├── context/
    │   │   └── AuthContext.js (Auth state)
    │   ├── styles/
    │   ├── App.jsx
    │   └── index.js
    ├── public/
    │   └── index.html
    └── package.json
```

---

## **Features Implemented**

✅ **Authentication**
- User Registration
- User Login with JWT
- Password hashing with bcrypt
- Protected routes

✅ **Task Management**
- Create tasks
- Read/View all tasks
- Update task status, priority, description
- Delete tasks
- Assign tasks to users

✅ **Frontend**
- Responsive design
- Login/Register pages
- Dashboard with task grid
- Create/Edit task forms
- Logout functionality

✅ **Backend API**
- RESTful endpoints
- JWT token authentication
- MongoDB database
- CORS enabled for frontend-backend communication

---

## **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### **Tasks**
- `POST /api/tasks/create` - Create task
- `GET /api/tasks/all` - Get all tasks
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/update/:id` - Update task
- `DELETE /api/tasks/delete/:id` - Delete task

---

## **Environment Variables (.env)**

```
PORT=3000
JWT_SECRET=mySuperSecretKey12345
MONGO_URI=mongodb+srv://ganesh_db_user:Passw0rd535@cluster0.h6viic6.mongodb.net/TaskManagementDB
```

---

## **Test the Application**

1. **Register** a new account
2. **Login** with your credentials
3. **Create** a new task
4. **View** all tasks on dashboard
5. **Edit** task status/priority
6. **Delete** tasks

---

## **Troubleshooting**

### **Backend won't start**
- Check MongoDB connection string in `.env`
- Ensure Node.js is installed: `node --version`
- Run: `npm install`

### **Frontend won't start**
- Ensure backend is running first
- Check if port 3000/3001 are available
- Run: `npm install` in frontend folder

### **Can't login/register**
- Check MongoDB is connected
- Verify CORS is enabled in backend
- Check browser console for errors

### **API requests fail**
- Ensure backend is on `http://localhost:3000`
- Frontend should be on `http://localhost:3001`
- Check Authorization header is being sent

---

## **Technologies Used**

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt (Password hashing)
- CORS

**Frontend:**
- React 18.2.0
- React Router DOM
- Axios
- CSS3

---

**Ready to use! Happy coding! 🚀**
