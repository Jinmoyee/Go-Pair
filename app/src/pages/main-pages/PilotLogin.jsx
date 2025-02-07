import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function PilotLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (username === 'admin@gmail.com' && password === 'admin123') {
                localStorage.setItem('adminKey', 'admin');
                navigate('/admin-panel');
                return;
            }

            const response = await fetch(`http://localhost:5000/api/pilot/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password: password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred while logging in.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black font-inter">
            <div className="bg-black p-10 border border-white shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-medium text-white mb-6">Pilot Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Email"
                        className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button
                        type="submit"
                        className="w-full px-4 py-3 bg-white text-black font-medium border border-black hover:bg-green-900 hover:text-white transition-colors duration-300"
                    >
                        Login
                    </button>
                    <Link to="/pilot-register">
                        <p className='text-white text-left'>Don't have an account? <span className='text-green-600'>Register</span></p>
                    </Link>
                </form>
            </div>
        </div>
    );
}
