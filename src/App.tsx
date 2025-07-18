import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Example validation (hardcoded)
    if (username === 'admin' && password === 'password123') {
      setMessage('✅ Login successful!');
    } else {
      setMessage('❌ Invalid username or password.');
    }
  };

  return (
    <>
    
    
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
      
    </>
  )
}

export default App
