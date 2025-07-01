import { useNavigate } from "react-router-dom";
import { useState } from "react";

function parseJwt(token) {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

export default function CreateTask() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        assigned_to: '',
        status: 'ToDo',
        due_date: '',
        priority: '',
        department: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({
            ...f,
            [name]: value
        }));
    };
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('access_token');
        const payload = parseJwt(token);
        const creator = payload ? payload.user_id : null;
        try {
            const body = { ...form, creator };
            console.log(body);
            const res = await fetch('http://localhost:8000/tasks/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            if (!res.ok) throw new Error('Failed to create task');
            const data = await res.json();
            navigate(`/tasks`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h1 className="text-2xl font-bold text-primary mb-4">Create Task</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input className="w-full border rounded px-3 py-2" name="title" value={form.title} onChange={handleChange} placeholder="Task Title" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea className="w-full border rounded px-3 py-2" name="description" value={form.description} onChange={handleChange} placeholder="Description" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Assignee (User ID)</label>
                    <input className="w-full border rounded px-3 py-2" name="assigned_to" value={form.assigned_to} onChange={handleChange} placeholder="Assignee User ID" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Due Date</label>
                    <input type="datetime-local" className="w-full border rounded px-3 py-2" name="due_date" value={form.due_date} onChange={handleChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <select className="w-full border rounded px-3 py-2" name="priority" value={form.priority} onChange={handleChange}>

                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select className="w-full border rounded px-3 py-2" name="status" value={form.status} onChange={handleChange}>
                        <option value="ToDo">To Do</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Done">Done</option>
                        <option value="Evaluated">Evaluated</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Department</label>
                    <select className="w-full border rounded px-3 py-2" name="department" value={form.department} onChange={handleChange}>

                        <option value="finance">Finance</option>
                        <option value="hr">HR</option>
                        <option value="er">ER</option>
                        <option value="technical_team">Technical Team</option>
                        <option value="marketing">Marketing</option>
                        <option value="visual_creation">Visual Creation</option>
                    </select>
                </div>
                <div className="flex gap-2 mt-4">
                    <button type="button" onClick={() => navigate(-1)} className="bg-gray-100 px-4 py-2 rounded">Cancel</button>
                    <button type="submit" className="bg-accent text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Creating...' : 'Create Task'}</button>
                </div>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </form>
        </div>
    );
} 