import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Image, Archive, File } from "lucide-react";

function getFileIcon(type) {
    switch (type) {
        case 'pdf':
        case 'txt':
            return <FileText className="text-red-500 w-8 h-8" />;
        case 'doc':
        case 'docx':
            return <FileText className="text-blue-500 w-8 h-8" />;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return <Image className="text-green-500 w-8 h-8" />;
        case 'zip':
        case 'rar':
            return <Archive className="text-yellow-500 w-8 h-8" />;
        default:
            return <File className="text-gray-400 w-8 h-8" />;
    }
}

export default function Files() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
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

    // Get unique departments and types for filters
    const departments = Array.from(new Set(files.map(f => f.department))).filter(Boolean);
    const types = Array.from(new Set(files.map(f => f.file_type))).filter(Boolean);

    // Filter and search
    const filteredFiles = files.filter(file => {
        const matchesSearch =
            file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (file.description && file.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesDepartment = departmentFilter === "all" || file.department === departmentFilter;
        const matchesType = typeFilter === "all" || file.file_type === typeFilter;
        return matchesSearch && matchesDepartment && matchesType;
    });

    if (loading) return <div>Loading files...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="text-2xl font-bold text-primary mb-4">Files & Documents</div>
            <div className="mb-6 flex flex-col md:flex-row gap-2 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <input
                    type="text"
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border px-3 py-2 rounded w-full md:w-1/3 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <select
                    value={departmentFilter}
                    onChange={e => setDepartmentFilter(e.target.value)}
                    className="border px-3 py-2 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                        <option key={dept} value={dept}>{dept.charAt(0).toUpperCase() + dept.slice(1)}</option>
                    ))}
                </select>
                <select
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value)}
                    className="border px-3 py-2 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                    <option value="all">All Types</option>
                    {types.map(type => (
                        <option key={type} value={type}>{type.toUpperCase()}</option>
                    ))}
                </select>
            </div>
            {/* Responsive grid for files */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredFiles.map(file => (
                    <div key={file.id} className="bg-white rounded-xl shadow p-4 border border-gray-100 flex flex-col items-center hover:shadow-lg transition cursor-pointer" onClick={() => navigate(`/files/${file.id}`)}>
                        <div className="mb-3">{getFileIcon(file.file_type)}</div>
                        <div className="font-semibold text-lg text-center mb-1 line-clamp-1">{file.name}</div>
                        <div className="text-xs text-gray-500 mb-1">{file.department && file.department.charAt(0).toUpperCase() + file.department.slice(1)}</div>
                        <div className="text-xs text-gray-400 mb-2">{file.file_type && file.file_type.toUpperCase()}</div>
                        <div className="text-xs text-gray-400 mb-2">Uploaded: {new Date(file.uploaded_at).toLocaleDateString()}</div>
                        <div className="flex gap-2 mt-auto">
                            <a
                                href={file.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="bg-accent/10 text-accent px-3 py-1 rounded text-xs font-medium hover:bg-accent/20 transition"
                            >
                                Download
                            </a>
                            <button
                                onClick={e => { e.stopPropagation(); navigate(`/files/${file.id}`); }}
                                className="bg-primary/10 text-primary px-3 py-1 rounded text-xs font-medium hover:bg-primary/20 transition"
                            >
                                Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {filteredFiles.length === 0 && <div className="text-gray-500 mt-4">No files found.</div>}
        </div>
    );
}