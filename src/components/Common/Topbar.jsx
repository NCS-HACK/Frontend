import { Bell } from "lucide-react";

export default function Topbar() {
    return (
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
            <div className="font-semibold text-lg text-primary">Welcome to ClubSync!</div>
            <div className="flex items-center gap-4">
                <button className="relative">
                    <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
                    <Bell className="w-6 h-6 text-primary" />
                </button>
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                    U
                </div>
            </div>
        </header>
    );
} 