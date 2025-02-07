import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PassengerRegister() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { name, email, phone, password, confirmPassword } = formData;

        // Basic validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            toast.error("All fields are required");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/passenger/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                navigate("/passenger-login"); // Redirect to login page after successful registration
            } else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error("Error connecting to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black font-inter">
            <div className="bg-black p-10 border border-white shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-medium text-white mb-6">Passenger Register</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Username"
                        className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        placeholder="Phone"
                        className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password"
                        className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        placeholder="Confirm Password"
                        className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-3 bg-white text-black font-medium border border-black hover:bg-green-900 hover:text-white transition-colors duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    <Link to="/passenger-login">
                        <p className='text-white text-left'>Already have an account? <span className='text-green-600'>Login</span></p>
                    </Link>
                </form>
            </div>
        </div>
    );
}
