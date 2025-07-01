import { useNavigate } from "react-router-dom";

export default function InviteMember() {
    const navigate = useNavigate();
    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h1 className="text-2xl font-bold text-primary mb-4">Invite New Member</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input className="w-full border rounded px-3 py-2" placeholder="member@email.com" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select className="w-full border rounded px-3 py-2">
                        <option>Member</option>
                        <option>Coordinator</option>
                        <option>Admin</option>
                    </select>
                </div>
                <div className="flex gap-2 mt-4">
                    <button type="button" onClick={() => navigate(-1)} className="bg-gray-100 px-4 py-2 rounded">Cancel</button>
                    <button type="submit" className="bg-accent text-white px-4 py-2 rounded">Send Invite</button>
                </div>
            </form>
        </div>
    );
} 