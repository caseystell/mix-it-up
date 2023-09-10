import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div>
      <div className="form-container">
        <h1>Log in!</h1>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label><h4>Email</h4></label>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <label><h4>Password</h4></label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <br/>
          <button type="submit" className="btn auth">Log in</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}