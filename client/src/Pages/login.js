import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
    const navigate = useNavigate();
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

        const data = await response.json();

        if (data.user) {
            localStorage.setItem('token', data.user);
            localStorage.setItem('userName', data.userName);
            localStorage.setItem('userEmail',data.userEmail); // Store the user's name
            alert('Login successful');
            window.location.href = '/dashboard';
        } else {
            alert('Please check your username and password');
        }
    }

	return (
        <div className='lname'> <h1>Login</h1>
		<div className='login'>
			<form onSubmit={loginUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login" />
			</form>
		</div>
        </div>
	)
}

export default App