import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { taskAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user, logout, token } = useContext(AuthContext);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            fetchTasks();
        }
    }, [token]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await taskAPI.getAllTasks();
            setTasks(response.data.tasks);
            setError('');
        } catch (err) {
            setError('Failed to load tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskAPI.deleteTask(id);
                setTasks(tasks.filter(task => task._id !== id));
            } catch (err) {
                setError('Failed to delete task');
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Completed': return '#4CAF50';
            case 'In Progress': return '#FF9800';
            case 'Pending': return '#f44336';
            default: return '#999';
        }
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="nav-left">
                    <h1>Task Management</h1>
                </div>
                <div className="nav-right">
                    <span>Welcome, {user?.name || 'User'}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </nav>

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h2>My Tasks</h2>
                    <Link to="/create-task" className="btn btn-primary">+ Create New Task</Link>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                    <div className="no-tasks">
                        <p>No tasks yet. <Link to="/create-task">Create one now!</Link></p>
                    </div>
                ) : (
                    <div className="tasks-grid">
                        {tasks.map(task => (
                            <div key={task._id} className="task-card">
                                <div className="task-header">
                                    <h3>{task.title}</h3>
                                    <span 
                                        className="status-badge"
                                        style={{ backgroundColor: getStatusColor(task.status) }}
                                    >
                                        {task.status}
                                    </span>
                                </div>
                                <p className="task-description">{task.description}</p>
                                <div className="task-meta">
                                    <span className="priority" style={{ color: task.priority === 'High' ? '#f44336' : task.priority === 'Medium' ? '#FF9800' : '#4CAF50' }}>
                                        Priority: {task.priority}
                                    </span>
                                    <span>Assigned to: {task.assignedUser?.name}</span>
                                </div>
                                <div className="task-actions">
                                    <Link to={`/edit-task/${task._id}`} className="btn btn-small btn-edit">Edit</Link>
                                    <button 
                                        onClick={() => handleDelete(task._id)} 
                                        className="btn btn-small btn-delete"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
