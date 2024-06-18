// src/GoogleCallback.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');

        if (code) {
            fetch('http://localhost:3000/auth/google/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ code }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        navigate('/');
                    } else {
                        navigate('/login');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [location.search, navigate]);

    return <div>Loading...</div>;
};

export default GoogleCallback;
