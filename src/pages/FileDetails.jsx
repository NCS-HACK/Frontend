import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FileText, Image, Archive, File } from "lucide-react";

export default function FileDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:8000/files/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('File not found');
                return res.json();
            })
            .then(data => {
                setFile(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!file) return <div>File not found</div>;

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h1 className="text-2xl font-bold text-primary mb-4">{file.name}</h1>
            <div className="mb-2">Department: <span className="font-medium">{file.department}</span></div>
            <div className="mb-2">Type: <span className="font-medium">{file.file_type}</span></div>
            <div className="mb-2">Uploaded At: <span className="font-medium">{new Date(file.uploaded_at).toLocaleString()}</span></div>
            <div className="mb-2">Description: <span className="font-medium">{file.description}</span></div>
            <div className="mb-2">Public: <span className="font-medium">{file.is_public ? 'Yes' : 'No'}</span></div>
            <div className="mb-2">Uploaded By (User ID): <span className="font-medium">{file.uploaded_by}</span></div>
            <a href={file.file} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-accent text-white px-4 py-2 rounded hover:bg-accent/90 transition">Download</a>
            <button onClick={() => navigate(-1)} className="ml-4 bg-gray-100 px-4 py-2 rounded">Back</button>
        </div>
    );
}

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