import { NavLink } from "react-router-dom";
import { Users, Calendar, ClipboardList, FileText, Archive, BarChart2, Bell, Vote } from "lucide-react";

const navItems = [
    { name: "Dashboard", path: "/", icon: <BarChart2 /> },
    { name: "Members", path: "/members", icon: <Users /> },
    { name: "Events", path: "/events", icon: <Calendar /> },
    { name: "Tasks", path: "/tasks", icon: <ClipboardList /> },
    { name: "Minutes", path: "/minutes", icon: <FileText /> },
    { name: "Files", path: "/files", icon: <Archive /> },
    { name: "Polls", path: "/polls", icon: <Vote /> },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-primary text-white flex flex-col">
            <div className="h-20 flex items-center justify-center font-bold text-2xl tracking-wide">
                <span className="text-accent">Club</span>Sync
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-indigo-900" : "hover:bg-indigo-800"
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
} 