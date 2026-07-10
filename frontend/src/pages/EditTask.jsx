import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { taskAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/TaskForm.css';

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchTask();
    }, [id]);

    const fetchTask = async () => {
        try {
            const response = await taskAPI.getTaskById(id);
            setFormData({
                title: response.data.task.title,
                description: response.data.task.description,
                status: response.data.task.status,
                priority: response.data.task.priority
            });
            setLoading(false);
        } catch (err) {
            setError('Failed to load task');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            await taskAPI.updateTask(id, {
                ...formData,
                assignedUser: user._id
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update task');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="loading">Loading task...</div>;

    return (
        <div className="form-container">
            <div className="form-card">
                <h2>Edit Task</h2>
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Status:</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Priority:</label>
                        <select name="priority" value={formData.priority} onChange={handleChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={submitting} className="btn btn-primary">
                            {submitting ? 'Updating...' : 'Update Task'}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate('/dashboard')} 
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTask;
