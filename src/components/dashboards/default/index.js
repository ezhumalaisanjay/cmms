import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(
          'https://l7yiegdmm9.execute-api.us-west-2.amazonaws.com/test/get_add_data',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setEmployeeList(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  // Function to add a new employee to the employeeList
  const addEmployee = async () => {
    // Prepare the payload including the category
    const payload = {
      category: 'Employees' // Include category here
    };

    // Send the new employee data to the API
    try {
      await fetch(
        'https://l7yiegdmm9.execute-api.us-west-2.amazonaws.com/test/get_add_data',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      // Update the state with the new employee
      setEmployeeList([...employeeList, payload]);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="">
      <EmployeeTable employeeList={employeeList} addEmployee={addEmployee} />
    </div>
  );
};

export default App;
