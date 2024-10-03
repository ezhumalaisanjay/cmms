import React, { useState } from 'react';
import FormRenderer from './FormRenderer';
import './FormBuilder.css';

const fieldTypes = [
  { type: 'text', label: 'Single Line' },
  { type: 'number', label: 'Number' },
  { type: 'name', label: 'Name' },
  { type: 'phone', label: 'Phone' },
  { type: 'date', label: 'Date' },
  { type: 'datetime', label: 'Date-Time' },
  { type: 'dropdown', label: 'Dropdown' },
  { type: 'multiple-choice', label: 'Multiple Choice' },
  { type: 'website', label: 'Website' },
  { type: 'file', label: 'File Upload' },
  { type: 'audio-video', label: 'Audio/Video Upload' },
  { type: 'section', label: 'Section' },
  { type: 'slider', label: 'Slider' },
  { type: 'unique-id', label: 'Unique ID' },
  { type: 'embed', label: 'Embed' },
  { type: 'textarea', label: 'Multi Line' },
  { type: 'decimal', label: 'Decimal' },
  { type: 'address', label: 'Address' },
  { type: 'email', label: 'Email' },
  { type: 'time', label: 'Time' },
  { type: 'month-year', label: 'Month-Year' },
  { type: 'decision-box', label: 'Decision Box' },
  { type: 'radio', label: 'Radio' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'currency', label: 'Currency' },
  { type: 'image-upload', label: 'Image Upload' },
  { type: 'description', label: 'Description' },
  { type: 'page-break', label: 'Page Break' },
  { type: 'rating', label: 'Rating' }
];

const DynamicForm = () => {
  const [fields, setFields] = useState([]);
  const [alignments, setAlignments] = useState({});

  const addField = type => {
    setFields([...fields, { type, label: '', name: '', options: [] }]);
  };

  const removeField = index => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const toggleAlignment = index => {
    setAlignments(prev => ({
      ...prev,
      [index]: prev[index] === 'right' ? 'left' : 'right'
    }));
  };

  const saveForm = () => {
    console.log('Form saved with fields:', fields);
    // Save form logic can be added here, e.g., API call or local storage
  };

  return (
    <div className="form-builder-wrapper">
      <div className="form-builder-container">
        <div className="basic-fields-list">
          {fieldTypes.map((field, index) => (
            <button
              key={index}
              type="button"
              className="add-field-btn"
              onClick={() => addField(field.type)}
            >
              {field.label}
            </button>
          ))}
        </div>

        <div className="form-builder-section">
          <h2>Form Builder</h2>
          {fields.map((field, index) => (
            <div
              key={index}
              className={`form-field-preview ${
                alignments[index] === 'right' ? 'align-right' : 'align-left'
              }`}
            >
              <div className="form-group">
                <label>Label</label>
                <input
                  type="text"
                  value={field.label}
                  onChange={e =>
                    handleFieldChange(index, 'label', e.target.value)
                  }
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={field.name}
                  onChange={e =>
                    handleFieldChange(index, 'name', e.target.value)
                  }
                  className="form-control"
                />
              </div>

              <button
                type="button"
                className="align-btn"
                onClick={() => toggleAlignment(index)}
              >
                {alignments[index] === 'right' ? 'Align Left' : 'Align Right'}
              </button>
              <button
                type="button"
                className="remove-field-btn"
                onClick={() => removeField(index)}
              >
                Remove Field
              </button>
            </div>
          ))}

          {/* Save Form Button */}
          <button className="save-form-btn" onClick={saveForm}>
            Save Form
          </button>
        </div>
      </div>

      <div className="form-renderer-section">
        <h2>Rendered Form</h2>
        <FormRenderer fields={fields} />
      </div>
    </div>
  );
};

export default DynamicForm;
