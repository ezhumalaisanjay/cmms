import React, { useState } from 'react';
import EmployeeTable from './EmployeeTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [employeeList, setEmployeeList] = useState([
    {
      employeeId: '1',
      name: 'Anna',
      dateOfBirth: '2005-01-01',
      address: '123 Main St',
      phone: '123-456-7890',
      email: 'anna@example.com',
      profileImage: 'https://example.com/path-to-anna-image.jpg' // Add profile image URL
    },
    {
      employeeId: '2',
      name: 'Homer',
      dateOfBirth: '1988-01-01',
      address: '456 Elm St',
      phone: '234-567-8901',
      email: 'homer@example.com',
      profileImage: 'https://example.com/path-to-homer-image.jpg'
    },
    {
      employeeId: '3',
      name: 'Oscar',
      dateOfBirth: '1971-01-01',
      address: '789 Oak St',
      phone: '345-678-9012',
      email: 'oscar@example.com',
      profileImage: 'https://example.com/path-to-oscar-image.jpg'
    },
    {
      employeeId: '4',
      name: 'Emily',
      dateOfBirth: '1993-01-01',
      address: '101 Pine St',
      phone: '456-789-0123',
      email: 'emily@example.com',
      profileImage: 'https://example.com/path-to-emily-image.jpg'
    },
    {
      employeeId: '5',
      name: 'Jara',
      dateOfBirth: '1998-01-01',
      address: '202 Maple St',
      phone: '567-890-1234',
      email: 'jara@example.com',
      profileImage: 'https://example.com/path-to-jara-image.jpg'
    }
  ]);

  // Function to add a new employee to the employeeList
  const addEmployee = newEmployee => {
    const newId = (employeeList.length + 1).toString(); // Generate new employee ID
    setEmployeeList([...employeeList, { ...newEmployee, employeeId: newId }]);
  };

  return (
    <div className="">
      <EmployeeTable employeeList={employeeList} addEmployee={addEmployee} />
    </div>
  );
};

export default App;
