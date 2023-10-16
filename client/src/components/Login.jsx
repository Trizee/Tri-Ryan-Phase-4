import {useState} from 'react'

function Login({setUser}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e){
        e.preventDefault()
        fetch("/api/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response error");
            }
            return response.json();
        })
        .then(data => {
            setUser(data)
            console.log(data);
        })
        .catch(error => {
            console.log("error", error.message);
        });
    }
  return (
    <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
  )
}

export default Login