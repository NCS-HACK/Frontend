import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateEvent() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        event_type: '',
        start_time: '',
        end_time: '',
        location: '',
        department: '',
        is_mandatory: false,
        status: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({
            ...f,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('access_token');
        try {
            const res = await fetch('http://localhost:8000/events/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error('Failed to create event');
            const data = await res.json();
            navigate(`/events/${data.id}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h1 className="text-2xl font-bold text-primary mb-4">Create Event</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input className="w-full border rounded px-3 py-2" name="title" value={form.title} onChange={handleChange} placeholder="Event Title" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea className="w-full border rounded px-3 py-2" name="description" value={form.description} onChange={handleChange} placeholder="Description" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select className="w-full border rounded px-3 py-2" name="event_type" value={form.event_type} onChange={handleChange}>
                        
                        <option value="meeting">Meeting</option>
                        <option value="workshop">Workshop</option>
                        <option value="party">Party</option>
                        <option value="competition">Competition</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Start Time</label>
                    <input type="datetime-local" className="w-full border rounded px-3 py-2" name="start_time" value={form.start_time} onChange={handleChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">End Time</label>
                    <input type="datetime-local" className="w-full border rounded px-3 py-2" name="end_time" value={form.end_time} onChange={handleChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input className="w-full border rounded px-3 py-2" name="location" value={form.location} onChange={handleChange} placeholder="Location" />
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
                <div>
                    <label className="block text-sm font-medium mb-1">Mandatory</label>
                    <input type="checkbox" name="is_mandatory" checked={form.is_mandatory} onChange={handleChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select className="w-full border rounded px-3 py-2" name="status" value={form.status} onChange={handleChange}>
                        
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
                <div className="flex gap-2 mt-4">
                    <button type="button" onClick={() => navigate(-1)} className="bg-gray-100 px-4 py-2 rounded">Cancel</button>
                    <button type="submit" className="bg-accent text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Creating...' : 'Create Event'}</button>
                </div>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </form>
        </div>
    );
} 