import { useParams, useNavigate } from "react-router-dom";

export default function EditMinutes() {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h1 className="text-2xl font-bold text-primary mb-4">Edit Minutes #{id}</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input className="w-full border rounded px-3 py-2" placeholder="Minutes Title" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Content (Markdown Supported)</label>
                    <textarea className="w-full border rounded px-3 py-2 min-h-[200px]" placeholder="Write meeting minutes in markdown..."></textarea>
                </div>
                <div className="flex gap-2 mt-4">
                    <button type="button" onClick={() => navigate(-1)} className="bg-gray-100 px-4 py-2 rounded">Cancel</button>
                    <button type="submit" className="bg-accent text-white px-4 py-2 rounded">Save Changes</button>
                </div>
            </form>
        </div>
    );
} 