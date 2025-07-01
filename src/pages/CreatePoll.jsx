import { useNavigate } from "react-router-dom";

export default function CreatePoll() {
    const navigate = useNavigate();
    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h1 className="text-2xl font-bold text-primary mb-4">Create New Poll</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Poll Question</label>
                    <input className="w-full border rounded px-3 py-2" placeholder="What do you want to ask?" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Options</label>
                    <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Option 1" />
                    <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Option 2" />
                    <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Option 3" />
                </div>
                <div className="flex gap-2 mt-4">
                    <button type="button" onClick={() => navigate(-1)} className="bg-gray-100 px-4 py-2 rounded">Cancel</button>
                    <button type="submit" className="bg-accent text-white px-4 py-2 rounded">Create Poll</button>
                </div>
            </form>
        </div>
    );
} 