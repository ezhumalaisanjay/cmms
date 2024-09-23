import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EmployeeForm = ({ addEmployee, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    address: '',
    phone: '',
    email: '',
    profileImage: null // New field for profile image
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle profile image upload
  const handleImageChange = e => {
    const file = e.target.files[0]; // Select the first file
    setFormData({
      ...formData,
      profileImage: file // Store file object
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Prepare form data with profileImage file
    const newEmployee = { ...formData };

    addEmployee(newEmployee);

    // Reset form after submission
    setFormData({
      name: '',
      dateOfBirth: '',
      address: '',
      phone: '',
      email: '',
      profileImage: null // Reset profile image
    });

    onClose(); // Close the form after submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDateOfBirth">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter phone number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formProfileImage">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control
          type="file"
          name="profileImage"
          onChange={handleImageChange}
          accept="image/*" // Accept image files only
        />
      </Form.Group>

      <div className="card-footer d-flex justify-content-between align-items-center">
        <Button variant="white" type="button" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
        <div
          className="spinner-border spinner-border-sm mt-2"
          role="status"
          hidden
          id="general-status"
        >
          <span className="visually-hidden">Updating...</span>
        </div>
        <i
          className="bi bi-check-square-fill"
          role="alert"
          hidden
          id="general-alert"
        ></i>
      </div>
    </Form>
  );
};

EmployeeForm.propTypes = {
  addEmployee: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired // Prop to close the form
};

export default EmployeeForm;
