import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PollDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-primary mb-4">
                <ArrowLeft className="mr-2" /> Back
            </button>
            <h1 className="text-2xl font-bold text-primary mb-4">Poll Details #{id}</h1>
            <div className="mb-4">
                <div className="font-medium mb-2">Sample poll question goes here?</div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <input type="radio" name="vote" /> <span>Option 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="radio" name="vote" /> <span>Option 2</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="radio" name="vote" /> <span>Option 3</span>
                    </div>
                </div>
                <button className="mt-4 bg-accent text-white px-4 py-2 rounded">Vote</button>
            </div>
            <div className="prose max-w-none">
                <h2>Results</h2>
                <ul>
                    <li>Option 1: 10 votes</li>
                    <li>Option 2: 5 votes</li>
                    <li>Option 3: 2 votes</li>
                </ul>
            </div>
        </div>
    );
} 