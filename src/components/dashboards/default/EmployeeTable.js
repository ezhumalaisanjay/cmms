import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import EmployeeForm from './EmployeeForm';

const EmployeeTable = ({ employeeList, addEmployee }) => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  return (
    <div>
      <h2>Selection Example</h2>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Button variant="primary" onClick={handleNewButtonClick}>
            + New
          </Button>
        </div>
        <div>
          <Button variant="secondary">Export</Button>
        </div>
      </div>

      {showForm && <EmployeeForm addEmployee={addEmployee} />}

      <Table striped bordered hover>
        <thead>
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
            <tr key={index}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedEmployees.includes(employee)}
                  onChange={() => toggleEmployeeSelection(employee)}
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

      <p>Selected Employees: {selectedEmployees.length}</p>
    </div>
  );
};

EmployeeTable.propTypes = {
  employeeList: PropTypes.arrayOf(
    PropTypes.shape({
      employeeId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dateOfBirth: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    })
  ).isRequired,
  addEmployee: PropTypes.func.isRequired
};

export default EmployeeTable;
