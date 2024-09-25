import React, { useState } from 'react';
import { Table, Button, Form, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import EmployeeForm from './EmployeeForm';
import './EmployeeTable.css'; // Import a CSS file for custom styles

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
        <div className="flex-between-center row">
          <div className="d-flex align-items-center pe-0 col-sm-auto col-4">
            <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Employees</h5>
          </div>
          <div className="ms-auto text-end ps-0 col-sm-auto col-8">
            <div id="employee-actions">
              <button
                type="button"
                className="btn btn-falcon-default btn-sm"
                onClick={handleNewButtonClick}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="plus"
                  className="svg-inline--fa fa-plus fa-w-14 me-1"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  style={{ transformOrigin: '0.4375em 0.5em' }}
                >
                  <g transform="translate(224 256)">
                    <g transform="translate(0, 0) scale(0.8125, 0.8125) rotate(0 0 0)">
                      <path
                        fill="currentColor"
                        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                        transform="translate(-224 -256)"
                      ></path>
                    </g>
                  </g>
                </svg>
                <span className="d-none d-sm-inline-block ms-1">New</span>
              </button>
              <button
                type="button"
                className="mx-2 btn btn-falcon-default btn-sm"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="filter"
                  className="svg-inline--fa fa-filter fa-w-16 me-1"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  style={{ transformOrigin: '0.5em 0.5em' }}
                >
                  <g transform="translate(256 256)">
                    <g transform="translate(0, 0) scale(0.8125, 0.8125) rotate(0 0 0)">
                      <path
                        fill="currentColor"
                        d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"
                        transform="translate(-256 -256)"
                      ></path>
                    </g>
                  </g>
                </svg>
                <span className="d-none d-sm-inline-block ms-1">Filter</span>
              </button>
              <button type="button" className="btn btn-falcon-default btn-sm">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="external-link-alt"
                  className="svg-inline--fa fa-external-link-alt fa-w-16 me-1"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  style={{ transformOrigin: '0.5em 0.5em' }}
                >
                  <g transform="translate(256 256)">
                    <g transform="translate(0, 0) scale(0.8125, 0.8125) rotate(0 0 0)">
                      <path
                        fill="currentColor"
                        d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"
                        transform="translate(-256 -256)"
                      ></path>
                    </g>
                  </g>
                </svg>
                <span className="d-none d-sm-inline-block ms-1">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForm ? (
        <div className="mb-4">
          <EmployeeForm addEmployee={addEmployee} onClose={handleFormClose} />
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="bg-200 text-900 text-nowrap align-middle">
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
          </div>

          <p>Selected Employees: {selectedEmployees.length}</p>

          <div className="card-footer">
            <div className="d-flex justify-content-center align-items-center">
              <Button variant="secondary" className="m-2">
                Previous
              </Button>
              <Button variant="secondary" className="m-2">
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
  employeeList: PropTypes.array.isRequired,
  addEmployee: PropTypes.func.isRequired
};

export default EmployeeTable;
