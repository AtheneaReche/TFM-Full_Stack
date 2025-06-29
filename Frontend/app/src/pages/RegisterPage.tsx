import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const url = 'http://localhost:3000/auth/register';
      await axios.post(url, { name, email, password });
      
      console.log('User successfully registed.');
      navigate('/login');

    }catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            setError(err.response.data.error || 'Error on register.');
        } else {
            setError('Unexpected error happened.');
            console.error(err);
        }
    }
  };

  return (
    <div>
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="email">Username</label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default RegisterPage;