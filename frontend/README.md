# Task Management Frontend

React-based frontend for the Task Management application.

## Setup & Installation

```bash
cd frontend
npm install
```

## Running the Application

```bash
npm start
```

The application will run on `http://localhost:3000`

## Features

- ✅ User Registration & Login with JWT
- ✅ Task Dashboard with all tasks
- ✅ Create new tasks
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Task filtering by status and priority
- ✅ Protected routes with authentication
- ✅ Responsive design

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CreateTask.jsx
│   │   └── EditTask.jsx
│   ├── services/
│   │   └── api.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── styles/
│   │   ├── Auth.css
│   │   ├── Dashboard.css
│   │   └── TaskForm.css
│   ├── App.jsx
│   └── index.js
└── package.json
```

## API Integration

The frontend communicates with the backend API at `http://localhost:3000/api`

### Environment Variables

Create a `.env` file if needed (optional):

```
REACT_APP_API_BASE_URL=http://localhost:3000/api
```

## Pages

### Login
- Users can log in with email and password
- Redirects to dashboard on success

### Register
- New user registration
- Auto-login after successful registration

### Dashboard
- View all tasks
- Create new task button
- Edit/Delete task options
- Task filtering and status display

### Create Task
- Form to create a new task
- Fields: Title, Description, Priority
- Status defaults to "Pending"

### Edit Task
- Edit existing task details
- Update status, priority, description
- Save changes

## Technologies Used

- React 18.2.0
- React Router DOM 6.15.0
- Axios for API calls
- CSS3 for styling
