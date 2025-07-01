import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, Users, MessageCircle, Share2, Edit, Download } from "lucide-react";

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

const rsvpStatusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    declined: "bg-red-100 text-red-800"
};

export default function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:8000/events/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch event");
                return res.json();
            })
            .then((data) => {
                setEvent(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        setDeleteError(null);
        const token = localStorage.getItem('access_token');
        try {
            const res = await fetch(`http://localhost:8000/events/${id}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error('Failed to delete event');
            navigate('/events');
        } catch (err) {
            setDeleteError(err.message);
        }
    };

    if (loading) return <div>Loading event details...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!event) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
                <button
                    onClick={() => navigate('/events')}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    Back to Events
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/events')}
                    className="flex items-center text-primary hover:text-primary/80 transition"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Events
                </button>
            </div>

            {/* Event Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">{eventTypeIcons[event.event_type]}</span>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${eventTypeColors[event.event_type]}`}>
                                    {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
                                </span>
                                <div className={`w-3 h-3 rounded-full ${event.status === 'upcoming' ? 'bg-accent' : 'bg-gray-300'}`}></div>
                                <span className="text-sm text-gray-600 capitalize">{event.status}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition flex items-center gap-2" onClick={() => navigate(`/events/${id}/edit`)}>
                            <Edit size={16} />
                            Edit Event
                        </button>
                        {/* <button className="bg-accent/10 text-accent px-4 py-2 rounded-lg hover:bg-accent/20 transition flex items-center gap-2">
                            <Share2 size={16} />
                            Share
                        </button> */}
                        <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition flex items-center gap-2" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
                {deleteError && <div className="text-red-500 text-sm mb-2">{deleteError}</div>}

                <p className="text-gray-600 text-lg mb-6">{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Start</p>
                            <p className="font-medium">{new Date(event.start_time).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">End</p>
                            <p className="font-medium">{new Date(event.end_time).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Location</p>
                            <p className="font-medium">{event.location}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Participants</p>
                            <p className="font-medium">{event.participants.length}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-sm text-gray-600">Department: <span className="font-medium">{event.department}</span></p>
                    <p className="text-sm text-gray-600">Mandatory: <span className="font-medium">{event.is_mandatory ? 'Yes' : 'No'}</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Agenda */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Agenda</h3>
                    <div className="space-y-3">
                        {(event.agenda || []).map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                                    {index + 1}
                                </div>
                                <p className="text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Attendees */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Attendees</h3>
                    <div className="space-y-3">
                        {(event.participants || []).map((participant, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium">{participant.name}</p>
                                    <p className="text-sm text-gray-600">{participant.role}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${rsvpStatusColors[participant.rsvp]}`}>
                                    {participant.rsvp}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Materials */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Event Materials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(event.materials || []).map((material, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <p className="font-medium">{material.name}</p>
                                <p className="text-sm text-gray-600">{material.size}</p>
                            </div>
                            <button className="bg-accent/10 text-accent p-2 rounded-lg hover:bg-accent/20 transition">
                                <Download size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Additional Notes</h3>
                <p className="text-gray-700">{event.notes}</p>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition flex items-center justify-center gap-2">
                        <MessageCircle size={20} />
                        RSVP to Event
                    </button>
                    <button className="flex-1 bg-primary/10 text-primary px-6 py-3 rounded-lg hover:bg-primary/20 transition flex items-center justify-center gap-2">
                        <Calendar size={20} />
                        Add to Calendar
                    </button>
                </div>
            </div>
        </div>
    );
} 