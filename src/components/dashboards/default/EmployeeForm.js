import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EmployeeForm = ({ addEmployee, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    address: '',
    phone: '',
    email: ''
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addEmployee(formData);
    setFormData({
      name: '',
      dateOfBirth: '',
      address: '',
      phone: '',
      email: ''
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

EmployeeForm.propTypes = {
  addEmployee: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired // Prop to close the form
};

export default EmployeeForm;
