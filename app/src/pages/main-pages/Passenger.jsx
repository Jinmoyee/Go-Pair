import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MapUpdater = ({ coordinates }) => {
    const map = useMap();

    useEffect(() => {
        if (coordinates.length > 0) {
            const bounds = L.latLngBounds(coordinates);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [coordinates, map]);

    return null;
};

const dummyVehicles = [
    { driver: "John Doe", phone: "123-456-7890", car: "ABC-1234", image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { driver: "Jane Smith", phone: "987-654-3210", car: "XYZ-5678", image: "https://randomuser.me/api/portraits/women/2.jpg" },
    { driver: "Mike Johnson", phone: "456-789-0123", car: "LMN-9101", image: "https://randomuser.me/api/portraits/men/3.jpg" }
];

export default function Passenger() {
    const [currentLocation, setCurrentLocation] = useState("");
    const [goalLocation, setGoalLocation] = useState("");
    const [coordinates, setCoordinates] = useState([]);
    const [duration, setDuration] = useState(null);
    const [error, setError] = useState(null);
    const [locationSuggestions, setLocationSuggestions] = useState([]);

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

    const handleFindVehicles = async () => {
        if (!currentLocation || !goalLocation) {
            setError("Please fill in both locations.");
            return;
        }

        setError(null);
        setCoordinates([]);
        setDuration(null);

        try {
            const [startCoords, endCoords] = await Promise.all([
                getCoordinates(currentLocation),
                getCoordinates(goalLocation),
            ]);

            if (!startCoords || !endCoords) {
                throw new Error("Could not find coordinates for locations");
            }

            setCoordinates([startCoords, endCoords]);

            const response = await fetch(
                `https://router.project-osrm.org/route/v1/driving/` +
                `${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?overview=full&geometries=geojson`
            );

            if (!response.ok) throw new Error("Route calculation failed");

            const routeData = await response.json();
            const coords = routeData.routes[0].geometry.coordinates.map(
                (coord) => [coord[1], coord[0]]
            );
            const time = Math.round(routeData.routes[0].duration / 60);
            setCoordinates(coords);
            setDuration(`${time} min`);
        } catch (error) {
            console.error("Route error:", error);
            setError(error.message);
        }
    };

    const handleCancel = () => {
        setCurrentLocation("");
        setGoalLocation("");
        setCoordinates([]);
        setDuration(null);
        setError(null);
        setLocationSuggestions([]); // Clear suggestions on cancel
    };

    const handleLocationChange = async (e, type) => {
        const value = e.target.value;
        if (type === "currentLocation") setCurrentLocation(value);
        if (type === "goalLocation") setGoalLocation(value);

        if (value.length > 2) {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`
                );
                const data = await response.json();
                setLocationSuggestions(data); // Store suggestions
            } catch (error) {
                console.error("Error fetching location suggestions:", error);
            }
        } else {
            setLocationSuggestions([]); // Clear suggestions if input is too short
        }
    };

    const handleSelectLocation = (location, type) => {
        if (type === "currentLocation") setCurrentLocation(location);
        if (type === "goalLocation") setGoalLocation(location);
        setLocationSuggestions([]); // Clear suggestions after selection
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
                    <h2 className="text-2xl font-medium text-white mb-6">Find a Vehicle</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Current Location"
                            className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                            value={currentLocation}
                            onChange={(e) => handleLocationChange(e, "currentLocation")}
                            required
                        />
                        {locationSuggestions.length > 0 && (
                            <ul className="bg-white text-black max-h-32 overflow-y-scroll border border-gray-600 rounded-md mt-2">
                                {locationSuggestions.map((location, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSelectLocation(location.display_name, "currentLocation")}
                                        className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
                                    >
                                        {location.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <input
                            type="text"
                            placeholder="Goal Location"
                            className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                            value={goalLocation}
                            onChange={(e) => handleLocationChange(e, "goalLocation")}
                            required
                        />
                        {locationSuggestions.length > 0 && (
                            <ul className="bg-white text-black max-h-32 overflow-y-scroll border border-gray-600 rounded-md mt-2">
                                {locationSuggestions.map((location, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSelectLocation(location.display_name, "goalLocation")}
                                        className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
                                    >
                                        {location.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        {duration && <div className="text-green-500 text-sm">Estimated Time: {duration}</div>}
                        <button onClick={handleFindVehicles} className="w-full px-4 py-3 bg-white text-black font-medium border border-black hover:bg-green-900 hover:text-white transition-colors duration-300">Find Vehicles</button>
                        <button onClick={handleCancel} className="w-full px-4 py-3 bg-gray-700 text-white font-medium border border-gray-500 hover:bg-red-700 transition-colors duration-300">Cancel</button>
                    </div>
                    <div className="mt-6">
                        <Slider {...sliderSettings} className="text-center">
                            {dummyVehicles.map((vehicle, index) => (
                                <div key={index} className="p-4 bg-gray-800 text-white text-center border border-gray-600">
                                    <img src={vehicle.image} alt={vehicle.driver} className="w-20 h-20 mx-auto rounded-full mb-2" />
                                    <div className="text-center mx-auto">
                                        <p className="text-lg font-semibold">Driver: {vehicle.driver}</p>
                                        <p>Phone: {vehicle.phone}</p>
                                        <p>Car No: {vehicle.car}</p>
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
                <div className="w-full lg:w-1/2 h-[40rem]">
                    <MapContainer center={[37.7749, -122.4194]} zoom={10} className="w-full h-full">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapUpdater coordinates={coordinates} />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}
