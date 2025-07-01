import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FileCategories() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        fetch('http://localhost:8000/files/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch files');
                return res.json();
            })
            .then(data => {
                setFiles(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Group files by department
    const categories = files.reduce((acc, file) => {
        acc[file.department] = (acc[file.department] || 0) + 1;
        return acc;
    }, {});

    if (loading) return <div>Loading categories...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h1 className="text-2xl font-bold text-primary mb-4">File Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(categories).map(([dept, count]) => (
                    <div key={dept} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-accent/10 transition" onClick={() => navigate(`/files/category/${dept}`)}>
                        <span className="font-medium text-lg">{dept.charAt(0).toUpperCase() + dept.slice(1)}</span>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
} 