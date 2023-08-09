import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate(); // Use the useNavigate hook

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function Registeruser(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:1337/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Registration successful
            localStorage.setItem('token', data.user);
            localStorage.setItem('userName', data.userName);
            localStorage.setItem('userEmail',data.userEmail) ;
            console.log('Registration successful');
            navigate('/login'); // Use the navigate function directly
        } else {
            // Registration failed
            setError(data.error || 'An error occurred');
        }
    }

    return (
        <>
            <div className="maindiv">
                <h2>Register</h2>
                <p></p>
                <form onSubmit={Registeruser}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                    />
                    <p></p>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <p></p>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <br />
                    <input type="submit" value="Register" />
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </>
    );
}

export default Register;
