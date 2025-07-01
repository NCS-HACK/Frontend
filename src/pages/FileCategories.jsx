import { useNavigate } from "react-router-dom";

const categories = [
    { name: "Proposals", count: 4 },
    { name: "Images", count: 12 },
    { name: "Minutes", count: 7 },
    { name: "Budgets", count: 2 },
    { name: "Other", count: 5 }
];

export default function FileCategories() {
    const navigate = useNavigate();
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h1 className="text-2xl font-bold text-primary mb-4">File Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map(cat => (
                    <div key={cat.name} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-accent/10 transition" onClick={() => navigate(`/files/category/${cat.name.toLowerCase()}`)}>
                        <span className="font-medium text-lg">{cat.name}</span>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{cat.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
} 