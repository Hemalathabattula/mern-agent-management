import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { agentAPI, listAPI } from '../services/api';
import AgentForm from '../components/AgentForm';
import AgentList from '../components/AgentList';
import UploadForm from '../components/UploadForm';
import ListDisplay from '../components/ListDisplay';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [agents, setAgents] = useState([]);
  const [lists, setLists] = useState([]);
  const [activeTab, setActiveTab] = useState('agents');
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [loadingLists, setLoadingLists] = useState(false);
  const [errorAgents, setErrorAgents] = useState('');
  const [errorLists, setErrorLists] = useState('');

  useEffect(() => {
    fetchAgents();
    fetchLists();
  }, []);

  const fetchAgents = async () => {
    setLoadingAgents(true);
    setErrorAgents('');
    try {
      const { data } = await agentAPI.getAgents();
      setAgents(data);
    } catch (error) {
      if (error.status === 401) {
        logout();
      } else {
        setErrorAgents('Error fetching agents');
      }
      console.error('Error fetching agents:', error);
    } finally {
      setLoadingAgents(false);
    }
  };

  const fetchLists = async () => {
    setLoadingLists(true);
    setErrorLists('');
    try {
      const { data } = await listAPI.getLists();
      setLists(data);
    } catch (error) {
      if (error.status === 401) {
        logout();
      } else {
        setErrorLists('Error fetching lists');
      }
      console.error('Error fetching lists:', error);
    } finally {
      setLoadingLists(false);
    }
  };

  const handleAgentCreated = () => {
    fetchAgents();
  };

  const handleUpload = () => {
    fetchLists();
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Admin Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <nav>
        <button
          className={activeTab === 'agents' ? 'active' : ''}
          onClick={() => setActiveTab('agents')}
        >
          Agents
        </button>
        <button
          className={activeTab === 'upload' ? 'active' : ''}
          onClick={() => setActiveTab('upload')}
        >
          Upload CSV
        </button>
        <button
          className={activeTab === 'lists' ? 'active' : ''}
          onClick={() => setActiveTab('lists')}
        >
          Distributed Lists
        </button>
      </nav>
      <main>
        {activeTab === 'agents' && (
          <div>
            <button onClick={fetchAgents} disabled={loadingAgents}>
              {loadingAgents ? 'Loading Agents...' : 'Refresh Agents'}
            </button>
            {errorAgents && <p className="error">{errorAgents}</p>}
            <AgentForm onAgentCreated={handleAgentCreated} />
            <AgentList agents={agents} />
          </div>
        )}
        {activeTab === 'upload' && (
          <UploadForm onUpload={handleUpload} />
        )}
        {activeTab === 'lists' && (
          <div>
            <button onClick={fetchLists} disabled={loadingLists}>
              {loadingLists ? 'Loading Lists...' : 'Refresh Lists'}
            </button>
            {errorLists && <p className="error">{errorLists}</p>}
            <ListDisplay lists={lists} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
