import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Flag, User, Calendar, Tag, Paperclip, MessageSquare, Edit } from "lucide-react";

const priorityColors = {
    1: "bg-green-100 text-green-800",
    2: "bg-yellow-100 text-yellow-800",
    3: "bg-red-100 text-red-800"
};

const statusColors = {
    ToDo: "bg-gray-200 text-gray-800",
    InProgress: "bg-blue-200 text-blue-800",
    Done: "bg-green-200 text-green-800",
    Evaluated: "bg-purple-200 text-purple-800"
};

export default function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:8000/tasks/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Task not found');
                return res.json();
            })
            .then(data => {
                setTask(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{error}</h2>
                <button
                    onClick={() => navigate('/tasks')}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    Back to Tasks
                </button>
            </div>
        );
    }
    if (!task) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Task not found</h2>
                <button
                    onClick={() => navigate('/tasks')}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    Back to Tasks
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate('/tasks')}
                className="flex items-center text-primary hover:text-primary/80 transition"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Tasks
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.title}</h1>
                    <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition flex items-center gap-2" onClick={() => navigate(`/tasks/${id}/edit`)}>
                        <Edit size={16} />
                        Edit Task
                    </button>
                </div>
                <p className="text-gray-600 text-lg mb-6">{task.description}</p>

                <div className="flex items-center gap-6 text-sm">
                    <span className={`px-3 py-1 rounded-full font-medium ${statusColors[task.status]}`}>
                        {task.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full font-medium flex items-center gap-2 ${priorityColors[task.priority]}`}>
                        <Flag size={14} /> {task.priority}
                    </span>
                    <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        <span className="font-medium">Assignee ID: {task.assigned_to}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="font-medium">Due: {new Date(task.due_date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-primary mb-4">Comments</h3>
                        <div className="space-y-4">
                            {(task.comments || []).map((comment, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                                        {comment.author.charAt(0)}
                                    </div>
                                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="font-semibold text-sm">{comment.author}</p>
                                            <p className="text-xs text-gray-500">{comment.date}</p>
                                        </div>
                                        <p className="text-gray-700 text-sm">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                            {(task.comments || []).length === 0 && <p className="text-gray-500 text-sm">No comments yet.</p>}
                        </div>
                        <div className="mt-4 pt-4 border-t">
                            <textarea className="w-full border-gray-300 rounded-lg p-2" placeholder="Add a comment..."></textarea>
                            <button className="mt-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition">
                                Submit Comment
                            </button>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-primary mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {(task.tags || []).map(tag => <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{tag}</span>)}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-primary mb-4">Attachments</h3>
                        <div className="space-y-3">
                            {(task.attachments || []).map(file => (
                                <div key={file.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Paperclip size={16} className="text-gray-500" />
                                        <span className="text-sm font-medium">{file.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{file.size}</span>
                                </div>
                            ))}
                            {(task.attachments || []).length === 0 && <p className="text-gray-500 text-sm">No attachments.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 