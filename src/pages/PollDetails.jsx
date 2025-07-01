import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function PollDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [poll, setPoll] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [voting, setVoting] = useState(false);
    const [voted, setVoted] = useState(false);
    const [voteError, setVoteError] = useState(null);
    const [results, setResults] = useState(null);
    const [userId, setUserId] = useState(null);

    // DEBUG: Render check
    console.log('PollDetails component rendered, id:', id);

    // Helper to decode JWT and get user id
    function parseJwt(token) {
        if (!token) return null;
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }

    useEffect(() => {
        console.log('useEffect running for poll id:', id);
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('access_token');
        const payload = parseJwt(token);
        setUserId(payload ? payload.user_id : null);
        fetch(`http://localhost:8000/polls/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log('API response status:', res.status);
                if (!res.ok) throw new Error('Failed to fetch poll');
                return res.json();
            })
            .then(pollObj => {
                console.log('Poll API response:', pollObj);
                setPoll(pollObj);
                // Check if user has voted
                const userVote = pollObj.votes && pollObj.votes.find(v => v.user === payload.user_id);
                if (userVote) {
                    setVoted(true);
                    setSelectedChoice(userVote.choice);
                }
                // Prepare results
                if (pollObj.choices) {
                    const totalVotes = pollObj.choices.reduce((sum, c) => sum + (c.votes ? c.votes.length : 0), 0);
                    setResults({
                        totalVotes,
                        choices: pollObj.choices.map(c => ({
                            id: c.id,
                            text: c.text,
                            count: c.votes ? c.votes.length : 0,
                            percent: totalVotes ? Math.round((c.votes ? c.votes.length : 0) * 100 / totalVotes) : 0
                        }))
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.log('Poll fetch error:', err);
                setError(err.message);
                setLoading(false);
            });
    }, [id, voted]);

    const handleVote = async (e) => {
        e.preventDefault();
        if (!selectedChoice) return;
        setVoting(true);
        setVoteError(null);
        const token = localStorage.getItem('access_token');
        try {
            console.log('Voting for choice:', selectedChoice);
            const res = await fetch(`http://localhost:8000/polls/${id}/vote/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ poll: poll.id, choice: selectedChoice })
            });
            if (!res.ok) {
                const data = await res.json();
                console.log('Vote error:', data);
                throw new Error(data.detail || 'Failed to vote');
            }
            setVoted(true);
        } catch (err) {
            setVoteError(err.message);
        } finally {
            setVoting(false);
        }
    };

    // Prepare static results for demo
    const staticResults = poll && poll.choices ? {
        totalVotes: 1,
        choices: poll.choices.map((c, i) => ({
            id: c.id,
            text: c.text,
            count: i === 0 ? 1 : 0,
            percent: i === 0 ? 100 : 0
        }))
    } : null;

    if (loading) return <div>Loading poll...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!poll) return <div>Poll not found</div>;

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-primary mb-4">
                <ArrowLeft className="mr-2" /> Back
            </button>
            <h1 className="text-2xl font-bold text-primary mb-4">{poll.question}</h1>
            <div className="mb-4 text-gray-600">{poll.description}</div>
            <div className="mb-4 text-xs text-gray-400">Created: {new Date(poll.created_at).toLocaleString()}</div>
            <div className="mb-4 text-xs">
                Status: {poll.is_active ? <span className="text-green-600 font-medium">Active</span> : <span className="text-gray-400">Closed</span>}
            </div>
            {/* Voting or Results */}
            {(!voted && poll.is_active && poll.allowed_users && poll.allowed_users.includes(userId)) ? (
                <form onSubmit={handleVote} className="space-y-4">
                    <div className="space-y-2">
                        {poll.choices && poll.choices.map(choice => (
                            <div key={choice.id} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="vote"
                                    value={choice.id}
                                    checked={String(selectedChoice) === String(choice.id)}
                                    onChange={() => setSelectedChoice(choice.id)}
                                    disabled={voting}
                                />
                                <span>{choice.text}</span>
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-accent text-white px-4 py-2 rounded disabled:opacity-60"
                        disabled={voting || !selectedChoice}
                    >
                        {voting ? 'Voting...' : 'Vote'}
                    </button>
                    {voteError && <div className="text-red-500 text-sm mt-2">{voteError}</div>}
                </form>
            ) : (
                <div className="prose max-w-none">
                    <h2 className="text-lg font-semibold mb-2">Results</h2>
                    {staticResults && staticResults.choices.map(choice => (
                        <div key={choice.id} className="mb-2">
                            <div className="flex justify-between items-center">
                                <span>{choice.text}</span>
                                <span className="text-xs text-gray-500">{choice.count} vote{choice.count !== 1 ? 's' : ''} ({choice.percent}%)</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded h-2 mt-1">
                                <div
                                    className="bg-primary h-2 rounded"
                                    style={{ width: `${choice.percent}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                    <div className="text-xs text-gray-400 mt-2">Total votes: 1</div>
                </div>
            )}
            {(!poll.is_active || !(poll.allowed_users && poll.allowed_users.includes(userId))) && !voted && (
                <div className="text-red-500 text-sm mt-4">You are not allowed to vote in this poll.</div>
            )}
        </div>
    );
}