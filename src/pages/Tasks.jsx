import { useState } from "react";
import { Plus, Search, Filter, Clock, User, Flag, Calendar, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockTasks = [
    {
        id: 1,
        title: "Plan Annual Club Event",
        description: "Coordinate logistics for the annual club celebration including venue, catering, and entertainment.",
        status: "todo",
        priority: "high",
        assignee: "Alex Johnson",
        dueDate: "2024-01-25",
        tags: ["event", "planning"]
    },
    {
        id: 2,
        title: "Update Club Website",
        description: "Refresh the club website with new content, photos, and upcoming events information.",
        status: "in-progress",
        priority: "medium",
        assignee: "Sarah Williams",
        dueDate: "2024-01-20",
        tags: ["website", "content"]
    },
    {
        id: 3,
        title: "Review Budget Proposal",
        description: "Analyze and approve the proposed budget for Q1 activities and events.",
        status: "done",
        priority: "high",
        assignee: "Mike Chen",
        dueDate: "2024-01-15",
        tags: ["finance", "budget"]
    },
    {
        id: 4,
        title: "Organize Team Building",
        description: "Plan and coordinate team building activities for club members.",
        status: "todo",
        priority: "low",
        assignee: "Emily Davis",
        dueDate: "2024-02-01",
        tags: ["team", "activities"]
    },
    {
        id: 5,
        title: "Prepare Meeting Minutes",
        description: "Document and distribute minutes from the last board meeting.",
        status: "in-progress",
        priority: "medium",
        assignee: "Alex Johnson",
        dueDate: "2024-01-18",
        tags: ["documentation", "meetings"]
    },
    {
        id: 6,
        title: "Recruit New Members",
        description: "Develop and implement strategies to attract new club members.",
        status: "todo",
        priority: "high",
        assignee: "Sarah Williams",
        dueDate: "2024-01-30",
        tags: ["recruitment", "growth"]
    }
];

const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800"
};

const priorityIcons = {
    high: <Flag className="w-4 h-4 text-red-500" />,
    medium: <Flag className="w-4 h-4 text-yellow-500" />,
    low: <Flag className="w-4 h-4 text-green-500" />
};

const statusColors = {
    todo: "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    done: "bg-green-100 text-green-800"
};

export default function Tasks() {
    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [assigneeFilter, setAssigneeFilter] = useState("all");
    const navigate = useNavigate();

    const filteredTasks = mockTasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
        const matchesAssignee = assigneeFilter === "all" || task.assignee === assigneeFilter;

        return matchesSearch && matchesPriority && matchesAssignee;
    });

    const todoTasks = filteredTasks.filter(task => task.status === "todo");
    const inProgressTasks = filteredTasks.filter(task => task.status === "in-progress");
    const doneTasks = filteredTasks.filter(task => task.status === "done");

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
                <span className="text-xs text-gray-600">{task.assignee}</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>

            <div className="flex flex-wrap gap-1 mb-2">
                {task.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                    </span>
                ))}
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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Tasks</h1>
                    <p className="text-text/70">Manage and track club responsibilities and projects</p>
                </div>
                <button type="button" onClick={() => navigate('/tasks/1/edit')} className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-accent/90 transition">
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
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <select
                            value={assigneeFilter}
                            onChange={(e) => setAssigneeFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="all">All Assignees</option>
                            <option value="Alex Johnson">Alex Johnson</option>
                            <option value="Sarah Williams">Sarah Williams</option>
                            <option value="Mike Chen">Mike Chen</option>
                            <option value="Emily Davis">Emily Davis</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KanbanColumn
                    title="To Do"
                    tasks={todoTasks}
                    status="todo"
                    color={statusColors.todo}
                />
                <KanbanColumn
                    title="In Progress"
                    tasks={inProgressTasks}
                    status="in-progress"
                    color={statusColors["in-progress"]}
                />
                <KanbanColumn
                    title="Done"
                    tasks={doneTasks}
                    status="done"
                    color={statusColors.done}
                />
            </div>

            {filteredTasks.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
} 