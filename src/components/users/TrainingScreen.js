import React, { useState, useEffect } from 'react';
import { Icons } from '../common/Icons';
import { trainingApi } from '../../api/index';
import { formatDateTime } from '../../utils/formatDate';

const TrainingScreen = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const data = await trainingApi.getAll();
      setResources(data || []);
    } catch (err) {
      console.error('Failed to fetch training resources:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="training-screen">
      <div className="page-header">
        <h1 className="page-title">Training Resources</h1>
        <button className="btn btn-primary">
          <Icons.Plus size={18} style={{ marginRight: '0.5rem' }} />
          Add Resource
        </button>
      </div>

      <div className="stats-grid">
        {resources.map((resource) => (
          <div key={resource.id} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '1.5rem' }}>
                {getResourceIcon(resource.resourceType)}
              </div>
              <h3 style={{ margin: 0, color: 'var(--text)', fontSize: '1.1rem' }}>
                {resource.title}
              </h3>
            </div>

            <p style={{ color: 'var(--secondary-text)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
              {resource.description || 'No description available'}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <span className="status-badge" style={{ backgroundColor: 'rgba(79, 43, 183, 0.1)', color: 'var(--primary)' }}>
                {resource.category || 'General'}
              </span>
              {resource.active ? (
                <span className="status-badge status-active">Active</span>
              ) : (
                <span className="status-badge status-inactive">Inactive</span>
              )}
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--secondary-text)' }}>
              Updated: {formatDateTime(resource.updatedAt)}
            </div>
          </div>
        ))}
      </div>

      {resources.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>No Training Resources</h3>
          <p style={{ color: 'var(--secondary-text)' }}>Add training resources to get started.</p>
        </div>
      )}
    </div>
  );
};

function getResourceIcon(type) {
  const icons = {
    VIDEO: '🎥',
    DOCUMENT: '📄',
    ARTICLE: '📰',
    WEBINAR: '💻',
  };
  return icons[type] || '📚';
}

export default TrainingScreen;
