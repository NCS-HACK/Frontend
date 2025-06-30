import { useState } from "react";
import { Calendar, Plus, Clock, MapPin, Users, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockEvents = [
    {
        id: 1,
        title: "Weekly Team Meeting",
        date: "2024-01-15",
        time: "14:00",
        duration: "1 hour",
        location: "Conference Room A",
        attendees: 12,
        type: "meeting",
        status: "upcoming",
        description: "Regular weekly team sync to discuss progress and upcoming tasks."
    },
    {
        id: 2,
        title: "Club Social Event",
        date: "2024-01-20",
        time: "18:00",
        duration: "3 hours",
        location: "Community Center",
        attendees: 25,
        type: "social",
        status: "upcoming",
        description: "Monthly social gathering for all club members to network and relax."
    },
    {
        id: 3,
        title: "Workshop: Leadership Skills",
        date: "2024-01-25",
        time: "10:00",
        duration: "4 hours",
        location: "Training Room B",
        attendees: 15,
        type: "workshop",
        status: "upcoming",
        description: "Interactive workshop focused on developing leadership and communication skills."
    },
    {
        id: 4,
        title: "Board Meeting",
        date: "2024-01-10",
        time: "16:00",
        duration: "2 hours",
        location: "Board Room",
        attendees: 8,
        type: "meeting",
        status: "completed",
        description: "Monthly board meeting to review club finances and strategic planning."
    }
];

const eventTypeColors = {
    meeting: "bg-blue-100 text-blue-800",
    social: "bg-green-100 text-green-800",
    workshop: "bg-purple-100 text-purple-800"
};

const eventTypeIcons = {
    meeting: "📅",
    social: "🎉",
    workshop: "📚"
};

export default function Events() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const navigate = useNavigate();

    const filteredEvents = mockEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "all" || event.type === typeFilter;
        const matchesStatus = statusFilter === "all" || event.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    const upcomingEvents = filteredEvents.filter(event => event.status === "upcoming");
    const pastEvents = filteredEvents.filter(event => event.status === "completed");

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Events & Meetings</h1>
                    <p className="text-text/70">Schedule and manage club events, meetings, and activities</p>
                </div>
                <button className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-accent/90 transition">
                    <Plus size={20} />
                    Create Event
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="all">All Types</option>
                            <option value="meeting">Meeting</option>
                            <option value="social">Social</option>
                            <option value="workshop">Workshop</option>
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="all">All Events</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="completed">Past</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-4">Upcoming Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{eventTypeIcons[event.type]}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${eventTypeColors[event.type]}`}>
                                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                            </span>
                                        </div>
                                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                                    </div>

                                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                                    <p className="text-sm text-text/70 mb-4">{event.description}</p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <Calendar size={16} />
                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <Clock size={16} />
                                            <span>{event.time} ({event.duration})</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <MapPin size={16} />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <Users size={16} />
                                            <span>{event.attendees} attendees</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate(`/events/${event.id}`)}
                                            className="flex-1 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition">
                                            View Details
                                        </button>
                                        <button className="flex-1 bg-accent/10 text-accent px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent/20 transition">
                                            RSVP
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-4">Past Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pastEvents.map((event) => (
                            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden opacity-75">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{eventTypeIcons[event.type]}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${eventTypeColors[event.type]}`}>
                                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                            </span>
                                        </div>
                                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    </div>

                                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                                    <p className="text-sm text-text/70 mb-4">{event.description}</p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <Calendar size={16} />
                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <Clock size={16} />
                                            <span>{event.time} ({event.duration})</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <MapPin size={16} />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <Users size={16} />
                                            <span>{event.attendees} attendees</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium">
                                            View Summary
                                        </button>
                                        <button className="flex-1 bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium">
                                            Minutes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
} 