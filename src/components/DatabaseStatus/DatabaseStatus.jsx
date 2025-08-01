import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDatabase, FaTimes } from 'react-icons/fa';
import './DatabaseStatus.css';

const DatabaseStatus = () => {
  const [status, setStatus] = useState(null);
  const [lastPing, setLastPing] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const checkDatabaseStatus = async () => {
    try {
      const response = await axios.get('/health');
      setStatus(response.data);
      setLastPing(new Date().toLocaleString());
      setIsOnline(true);
    } catch (error) {
      console.error('Database health check failed:', error);
      setStatus({ status: 'Database offline', error: error.message });
      setIsOnline(false);
    }
  };

  useEffect(() => {
    // Check immediately
    checkDatabaseStatus();
    
    // Then check every 5 minutes (much less frequent)
    const interval = setInterval(checkDatabaseStatus, 300000); // 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`database-status ${isExpanded ? 'expanded' : 'minimized'}`}>
      {!isExpanded ? (
        // Minimized icon view
        <div className="status-icon" onClick={toggleExpanded}>
          <FaDatabase className={`db-icon ${isOnline ? 'online' : 'offline'}`} />
          <div className={`status-dot ${isOnline ? 'online' : 'offline'}`}></div>
        </div>
      ) : (
        // Expanded view
        <div className="status-expanded">
          <div className="status-header">
            <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
              <FaDatabase className="db-icon" />
              <span className="status-text">
                {isOnline ? 'Database Online' : 'Database Offline'}
              </span>
            </div>
            <FaTimes className="close-icon" onClick={toggleExpanded} />
          </div>
          
          {status && (
            <div className="status-details">
              <p><strong>Status:</strong> {status.status}</p>
              {status.db_time && (
                <p><strong>DB Time:</strong> {new Date(status.db_time).toLocaleString()}</p>
              )}
              {lastPing && (
                <p><strong>Last Check:</strong> {lastPing}</p>
              )}
            </div>
          )}
          
          <button onClick={checkDatabaseStatus} className="refresh-btn">
            Refresh Status
          </button>
        </div>
      )}
    </div>
  );
};

export default DatabaseStatus;
