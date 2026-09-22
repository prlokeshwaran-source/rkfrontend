import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../common/Icons';
import { customerApi } from '../../api/index';

const AddCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    interestedIn: '',
    remarks: '',
    assignedToId: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Name and phone are required');
      return;
    }

    setLoading(true);
    try {
      await customerApi.create(formData);
      navigate('/customers');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-customer-screen">
      <div className="page-header">
        <h1 className="page-title">Add Customer</h1>
        <button className="btn btn-secondary" onClick={() => navigate('/customers')}>
          <Icons.ChevronLeft size={18} style={{ marginRight: '0.5rem' }} />
          Back
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <form className="customer-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              className="form-input"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">City</label>
            <input
              className="form-input"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Interested In</label>
            <input
              className="form-input"
              name="interestedIn"
              value={formData.interestedIn}
              onChange={handleChange}
              placeholder="e.g., Product A, Service B"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Remarks</label>
            <textarea
              className="form-input"
              name="remarks"
              rows="3"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Additional notes"
              disabled={loading}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" type="button" onClick={() => navigate('/customers')}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : (
                <>
                  <Icons.Save size={16} style={{ marginRight: '0.5rem' }} />
                  Save Customer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
