import { useState, useEffect } from "react";
import { Search, Plus, Mail, Phone, Crown, Shield, User, Filter, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const roleIcons = {
    Admin: <Crown className="w-4 h-4 text-yellow-500" />,
    Coordinator: <Shield className="w-4 h-4 text-blue-500" />,
    Member: <User className="w-4 h-4 text-gray-500" />
};

const departmentColors = {
    Finance: "bg-green-100 text-green-800",
    HR: "bg-pink-100 text-pink-800",
    ER: "bg-purple-100 text-purple-800",
    "Technical Team": "bg-blue-100 text-blue-800",
    Marketing: "bg-yellow-100 text-yellow-800",
    "Visual Creation": "bg-red-100 text-red-800"
};

function getRoleColor(role) {
    if (role === "Admin") return "bg-gray-100 text-gray-800";
    if (role.endsWith("Leader")) {
        const dept = role.replace(" Leader", "");
        return departmentColors[dept] || "bg-gray-100 text-gray-800";
    }
    return departmentColors[role] || "bg-gray-100 text-gray-800";
}

export default function Members() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        fetch("http://localhost:8000/users/", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch members");
                return res.json();
            })
            .then((data) => {
                setMembers(data);
                console.log(data);

                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Map API data to expected fields for rendering
    const mappedMembers = members.map((user) => {
        let role = '';
        if (user.is_admin) {
            role = 'Admin';
        } else if (user.is_board) {
            role = `${capitalizeDepartment(user.department)} Leader`;
        } else {
            role = capitalizeDepartment(user.department);
        }
        // Format join date
        let joinDate = '';
        if (user.date_joined) {
            const date = new Date(user.date_joined);
            joinDate = date.toLocaleDateString();
        }
        // Generate random numbers for tasks and events
        const tasks = Math.floor(Math.random() * 12);
        const events = Math.floor(Math.random() * 12);
        return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            phone: user.phone_number,
            role,
            avatar: `${user.first_name[0] || ''}${user.last_name[0] || ''}`.toUpperCase(),
            status: user.is_active ? "active" : "inactive", // You can adjust this if you have a status field
            joinDate, // Use formatted date
            tasks, // Random number between 0 and 11
            events // Random number between 0 and 11
        };
    });

    function capitalizeDepartment(dept) {
        const departments = {
            finance: 'Finance',
            hr: 'HR',
            er: 'ER',
            'technical_team': 'Technical Team',
            marketing: 'Marketing',
            'visual_creation': 'Visual Creation'
        };
        return departments[dept] || dept;
    }

    const filteredMembers = mappedMembers.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());
        let memberRoleForFilter = member.role;
        if (memberRoleForFilter.endsWith('Leader')) {
            memberRoleForFilter = memberRoleForFilter.replace(' Leader', '');
        }
        const matchesRole = roleFilter === "all" || memberRoleForFilter === roleFilter;
        const matchesStatus = statusFilter === "all" || member.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    if (loading) return <div>Loading members...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Members</h1>
                    <p className="text-text/70">Manage your club members and their roles</p>
                </div>
                {/* <button type="button" onClick={() => navigate('/members/invite')} className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-accent/90 transition">
                    <Plus size={20} />
                    Invite Member
                </button> */}
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
                            <option value="Finance">Finance</option>
                            <option value="HR">HR</option>
                            <option value="ER">ER</option>
                            <option value="Technical Team">Technical Team</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Visual Creation">Visual Creation</option>
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
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
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
                                    <p className="font-semibold text-primary">{member.joinDate}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/members/${member.id}`)}
                                    className="flex-1 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition">
                                    View Profile
                                </button>
                                {/* <button className="flex-1 bg-accent/10 text-accent px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent/20 transition">
                                    Message
                                </button> */}
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