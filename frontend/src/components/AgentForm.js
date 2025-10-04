import React, { useState } from 'react';
import { agentAPI } from '../services/api';

const AgentForm = ({ onAgentCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await agentAPI.createAgent({ name, email, mobile, password });
      setSuccess('Agent created successfully');
      setName('');
      setEmail('');
      setMobile('');
      setPassword('');
      onAgentCreated();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create agent');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h3>Add Agent</h3>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <div>
          <label>Name: </label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <br></br>
        <div>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <br></br>
        <div>
          <label>Mobile: </label>
          <input value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </div>
        <br></br>
        <div>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <br></br>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Add Agent</button>
      </form>
    </div>
  );
};

export default AgentForm;
