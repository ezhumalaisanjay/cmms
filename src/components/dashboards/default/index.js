import React, { useState } from 'react';
import EmployeeTable from './EmployeeTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [employeeList, setEmployeeList] = useState([
    { name: 'Anna', email: 'anna@example.com', age: 18 },
    { name: 'Homer', email: 'homer@example.com', age: 35 },
    { name: 'Oscar', email: 'oscar@example.com', age: 52 },
    { name: 'Emily', email: 'emily@example.com', age: 30 },
    { name: 'Jara', email: 'jara@example.com', age: 25 }
  ]);

  const addEmployee = newEmployee => {
    setEmployeeList([...employeeList, newEmployee]);
  };

  return (
    <div className="container mt-5">
      <EmployeeTable employeeList={employeeList} addEmployee={addEmployee} />
    </div>
  );
};

export default App;
