import React, { useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MapUpdater = ({ coordinates }) => {
    const map = useMap();

    React.useEffect(() => {
        if (coordinates.length > 0) {
            const bounds = L.latLngBounds(coordinates);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [coordinates, map]);

    return null;
};

const dummyPassengers = [
    { name: "Alice", phone: "555-1234", image: "https://randomuser.me/api/portraits/women/1.jpg" },
    { name: "Bob", phone: "555-5678", image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Charlie", phone: "555-9012", image: "https://randomuser.me/api/portraits/men/2.jpg" }
];

export default function Pilot() {
    const [currentLocation, setCurrentLocation] = useState("");
    const [goalLocation, setGoalLocation] = useState("");
    const [vehicleType, setVehicleType] = useState("4-wheeler");
    const [price, setPrice] = useState("");
    const [coordinates, setCoordinates] = useState([]);
    const [error, setError] = useState(null);

    const getCoordinates = async (location) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
            );
            if (!response.ok) throw new Error("Geocoding failed");
            const data = await response.json();
            return data.length > 0 ? [parseFloat(data[0].lat), parseFloat(data[0].lon)] : null;
        } catch (error) {
            console.error("Geocoding error:", error);
            return null;
        }
    };

    const handleSetRoute = async () => {
        if (!currentLocation || !goalLocation || !price) {
            setError("Please fill in all fields.");
            return;
        }

        setError(null);
        setCoordinates([]);

        try {
            const [startCoords, endCoords] = await Promise.all([
                getCoordinates(currentLocation),
                getCoordinates(goalLocation),
            ]);

            if (!startCoords || !endCoords) {
                throw new Error("Could not find coordinates for locations");
            }

            setCoordinates([startCoords, endCoords]);
        } catch (error) {
            console.error("Route error:", error);
            setError(error.message);
        }
    };

    const handleCancel = () => {
        setCurrentLocation("");
        setGoalLocation("");
        setVehicleType("4-wheeler");
        setPrice("");
        setCoordinates([]);
        setError(null);
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black font-inter p-4 space-y-6">
            <div className="flex flex-col lg:flex-row w-full max-w-5xl space-y-6 lg:space-y-0 lg:space-x-6">
                <div className="flex flex-col bg-black p-6 border border-white shadow-lg w-full lg:w-1/2 text-center">
                    <h2 className="text-2xl font-medium text-white mb-6">Set Your Ride</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Current Location"
                            className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                            value={currentLocation}
                            onChange={(e) => setCurrentLocation(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Goal Location"
                            className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                            value={goalLocation}
                            onChange={(e) => setGoalLocation(e.target.value)}
                            required
                        />
                        <div className="flex space-x-4">
                            <select
                                className="w-full px-4 py-3 bg-black border border-white text-white focus:outline-none focus:border-gray-400"
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                            >
                                <option value="4-wheeler">4-Wheeler</option>
                                <option value="3-wheeler">3-Wheeler</option>
                                <option value="2-wheeler">2-Wheeler</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Set Price"
                                className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <button
                            onClick={handleSetRoute}
                            className="w-full px-4 py-3 bg-white text-black font-medium border border-black hover:bg-green-900 hover:text-white transition-colors duration-300"
                        >
                            Set Route
                        </button>
                        <button
                            onClick={handleCancel}
                            className="w-full px-4 py-3 bg-gray-700 text-white font-medium border border-gray-500 hover:bg-red-700 transition-colors duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="mt-6">
                        <Slider {...sliderSettings} className="text-center">
                            {dummyPassengers.map((passenger, index) => (
                                <div key={index} className="p-4 bg-gray-800 text-white text-center border border-gray-600">
                                    <img
                                        src={passenger.image}
                                        alt={passenger.name}
                                        className="w-20 h-20 mx-auto rounded-full mb-2"
                                    />
                                    <div className="text-center mx-auto">
                                        <p className="text-lg font-semibold">Name: {passenger.name}</p>
                                        <p>Phone: {passenger.phone}</p>
                                    </div>
                                    <div className="flex justify-center gap-4 mt-4">
                                        <button className="px-4 py-2 bg-green-500 text-white font-medium border border-gray-500 hover:bg-green-700 transition-colors duration-300">Approve</button>
                                        <button className="px-4 py-2 bg-red-500 text-white font-medium border border-gray-500 hover:bg-red-700 transition-colors duration-300">Reject</button>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 h-[42rem]">
                    <MapContainer center={[37.7749, -122.4194]} zoom={10} className="w-full h-full">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapUpdater coordinates={coordinates} />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}
