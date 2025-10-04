import React from 'react';

const AgentList = ({ agents }) => {
  return (
    <div>
      <h3>Agents</h3>
      {agents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <ul>
          {agents.map((agent) => (
            <li key={agent._id}>
              <strong>{agent.name}</strong> - {agent.email} - {agent.mobile}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgentList;
