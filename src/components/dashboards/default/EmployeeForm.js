import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EmployeeForm = ({ addEmployee }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
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
      employeeId: '',
      name: '',
      dateOfBirth: '',
      address: '',
      phone: '',
      email: ''
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmployeeId">
        <Form.Label>Employee ID</Form.Label>
        <Form.Control
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
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
  addEmployee: PropTypes.func.isRequired
};

export default EmployeeForm;
