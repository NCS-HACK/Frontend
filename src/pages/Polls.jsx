import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Polls() {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        fetch('http://localhost:8000/polls/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch polls');
                return res.json();
            })
            .then(data => {
                setPolls(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading polls...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="text-2xl font-bold text-primary mb-4">Polls & Voting</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {polls.length === 0 && <div className="text-gray-500">No polls available.</div>}
                {polls.map(poll => (
                    <div key={poll.id} className="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col justify-between">
                        <div>
                            <div className="font-semibold text-lg mb-2 line-clamp-2">{poll.question}</div>
                            <div className="text-sm text-gray-500 mb-2 line-clamp-2">{poll.description}</div>
                            <div className="text-xs mb-2">
                                Status: {poll.is_active ? <span className="text-green-600 font-medium">Active</span> : <span className="text-gray-400">Closed</span>}
                            </div>
                            <div className="text-xs text-gray-400 mb-2">Created: {new Date(poll.created_at).toLocaleDateString()}</div>
                        </div>
                        <button
                            className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
                            onClick={() => navigate(`/polls/${poll.id}`)}
                        >
                            View & Vote
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
} 