import { useState } from "react";
import { Search, Plus, Mail, Phone, Crown, Shield, User, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockMembers = [
    {
        id: 1,
        name: "Alex Johnson",
        email: "alex.johnson@email.com",
        phone: "+1 (555) 123-4567",
        role: "Admin",
        avatar: "AJ",
        status: "active",
        joinDate: "2023-01-15",
        tasks: 5,
        events: 12
    },
    {
        id: 2,
        name: "Sarah Williams",
        email: "sarah.w@email.com",
        phone: "+1 (555) 234-5678",
        role: "Coordinator",
        avatar: "SW",
        status: "active",
        joinDate: "2023-02-20",
        tasks: 3,
        events: 8
    },
    {
        id: 3,
        name: "Mike Chen",
        email: "mike.chen@email.com",
        phone: "+1 (555) 345-6789",
        role: "Member",
        avatar: "MC",
        status: "active",
        joinDate: "2023-03-10",
        tasks: 2,
        events: 6
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@email.com",
        phone: "+1 (555) 456-7890",
        role: "Member",
        avatar: "ED",
        status: "inactive",
        joinDate: "2023-01-25",
        tasks: 0,
        events: 3
    }
];

const roleIcons = {
    Admin: <Crown className="w-4 h-4 text-yellow-500" />,
    Coordinator: <Shield className="w-4 h-4 text-blue-500" />,
    Member: <User className="w-4 h-4 text-gray-500" />
};

const roleColors = {
    Admin: "bg-yellow-100 text-yellow-800",
    Coordinator: "bg-blue-100 text-blue-800",
    Member: "bg-gray-100 text-gray-800"
};

export default function Members() {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const navigate = useNavigate();

    const filteredMembers = mockMembers.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "all" || member.role === roleFilter;
        const matchesStatus = statusFilter === "all" || member.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Members</h1>
                    <p className="text-text/70">Manage your club members and their roles</p>
                </div>
                <button className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-accent/90 transition">
                    <Plus size={20} />
                    Add Member
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="all">All Roles</option>
                            <option value="Admin">Admin</option>
                            <option value="Coordinator">Coordinator</option>
                            <option value="Member">Member</option>
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member) => (
                    <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                                        {member.avatar}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{member.name}</h3>
                                        <div className="flex items-center gap-2">
                                            {roleIcons[member.role]}
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[member.role]}`}>
                                                {member.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`w-3 h-3 rounded-full ${member.status === 'active' ? 'bg-accent' : 'bg-gray-300'}`}></div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2 text-sm text-text/70">
                                    <Mail size={16} />
                                    <span>{member.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text/70">
                                    <Phone size={16} />
                                    <span>{member.phone}</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-sm mb-4">
                                <div>
                                    <p className="text-text/60">Tasks</p>
                                    <p className="font-semibold text-primary">{member.tasks}</p>
                                </div>
                                <div>
                                    <p className="text-text/60">Events</p>
                                    <p className="font-semibold text-primary">{member.events}</p>
                                </div>
                                <div>
                                    <p className="text-text/60">Joined</p>
                                    <p className="font-semibold text-primary">{new Date(member.joinDate).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/members/${member.id}`)}
                                    className="flex-1 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition">
                                    View Profile
                                </button>
                                <button className="flex-1 bg-accent/10 text-accent px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent/20 transition">
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredMembers.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
} 