import React, { useState } from 'react';
import Modal from '../common/Modal';

const MemberForm = ({ member, onClose }) => {
  const [formData, setFormData] = useState(
    member || { name: '', email: '', phone: '', tier: 'Bronze', status: 'active' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Member saved:', formData);
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={member ? 'Edit Member' : 'Add New Member'}
      footer={
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
        </div>
      }
    >
      <form className="member-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            className="form-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            className="form-input"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Tier</label>
          <select
            className="filter-select"
            name="tier"
            value={formData.tier}
            onChange={handleChange}
          >
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            className="filter-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </form>
    </Modal>
  );
};

export default MemberForm;

