import React, { useEffect, useState } from 'react';

export default function AdminPanel() {
    const [pilots, setPilots] = useState([]);
    const [passengers, setPassengers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pilotResponse = await fetch('http://localhost:5000/api/pilot/getAll');
                const passengerResponse = await fetch('http://localhost:5000/api/passenger/getAll');

                if (!pilotResponse.ok || !passengerResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const pilotData = await pilotResponse.json();
                const passengerData = await passengerResponse.json();

                setPilots(pilotData);
                setPassengers(passengerData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center text-xl font-semibold">Loading...</div>;
    if (error) return <div className="text-center text-red-500 font-semibold">Error: {error}</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>

            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4">Pilots</h2>
                <ul className="space-y-4">
                    {pilots.map((pilot) => (
                        <li key={pilot._id} className="p-4 bg-white shadow-lg rounded-md">
                            <div><span className="font-medium">Name:</span> {pilot.name}</div>
                            <div><span className="font-medium">Email:</span> {pilot.email}</div>
                            <div><span className="font-medium">Phone:</span> {pilot.phone}</div>
                            <div><span className="font-medium">Vehicle Number:</span> {pilot.vehicleNumber}</div>
                            <div><span className="font-medium">Vehicle Seat:</span> {pilot.vehicleSeat}</div>
                            <div><span className="font-medium">Identity:</span> {pilot.identity}</div>
                            <div><span className="font-medium">Created At:</span> {new Date(pilot.createdAt).toLocaleString()}</div>
                            <div><span className="font-medium">Updated At:</span> {new Date(pilot.updatedAt).toLocaleString()}</div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Passengers</h2>
                <ul className="space-y-4">
                    {passengers.map((passenger) => (
                        <li key={passenger._id} className="p-4 bg-white shadow-lg rounded-md">
                            <div><span className="font-medium">Name:</span> {passenger.name}</div>
                            <div><span className="font-medium">Email:</span> {passenger.email}</div>
                            <div><span className="font-medium">Phone:</span> {passenger.phone}</div>
                            <div><span className="font-medium">Identity:</span> {passenger.identity}</div>
                            <div><span className="font-medium">Created At:</span> {new Date(passenger.createdAt).toLocaleString()}</div>
                            <div><span className="font-medium">Updated At:</span> {new Date(passenger.updatedAt).toLocaleString()}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
