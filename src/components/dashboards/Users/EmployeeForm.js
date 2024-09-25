import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import successImage from 'assets/img/icons/Done-pana.svg'; // Adjust the file path as necessary

const EmployeeForm = ({ addEmployee, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    address: '',
    phone: '',
    email: '',
    profileImage: null // New field for profile image
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal state
  const [isSubmitting, setIsSubmitting] = useState(false); // Submitting state
  const [errorMessage, setErrorMessage] = useState(null); // Error handling

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
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      // Construct employee data with the current timestamp
      const employeeData = {
        name: formData.name,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        profileImage: formData.profileImage,
        category: 'Employees',
        timestamp: new Date().toISOString() // Sets timestamp to the current date and time
      };

      // Wrap employeeData in the "body" key
      const requestBody = {
        body: employeeData
      };

      // Log employeeData for debugging
      console.log('Request body before sending:', requestBody);

      // Send form data to the provided API
      const response = await fetch(
        'https://l7yiegdmm9.execute-api.us-west-2.amazonaws.com/test/post_events_to_dynamodb',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody) // Send the employee data wrapped in "body"
        }
      );

      // Error handling
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response from API:', result);

      // Show success modal and update parent component
      setShowSuccessModal(true);
      addEmployee(employeeData); // Call addEmployee to update the parent component

      // Reset form after successful submission
      setFormData({
        name: '',
        dateOfBirth: '',
        address: '',
        phone: '',
        email: '',
        profileImage: null // Reset profile image
      });
    } catch (error) {
      console.error('Failed to submit employee data:', error);
      setErrorMessage('Failed to submit data. Please try again.'); // Set error message to display
    } finally {
      setIsSubmitting(false);
    }
  };

  // Updated handleCloseModal function to reload the page
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    onClose(); // Close the form after submission
    window.location.reload(); // Reload the page when the modal is closed
  };

  return (
    <>
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
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
          {isSubmitting && (
            <div
              className="spinner-border spinner-border-sm mt-2"
              role="status"
            >
              <span className="visually-hidden">Updating...</span>
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger mt-2" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
      </Form>

      {/* Modal for success message */}
      <Modal
        show={showSuccessModal}
        onHide={handleCloseModal}
        centered
        size="md" // Responsive for small screens
      >
        <Modal.Body className="text-center">
          <div>
            {/* Use the imported image */}
            <img
              src={successImage}
              alt="Success"
              style={{ width: '18rem', height: '20rem' }} // Style the image as needed
            />
            <h4 className="mt-3">Successful</h4>
            <p>You have approved the claim.</p>
          </div>
          <Button variant="success" onClick={handleCloseModal}>
            Close!
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

EmployeeForm.propTypes = {
  addEmployee: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired // Prop to close the form
};

export default EmployeeForm;
