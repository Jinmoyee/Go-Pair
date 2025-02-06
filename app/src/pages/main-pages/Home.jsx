import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token && token !== 'undefined' ? token : null;
    };

    const handleNavigation = (userType) => {
        const token = getToken();
        if (token) {
            navigate(userType === 'pilot' ? '/Pilot' : '/Passenger');
        } else {
            navigate('/Login');
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
                    onClick={() => handleNavigation('pilot')}
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
                    onClick={() => handleNavigation('passenger')}
                >
                    PASSENGER
                </button>
            </div>
        </div>
    );
}
