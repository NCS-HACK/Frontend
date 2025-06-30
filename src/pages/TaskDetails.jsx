import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Flag, User, Calendar, Tag, Paperclip, MessageSquare, Edit } from "lucide-react";

const mockTasks = [
    {
        id: 1,
        title: "Plan Annual Club Event",
        description: "Coordinate logistics for the annual club celebration including venue, catering, and entertainment.",
        status: "todo",
        priority: "high",
        assignee: "Alex Johnson",
        dueDate: "2024-01-25",
        tags: ["event", "planning"],
        attachments: [
            { name: "Venue Options.pdf", size: "1.2 MB" },
            { name: "Catering Quotes.xlsx", size: "450 KB" }
        ],
        comments: [
            { author: "Sarah Williams", text: "I've added the latest catering quotes.", date: "2024-01-14" }
        ]
    },
    {
        id: 2,
        title: "Update Club Website",
        description: "Refresh the club website with new content, photos, and upcoming events information.",
        status: "in-progress",
        priority: "medium",
        assignee: "Sarah Williams",
        dueDate: "2024-01-20",
        tags: ["website", "content"],
        attachments: [],
        comments: [
            { author: "Alex Johnson", text: "Let's review the new design mockups on Friday.", date: "2024-01-15" }
        ]
    },
    {
        id: 3,
        title: "Review Budget Proposal",
        description: "Analyze and approve the proposed budget for Q1 activities and events.",
        status: "done",
        priority: "high",
        assignee: "Mike Chen",
        dueDate: "2024-01-15",
        tags: ["finance", "budget"],
        attachments: [
            { name: "Q1 Budget.xlsx", size: "800 KB" }
        ],
        comments: []
    }
];

const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800"
};

const statusColors = {
    todo: "bg-gray-200 text-gray-800",
    "in-progress": "bg-blue-200 text-blue-800",
    done: "bg-green-200 text-green-800"
};

export default function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const task = mockTasks.find(t => t.id === Number(id));

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
                    <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition flex items-center gap-2">
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
                        <span className="font-medium">{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="font-medium">Due: {task.dueDate}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-primary mb-4">Comments</h3>
                        <div className="space-y-4">
                            {task.comments.map((comment, index) => (
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
                            {task.comments.length === 0 && <p className="text-gray-500 text-sm">No comments yet.</p>}
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
                            {task.tags.map(tag => <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{tag}</span>)}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-primary mb-4">Attachments</h3>
                        <div className="space-y-3">
                            {task.attachments.map(file => (
                                <div key={file.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Paperclip size={16} className="text-gray-500" />
                                        <span className="text-sm font-medium">{file.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{file.size}</span>
                                </div>
                            ))}
                            {task.attachments.length === 0 && <p className="text-gray-500 text-sm">No attachments.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 