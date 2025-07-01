import { Calendar, Users, ClipboardList, TrendingUp, Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
                    <p className="text-text/70">Welcome back! Here's what's happening with your club.</p>
                </div>
                {/* <button className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-accent/90 transition">
                    <Plus size={20} />
                    Quick Action
                </button> */}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-text/60">Total Members</p>
                            <p className="text-2xl font-bold text-primary">24</p>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <TrendingUp className="w-4 h-4 text-accent mr-1" />
                        <span className="text-accent">+12%</span>
                        <span className="text-text/60 ml-1">from last month</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-text/60">Upcoming Events</p>
                            <p className="text-2xl font-bold text-primary">5</p>
                        </div>
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-secondary" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-text/60">Next: Team Meeting</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-text/60">Active Tasks</p>
                            <p className="text-2xl font-bold text-primary">18</p>
                        </div>
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                            <ClipboardList className="w-6 h-6 text-accent" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-text/60">8 due this week</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-text/60">Notifications</p>
                            <p className="text-2xl font-bold text-primary">3</p>
                        </div>
                        <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                            <Bell className="w-6 h-6 text-error" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-text/60">2 new messages</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-primary mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button
                            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                            onClick={() => navigate('/events/create')}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">Schedule Meeting</p>
                                    <p className="text-sm text-text/60">Create a new event or meeting</p>
                                </div>
                            </div>
                        </button>
                        <button
                            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                        // No action for Add Member
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                                    <Users className="w-4 h-4 text-accent" />
                                </div>
                                <div>
                                    <p className="font-medium">Add Member</p>
                                    <p className="text-sm text-text/60">Invite someone to the club</p>
                                </div>
                            </div>
                        </button>
                        <button
                            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                            onClick={() => navigate('/tasks/create')}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                                    <ClipboardList className="w-4 h-4 text-secondary" />
                                </div>
                                <div>
                                    <p className="font-medium">Create Task</p>
                                    <p className="text-sm text-text/60">Assign a new responsibility</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-primary mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                            <div>
                                <p className="font-medium">New member joined</p>
                                <p className="text-sm text-text/60">Sarah Johnson joined the club</p>
                                <p className="text-xs text-text/40">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                            <div>
                                <p className="font-medium">Meeting scheduled</p>
                                <p className="text-sm text-text/60">Weekly team meeting for Friday</p>
                                <p className="text-xs text-text/40">1 day ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                            <div>
                                <p className="font-medium">Task completed</p>
                                <p className="text-sm text-text/60">Event planning finished</p>
                                <p className="text-xs text-text/40">2 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 