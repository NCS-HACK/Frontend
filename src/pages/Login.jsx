import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Example credentials
    const exampleEmail = "member@example.com";
    const examplePassword = "password123";

    const handleSubmit = async (e) => {
        console.log(email, password);
        e.preventDefault();
        setLoading(true);
        setError("");
        try {

            const response = await fetch("http://localhost:8000/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok && data.access && data.refresh) {
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("refresh_token", data.refresh);
                console.log("login successfull");
                console.log("sikomk");
                
                navigate("/");
                
            } else {
                setError(data.detail || "Login failed. Please check your credentials.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary to-secondary">
            <div className="w-full max-w-md">
                <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6 text-sm text-blue-800">
                    <div className="font-semibold mb-1">Example Credentials</div>
                    <div>Email: <span className="font-mono">{exampleEmail}</span></div>
                    <div>Password: <span className="font-mono">{examplePassword}</span></div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-lg shadow-lg w-full"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-primary">ClubSync Login</h2>
                    {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            autoComplete="email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login; 