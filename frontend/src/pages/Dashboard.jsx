import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { taskAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
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

    // Count tasks by status
    const getTaskCount = (status) => {
        if (status === 'All') return tasks.length;
        return tasks.filter(task => task.status === status).length;
    };

    // Filter tasks by status
    const getFilteredTasks = () => {
        if (selectedStatus === 'All') return tasks;
        return tasks.filter(task => task.status === selectedStatus);
    };

    const filteredTasks = getFilteredTasks();

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

                <div className="status-filters">
                    <button 
                        className={`filter-btn ${selectedStatus === 'All' ? 'active' : ''}`}
                        onClick={() => setSelectedStatus('All')}
                    >
                        All Tasks ({getTaskCount('All')})
                    </button>
                    <button 
                        className={`filter-btn ${selectedStatus === 'Pending' ? 'active' : ''}`}
                        onClick={() => setSelectedStatus('Pending')}
                        style={{ borderLeftColor: '#f44336' }}
                    >
                        Pending ({getTaskCount('Pending')})
                    </button>
                    <button 
                        className={`filter-btn ${selectedStatus === 'In Progress' ? 'active' : ''}`}
                        onClick={() => setSelectedStatus('In Progress')}
                        style={{ borderLeftColor: '#FF9800' }}
                    >
                        In Progress ({getTaskCount('In Progress')})
                    </button>
                    <button 
                        className={`filter-btn ${selectedStatus === 'Completed' ? 'active' : ''}`}
                        onClick={() => setSelectedStatus('Completed')}
                        style={{ borderLeftColor: '#4CAF50' }}
                    >
                        ✅ Completed ({getTaskCount('Completed')})
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading">Loading tasks...</div>
                ) : filteredTasks.length === 0 ? (
                    <div className="no-tasks">
                        <p>No tasks yet. <Link to="/create-task">Create one now!</Link></p>
                    </div>
                ) : (
                    <div className="tasks-table-container">
                        <table className="tasks-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Assigned To</th>
                                    <th>Created Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.map(task => (
                                    <tr key={task._id}>
                                        <td className="task-title">{task.title}</td>
                                        <td className="task-description">{task.description.substring(0, 50)}...</td>
                                        <td>
                                            <span 
                                                className="status-badge"
                                                style={{ backgroundColor: getStatusColor(task.status) }}
                                            >
                                                {task.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span 
                                                className="priority-badge"
                                                style={{ 
                                                    color: task.priority === 'High' ? '#f44336' : task.priority === 'Medium' ? '#FF9800' : '#4CAF50',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td>{task.assignedUser?.name}</td>
                                        <td>{new Date(task.createdDate).toLocaleDateString()}</td>
                                        <td className="action-buttons">
                                            <Link to={`/edit-task/${task._id}`} className="btn btn-small btn-edit">Edit</Link>
                                            <button 
                                                onClick={() => handleDelete(task._id)} 
                                                className="btn btn-small btn-delete"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
