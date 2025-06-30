import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, Users, Crown, Shield, User, Edit, MessageCircle } from "lucide-react";

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
        events: 12,
        bio: "Experienced club administrator with 5+ years of leadership experience. Passionate about community building and event organization.",
        skills: ["Leadership", "Event Planning", "Budget Management", "Team Coordination"],
        recentActivity: [
            { type: "task", description: "Completed budget review", date: "2024-01-15" },
            { type: "event", description: "Attended team meeting", date: "2024-01-14" },
            { type: "task", description: "Created new event proposal", date: "2024-01-12" }
        ]
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
        events: 8,
        bio: "Creative coordinator with expertise in event management and member engagement. Always looking for innovative ways to improve club activities.",
        skills: ["Event Management", "Communication", "Creative Planning", "Member Engagement"],
        recentActivity: [
            { type: "event", description: "Organized social gathering", date: "2024-01-15" },
            { type: "task", description: "Updated website content", date: "2024-01-13" },
            { type: "event", description: "Coordinated workshop", date: "2024-01-10" }
        ]
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
        events: 6,
        bio: "Dedicated member with strong analytical skills. Contributes to financial planning and strategic decision-making.",
        skills: ["Financial Analysis", "Strategic Planning", "Data Analysis", "Problem Solving"],
        recentActivity: [
            { type: "task", description: "Reviewed budget proposal", date: "2024-01-15" },
            { type: "event", description: "Participated in planning session", date: "2024-01-12" },
            { type: "task", description: "Completed financial report", date: "2024-01-10" }
        ]
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
        events: 3,
        bio: "Former active member who contributed to various club activities. Currently on hiatus but remains connected to the community.",
        skills: ["Team Building", "Social Media", "Volunteer Coordination", "Public Relations"],
        recentActivity: [
            { type: "event", description: "Last attended social event", date: "2023-12-15" },
            { type: "task", description: "Completed volunteer coordination", date: "2023-12-10" },
            { type: "event", description: "Participated in workshop", date: "2023-12-05" }
        ]
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

export default function MemberProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const member = mockMembers.find(m => m.id === Number(id));

    if (!member) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Member not found</h2>
                <button
                    onClick={() => navigate('/members')}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    Back to Members
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/members')}
                    className="flex items-center text-primary hover:text-primary/80 transition"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Members
                </button>
            </div>

            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary">
                            {member.avatar}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h1>
                            <div className="flex items-center gap-3 mb-3">
                                {roleIcons[member.role]}
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleColors[member.role]}`}>
                                    {member.role}
                                </span>
                                <div className={`w-3 h-3 rounded-full ${member.status === 'active' ? 'bg-accent' : 'bg-gray-300'}`}></div>
                                <span className="text-sm text-gray-600 capitalize">{member.status}</span>
                            </div>
                            <p className="text-gray-600 max-w-md">{member.bio}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition flex items-center gap-2">
                            <Edit size={16} />
                            Edit Profile
                        </button>
                        <button className="bg-accent/10 text-accent px-4 py-2 rounded-lg hover:bg-accent/20 transition flex items-center gap-2">
                            <MessageCircle size={16} />
                            Send Message
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Contact Information</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-700">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-700">{member.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-700">Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Activity Statistics</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Tasks Completed</span>
                            <span className="text-2xl font-bold text-primary">{member.tasks}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Events Attended</span>
                            <span className="text-2xl font-bold text-primary">{member.events}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Days as Member</span>
                            <span className="text-2xl font-bold text-primary">
                                {Math.floor((new Date() - new Date(member.joinDate)) / (1000 * 60 * 60 * 24))}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    {member.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className={`w-2 h-2 rounded-full ${activity.type === 'task' ? 'bg-accent' : 'bg-secondary'
                                }`}></div>
                            <div className="flex-1">
                                <p className="font-medium">{activity.description}</p>
                                <p className="text-sm text-gray-600">{activity.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 