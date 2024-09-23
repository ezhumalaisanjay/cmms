import React, { useState } from 'react';
import { Table, Button, Form, Image } from 'react-bootstrap'; // Import Image from react-bootstrap
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

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="mb-3 card p-4">
      <div className="card-header">
        <h2>Employees</h2>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <div>
          <Button
            variant="primary"
            className="btn btn-falcon-default btn-sm"
            onClick={handleNewButtonClick}
          >
            + New
          </Button>
        </div>
        <div>
          <Button
            variant="secondary"
            className="ms-2 btn btn-falcon-default btn-sm"
          >
            Export
          </Button>
        </div>
      </div>

      {showForm ? (
        <div className="mb-4">
          <EmployeeForm addEmployee={addEmployee} onClose={handleFormClose} />
        </div>
      ) : (
        <>
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
                  style={{ cursor: 'pointer' }}
                  className="align-middle white-space-nowrap"
                  role="row"
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

          <p>Selected Employees: {selectedEmployees.length}</p>

          <div className="card-footer">
            <div className="d-flex justify-content-center align-items-center">
              <Button
                variant="secondary"
                className="btn btn-falcon-default btn-sm m-2"
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                className="active page me-2 btn btn-falcon-default btn-sm"
              >
                Page 1
              </Button>
              <Button
                variant="secondary"
                className="btn btn-falcon-default btn-sm"
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
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
      email: PropTypes.string.isRequired,
      profileImage: PropTypes.string // New prop for profile image
    })
  ).isRequired,
  addEmployee: PropTypes.func.isRequired
};

export default EmployeeTable;
