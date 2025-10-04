import React from 'react';

const ListDisplay = ({ lists }) => {
  return (
    <div>
      <h3>Distributed Lists</h3>
      {lists.length === 0 ? (
        <p>No lists found.</p>
      ) : (
        lists.map((list) => (
          <div key={list._id} style={{ marginBottom: '20px' }}>
            <h4>Agent: {list.agent.name} ({list.agent.email})</h4>
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Phone</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {list.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.firstName}</td>
                    <td>{item.phone}</td>
                    <td>{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default ListDisplay;
