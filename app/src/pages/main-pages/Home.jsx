import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Home() {
    const navigate = useNavigate();
    const [identity, setIdentity] = useState(null);

    // Load identity from cookies once when the component mounts
    useEffect(() => {
        const storedIdentity = Cookies.get('identity');
        setIdentity(storedIdentity);
        console.log("Identity from useEffect:", storedIdentity); // Debugging output
    }, []);

    const handlePilotClick = () => {
        if (identity === 'pilot') {
            navigate('/pilot');
        } else {
            navigate('/pilot-login');
        }
    };

    const handlePassengerClick = () => {
        console.log("Identity at Click:", identity); // Debugging output
        if (identity === 'passenger') {
            navigate('/passenger');
        } else {
            navigate('/passenger-login');
        }
    };

    return (
        <div className='flex flex-col md:flex-row h-screen'>
            <div className='w-full md:w-[50%] bg-black text-white h-1/2 md:h-full flex items-center justify-center'>
                <button
                    className='text-2xl border-2 border-white px-3 py-2 tracking-widest cursor-pointer hover:text-black hover:bg-white'
                    style={{ transition: 'transform 0.2s ease-in-out' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={handlePilotClick}
                >
                    PILOT
                </button>
            </div>
            <div className='w-full md:w-[50%] bg-white text-black h-1/2 md:h-full flex items-center justify-center'>
                <button
                    className='text-2xl border-2 border-black px-3 py-2 tracking-widest cursor-pointer hover:text-white hover:bg-black'
                    style={{ transition: 'transform 0.2s ease-in-out' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={handlePassengerClick}
                >
                    PASSENGER
                </button>
            </div>
        </div>
    );
}
