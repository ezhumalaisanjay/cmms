import React, { useState, useEffect } from 'react';
import EmployeeTable from './EmployeeTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [employeeList, setEmployeeList] = useState([]);

  // Function to fetch employee data from the API
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(
          'https://l7yiegdmm9.execute-api.us-west-2.amazonaws.com/test/get_add_data',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category: 'Employees' })
          }
        );

        const result = await response.json();
        if (response.ok && result.body) {
          const apiData = JSON.parse(result.body);
          const updatedEmployeeList = apiData.map((item, index) => ({
            employeeId: (employeeList.length + index + 1).toString(),
            name: item.name,
            dateOfBirth: item.dateOfBirth,
            address: item.address,
            phone: item.phone,
            email: item.email,
            profileImage: item.profileImage ? item.profileImage : ''
          }));
          setEmployeeList([...employeeList, ...updatedEmployeeList]);
        } else {
          console.error('Failed to fetch data:', result);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  // Function to add a new employee to the employeeList
  const addEmployee = newEmployee => {
    const newId = (employeeList.length + 1).toString(); // Generate new employee ID
    setEmployeeList([...employeeList, { ...newEmployee, employeeId: newId }]);
  };

  return (
    <div>
      <EmployeeTable employeeList={employeeList} addEmployee={addEmployee} />
    </div>
  );
};

export default App;
