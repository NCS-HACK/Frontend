import { useState, useEffect } from "react";
import { Plus, Search, Filter, Clock, User, Flag, Calendar, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const priorityColors = {
    1: "bg-green-100 text-green-800",
    2: "bg-yellow-100 text-yellow-800",
    3: "bg-red-100 text-red-800"
};

const priorityIcons = {
    1: <Flag className="w-4 h-4 text-green-500" />,
    2: <Flag className="w-4 h-4 text-yellow-500" />,
    3: <Flag className="w-4 h-4 text-red-500" />
};

const statusColors = {
    ToDo: "bg-gray-100 text-gray-800",
    InProgress: "bg-blue-100 text-blue-800",
    Done: "bg-green-100 text-green-800",
    Evaluated: "bg-purple-100 text-purple-800"
};

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [assigneeFilter, setAssigneeFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        fetch("http://localhost:8000/tasks/", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch tasks");
                return res.json();
            })
            .then((data) => {
                setTasks(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Map API data to expected fields for rendering
    const mappedTasks = tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        assigned_to: task.assigned_to,
        status: task.status,
        due_date: task.due_date,
        priority: task.priority,
        department: task.department,
        creator: task.creator
    }));

    const filteredTasks = mappedTasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriority = priorityFilter === "all" || String(task.priority) === priorityFilter;
        const matchesAssignee = assigneeFilter === "all" || String(task.assigned_to) === assigneeFilter;
        return matchesSearch && matchesPriority && matchesAssignee;
    });

    const todoTasks = filteredTasks.filter(task => task.status === "ToDo");
    const inProgressTasks = filteredTasks.filter(task => task.status === "InProgress");
    const doneTasks = filteredTasks.filter(task => task.status === "Done");
    const evaluatedTasks = filteredTasks.filter(task => task.status === "Evaluated");

    const TaskCard = ({ task }) => (
        <div
            onClick={() => navigate(`/tasks/${task.id}`)}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 cursor-pointer hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-sm text-gray-900">{task.title}</h3>
                <div className="flex items-center gap-1">
                    {priorityIcons[task.priority]}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                        {task.priority}
                    </span>
                </div>
            </div>
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
            <div className="flex items-center gap-2 mb-3">
                <User className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-600">Assignee ID: {task.assigned_to}</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-600">Due: {new Date(task.due_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
                <Flag className="w-3 h-3 text-gray-400" />
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[task.status]}`}>{task.status}</span>
            </div>
            <button
                onClick={e => { e.stopPropagation(); navigate(`/tasks/${task.id}/edit`); }}
                className="w-full bg-secondary/10 text-secondary px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary/20 transition flex items-center gap-1 mt-2">
                <Edit size={16} /> Edit
            </button>
        </div>
    );

    const KanbanColumn = ({ title, tasks, status, color }) => (
        <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                    {tasks.length}
                </span>
            </div>
            <div className="space-y-3">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
                {tasks.length === 0 && (
                    <div className="text-center py-8 text-gray-500 text-sm">
                        No tasks
                    </div>
                )}
            </div>
        </div>
    );

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Tasks</h1>
                    <p className="text-text/70">Manage and track club responsibilities and projects</p>
                </div>
                <button type="button" onClick={() => navigate('/tasks/create')} className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-accent/90 transition">
                    <Plus size={20} />
                    Create Task
                </button>
            </div>
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="all">All Priorities</option>
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                        </select>
                        <select
                            value={assigneeFilter}
                            onChange={(e) => setAssigneeFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="all">All Assignees</option>
                            {/* You can populate this with user IDs or names if you fetch users */}
                        </select>
                    </div>
                </div>
            </div>
            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KanbanColumn title="To Do" tasks={todoTasks} status="ToDo" color="bg-gray-100 text-gray-800" />
                <KanbanColumn title="In Progress" tasks={inProgressTasks} status="InProgress" color="bg-blue-100 text-blue-800" />
                <KanbanColumn title="Done" tasks={doneTasks} status="Done" color="bg-green-100 text-green-800" />
                <KanbanColumn title="Evaluated" tasks={evaluatedTasks} status="Evaluated" color="bg-purple-100 text-purple-800" />
            </div>
        </div>
    );
} 