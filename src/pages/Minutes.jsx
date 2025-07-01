import { useState } from "react";
import { Plus, Search, Calendar, Users, FileText, Edit, Eye, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockMinutes = [
    {
        id: 1,
        title: "Weekly Team Meeting - January 15, 2024",
        date: "2024-01-15",
        attendees: ["Alex Johnson", "Sarah Williams", "Mike Chen", "Emily Davis"],
        author: "Alex Johnson",
        content: "Discussed upcoming events and task assignments. Key decisions made regarding budget allocation.",
        status: "published",
        tags: ["weekly", "team"]
    },
    {
        id: 2,
        title: "Board Meeting - January 10, 2024",
        date: "2024-01-10",
        attendees: ["Alex Johnson", "Sarah Williams", "Mike Chen"],
        author: "Sarah Williams",
        content: "Reviewed quarterly performance and approved new initiatives. Budget discussions and strategic planning.",
        status: "draft",
        tags: ["board", "finance"]
    },
    {
        id: 3,
        title: "Event Planning Session - January 8, 2024",
        date: "2024-01-08",
        attendees: ["Alex Johnson", "Emily Davis", "Mike Chen"],
        author: "Emily Davis",
        content: "Planned the annual club celebration. Venue selection and entertainment options discussed.",
        status: "published",
        tags: ["event", "planning"]
    }
];

export default function Minutes() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const navigate = useNavigate();

    const filteredMinutes = mockMinutes.filter(minute => {
        const matchesSearch = minute.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            minute.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || minute.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Meeting Minutes</h1>
                    <p className="text-text/70">Document and manage meeting notes and decisions</p>
                </div>
                <button type="button" onClick={() => navigate('/minutes/1/edit')} className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-accent/90 transition">
                    <Plus size={20} />
                    Create Minutes
                </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search minutes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>

            {/* Minutes List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredMinutes.map((minute) => (
                    <div key={minute.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${minute.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {minute.status}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-gray-400 hover:text-primary transition">
                                        <Eye size={16} />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-primary transition">
                                        <Edit size={16} />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-primary transition">
                                        <Download size={16} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-semibold text-lg mb-2">{minute.title}</h3>
                            <p className="text-sm text-text/70 mb-4 line-clamp-3">{minute.content}</p>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-text/70">
                                    <Calendar size={16} />
                                    <span>{new Date(minute.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text/70">
                                    <Users size={16} />
                                    <span>{minute.attendees.length} attendees</span>
                                </div>
                                <div className="text-sm text-text/70">
                                    <span className="font-medium">Author:</span> {minute.author}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-4">
                                {minute.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => navigate(`/minutes/${minute.id}`)}
                                    className="flex-1 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition">
                                    View Full Minutes
                                </button>
                                <button
                                    onClick={() => navigate(`/minutes/${minute.id}/edit`)}
                                    className="flex-1 bg-secondary/10 text-secondary px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary/20 transition flex items-center gap-1">
                                    <Edit size={16} /> Edit
                                </button>
                                <button className="flex-1 bg-accent/10 text-accent px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent/20 transition">
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredMinutes.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No minutes found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Create New Minutes</p>
                                <p className="text-sm text-text/60">Start documenting a meeting</p>
                            </div>
                        </div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Download className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <p className="font-medium">Export All</p>
                                <p className="text-sm text-text/60">Download all minutes as PDF</p>
                            </div>
                        </div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                                <Search className="w-5 h-5 text-secondary" />
                            </div>
                            <div>
                                <p className="font-medium">Advanced Search</p>
                                <p className="text-sm text-text/60">Find specific content</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
} 