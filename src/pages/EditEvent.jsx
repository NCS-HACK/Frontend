import { useParams, useNavigate } from "react-router-dom";

export default function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h1 className="text-2xl font-bold text-primary mb-4">Edit Event #{id}</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input className="w-full border rounded px-3 py-2" placeholder="Event Title" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input type="date" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Time</label>
                    <input type="time" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input className="w-full border rounded px-3 py-2" placeholder="Location" />
                </div>
                <div className="flex gap-2 mt-4">
                    <button type="button" onClick={() => navigate(-1)} className="bg-gray-100 px-4 py-2 rounded">Cancel</button>
                    <button type="submit" className="bg-accent text-white px-4 py-2 rounded">Save Changes</button>
                </div>
            </form>
        </div>
    );
} 