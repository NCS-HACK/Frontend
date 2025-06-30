import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Users, MessageCircle, Share2, Edit, Download } from "lucide-react";

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
        description: "Regular weekly team sync to discuss progress and upcoming tasks. We'll review the current sprint, address any blockers, and plan for the next week's activities.",
        agenda: [
            "Review last week's accomplishments",
            "Discuss current project status",
            "Address team concerns and blockers",
            "Plan next week's priorities",
            "Open discussion and feedback"
        ],
        attendeesList: [
            { name: "Alex Johnson", role: "Admin", rsvp: "confirmed" },
            { name: "Sarah Williams", role: "Coordinator", rsvp: "confirmed" },
            { name: "Mike Chen", role: "Member", rsvp: "confirmed" },
            { name: "Emily Davis", role: "Member", rsvp: "pending" },
            { name: "David Wilson", role: "Member", rsvp: "declined" }
        ],
        materials: [
            { name: "Meeting Agenda", type: "pdf", size: "245 KB" },
            { name: "Project Timeline", type: "xlsx", size: "1.2 MB" },
            { name: "Budget Report", type: "pdf", size: "890 KB" }
        ],
        notes: "Please bring your laptops for the presentation. Coffee and snacks will be provided."
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
        description: "Monthly social gathering for all club members to network and relax. This is a great opportunity to meet new members and strengthen existing relationships.",
        agenda: [
            "Welcome and introductions",
            "Networking activities",
            "Group games and icebreakers",
            "Dinner and refreshments",
            "Open social time"
        ],
        attendeesList: [
            { name: "Alex Johnson", role: "Admin", rsvp: "confirmed" },
            { name: "Sarah Williams", role: "Coordinator", rsvp: "confirmed" },
            { name: "Mike Chen", role: "Member", rsvp: "confirmed" },
            { name: "Emily Davis", role: "Member", rsvp: "confirmed" },
            { name: "David Wilson", role: "Member", rsvp: "confirmed" }
        ],
        materials: [
            { name: "Event Flyer", type: "pdf", size: "1.5 MB" },
            { name: "Guest List", type: "xlsx", size: "320 KB" }
        ],
        notes: "Casual dress code. Please RSVP by Friday to help with catering arrangements."
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
        description: "Interactive workshop focused on developing leadership and communication skills. Learn practical techniques for effective team management and decision-making.",
        agenda: [
            "Introduction to leadership principles",
            "Communication techniques workshop",
            "Team building exercises",
            "Case study analysis",
            "Action planning and next steps"
        ],
        attendeesList: [
            { name: "Alex Johnson", role: "Admin", rsvp: "confirmed" },
            { name: "Sarah Williams", role: "Coordinator", rsvp: "confirmed" },
            { name: "Mike Chen", role: "Member", rsvp: "confirmed" },
            { name: "Emily Davis", role: "Member", rsvp: "confirmed" }
        ],
        materials: [
            { name: "Workshop Manual", type: "pdf", size: "2.1 MB" },
            { name: "Leadership Assessment", type: "docx", size: "450 KB" },
            { name: "Case Studies", type: "pdf", size: "1.8 MB" }
        ],
        notes: "Please complete the pre-workshop assessment before attending. Bring a notebook for taking notes."
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

const rsvpStatusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    declined: "bg-red-100 text-red-800"
};

export default function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = mockEvents.find(e => e.id === Number(id));

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
                        <span className="text-4xl">{eventTypeIcons[event.type]}</span>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${eventTypeColors[event.type]}`}>
                                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                </span>
                                <div className={`w-3 h-3 rounded-full ${event.status === 'upcoming' ? 'bg-accent' : 'bg-gray-300'}`}></div>
                                <span className="text-sm text-gray-600 capitalize">{event.status}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition flex items-center gap-2">
                            <Edit size={16} />
                            Edit Event
                        </button>
                        <button className="bg-accent/10 text-accent px-4 py-2 rounded-lg hover:bg-accent/20 transition flex items-center gap-2">
                            <Share2 size={16} />
                            Share
                        </button>
                    </div>
                </div>

                <p className="text-gray-600 text-lg mb-6">{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Date</p>
                            <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Time</p>
                            <p className="font-medium">{event.time} ({event.duration})</p>
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
                            <p className="text-sm text-gray-600">Attendees</p>
                            <p className="font-medium">{event.attendees}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Agenda */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Agenda</h3>
                    <div className="space-y-3">
                        {event.agenda.map((item, index) => (
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
                        {event.attendeesList.map((attendee, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium">{attendee.name}</p>
                                    <p className="text-sm text-gray-600">{attendee.role}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${rsvpStatusColors[attendee.rsvp]}`}>
                                    {attendee.rsvp}
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
                    {event.materials.map((material, index) => (
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