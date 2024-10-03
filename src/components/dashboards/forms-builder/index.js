// pages/index.js
import React, { useState } from 'react'; // Import React
import { Container } from 'react-bootstrap'; // Import any necessary Bootstrap components
import DynamicForm from './DynamicForm'; // Correct the import paths

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [formFields, setFormFields] = useState([]);

  return (
    <Container>
      <h1>Dynamic Form Builder and Renderer</h1>
      <DynamicForm setFormFields={setFormFields} />
    </Container>
  );
};

export default Home; // Export the Home component
