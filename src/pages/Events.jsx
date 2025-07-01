import { useState, useEffect } from "react";
import { Calendar, Plus, Clock, MapPin, Users, Search, Filter, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const eventTypeColors = {
    meeting: "bg-blue-100 text-blue-800",
    competition: "bg-green-100 text-green-800",
    workshop: "bg-purple-100 text-purple-800",
    social: "bg-yellow-100 text-yellow-800"
};

const eventTypeIcons = {
    meeting: "📅",
    competition: "🏆",
    workshop: "📚",
    social: "🎉"
};

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        fetch("http://localhost:8000/events/", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch events");
                return res.json();
            })
            .then((data) => {
                setEvents(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Map API data to expected fields for rendering
    const mappedEvents = events.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        event_type: event.event_type,
        start_time: event.start_time,
        end_time: event.end_time,
        location: event.location,
        department: event.department,
        is_mandatory: event.is_mandatory,
        status: event.status,
        event_photo: event.event_photo,
        created_at: event.created_at,
        participants: event.participants || []
    }));

    const filteredEvents = mappedEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "all" || event.event_type === typeFilter;
        const matchesStatus = statusFilter === "all" || event.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
    });

    const upcomingEvents = filteredEvents.filter(event => event.status === "upcoming");
    const pastEvents = filteredEvents.filter(event => event.status === "completed");

    if (loading) return <div>Loading events...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Events & Meetings</h1>
                    <p className="text-text/70">Schedule and manage club events, meetings, and activities</p>
                </div>
                <button type="button" onClick={() => navigate('/events/create')} className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-accent/90 transition">
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
                            <option value="competition">Competition</option>
                            <option value="workshop">Workshop</option>
                            <option value="social">Social</option>
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
                                            <span className="text-2xl">{eventTypeIcons[event.event_type]}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${eventTypeColors[event.event_type]}`}>
                                                {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
                                            </span>
                                        </div>
                                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                                    <p className="text-sm text-text/70 mb-4">{event.description}</p>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <Calendar size={16} />
                                            <span>{new Date(event.start_time).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <Clock size={16} />
                                            <span>{new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <MapPin size={16} />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <Users size={16} />
                                            <span>{event.participants.length} attendees</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => navigate(`/events/${event.id}`)}
                                            className="flex-1 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition">
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => navigate(`/events/${event.id}/edit`)}
                                            className="flex-1 bg-secondary/10 text-secondary px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary/20 transition flex items-center gap-1">
                                            <Edit size={16} /> Edit
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
                            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{eventTypeIcons[event.event_type]}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${eventTypeColors[event.event_type]}`}>
                                                {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
                                            </span>
                                        </div>
                                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                                    <p className="text-sm text-text/70 mb-4">{event.description}</p>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <Calendar size={16} />
                                            <span>{new Date(event.start_time).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <Clock size={16} />
                                            <span>{new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <MapPin size={16} />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text/70">
                                            <Users size={16} />
                                            <span>{event.participants.length} attendees</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => navigate(`/events/${event.id}`)}
                                            className="flex-1 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition">
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => navigate(`/events/${event.id}/edit`)}
                                            className="flex-1 bg-secondary/10 text-secondary px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary/20 transition flex items-center gap-1">
                                            <Edit size={16} /> Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 