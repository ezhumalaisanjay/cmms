import React, { useState } from 'react';
import { Table, Button, Form, Image, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import EmployeeForm from './EmployeeForm';
import { saveAs } from 'file-saver'; // Import file-saver for export functionality
import './EmployeeTable.css'; // Import a CSS file for custom styles

const EmployeeTable = ({ employeeList, addEmployee }) => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    employeeId: '',
    phone: ''
  });

  const toggleEmployeeSelection = employee => {
    if (selectedEmployees.includes(employee)) {
      setSelectedEmployees(selectedEmployees.filter(e => e !== employee));
    } else {
      setSelectedEmployees([...selectedEmployees, employee]);
    }
  };

  const handleNewButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleFilterOpen = () => {
    setShowFilter(true);
  };

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  const handleFilterChange = e => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = () => {
    // Implement the filtering logic based on the filters state
    console.log('Filters applied:', filters);
    handleFilterClose();
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      employeeId: '',
      phone: ''
    });
  };

  const exportData = () => {
    // Create CSV content
    const csvHeaders = [
      'Employee ID',
      'Name',
      'Date of Birth',
      'Address',
      'Phone',
      'Email'
    ];
    const csvRows = employeeList.map(employee => [
      employee.employeeId,
      employee.name,
      employee.dateOfBirth,
      employee.address,
      employee.phone,
      employee.email
    ]);

    let csvContent = `${csvHeaders.join(',')}\n${csvRows
      .map(row => row.join(','))
      .join('\n')}`;

    // Create a Blob from the CSV content and use file-saver to download it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'employee_data.csv');
  };

  return (
    <div className="mb-3 card p-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Employees</h5>
        <div id="employee-actions">
          <Button
            variant="primary"
            onClick={handleNewButtonClick}
            className="me-2"
          >
            <i className="fas fa-plus me-1"></i> New
          </Button>
          <Button
            variant="outline-secondary"
            onClick={handleFilterOpen}
            className="me-2"
          >
            <i className="fas fa-filter me-1"></i> Filter
          </Button>
          <Button variant="outline-secondary" onClick={exportData}>
            <i className="fas fa-external-link-alt me-1"></i> Export
          </Button>
        </div>
      </div>

      {/* Add Employee Modal */}
      <Modal show={showForm} onHide={handleFormClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmployeeForm addEmployee={addEmployee} onClose={handleFormClose} />
        </Modal.Body>
      </Modal>

      {/* Filter Modal */}
      <Modal show={showFilter} onHide={handleFilterClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Employees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="filterName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Enter employee name"
              />
            </Form.Group>
            <Form.Group controlId="filterEmployeeId">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                name="employeeId"
                value={filters.employeeId}
                onChange={handleFilterChange}
                placeholder="Enter employee ID"
              />
            </Form.Group>
            <Form.Group controlId="filterPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={filters.phone}
                onChange={handleFilterChange}
                placeholder="Enter employee phone"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={clearFilters}>
            Clear
          </Button>
          <Button variant="primary" onClick={applyFilters}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="table-responsive">
        <Table striped bordered hover className="align-middle text-nowrap">
          <thead className="bg-200 text-900">
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  onChange={e => {
                    if (e.target.checked) {
                      setSelectedEmployees(employeeList);
                    } else {
                      setSelectedEmployees([]);
                    }
                  }}
                />
              </th>
              <th>Profile</th>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee, index) => (
              <tr
                key={index}
                className={`align-middle ${
                  selectedEmployees.includes(employee) ? 'table-success' : ''
                }`}
                onClick={() => toggleEmployeeSelection(employee)}
              >
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedEmployees.includes(employee)}
                    onChange={() => toggleEmployeeSelection(employee)}
                  />
                </td>
                <td>
                  <Image
                    src={employee.profileImage}
                    alt={`${employee.name}'s profile`}
                    roundedCircle
                    width={50}
                    height={50}
                  />
                </td>
                <td>{employee.employeeId}</td>
                <td>{employee.name}</td>
                <td>{employee.dateOfBirth}</td>
                <td>{employee.address}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <p>Selected Employees: {selectedEmployees.length}</p>

      <div className="card-footer text-center">
        <Button variant="secondary" className="m-2">
          Previous
        </Button>
        <Button variant="secondary" className="m-2">
          Next
        </Button>
      </div>
    </div>
  );
};

EmployeeTable.propTypes = {
  employeeList: PropTypes.array.isRequired,
  addEmployee: PropTypes.func.isRequired
};

export default EmployeeTable;
