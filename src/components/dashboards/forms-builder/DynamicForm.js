import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FormBuilder.css';

const basicFields = [
  { type: 'text', label: 'Single Line' },
  { type: 'textarea', label: 'Multi Line' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'dropdown', label: 'Dropdown' },
  { type: 'file', label: 'File Upload' },
  { type: 'name', label: 'Name' },
  { type: 'date', label: 'Date' },
  { type: 'radio', label: 'Radio Button' },
  { type: 'section', label: 'Section' },
  { type: 'currency', label: 'Currency' }
];

const DynamicForm = ({ setFormFields }) => {
  const [fields, setFields] = useState([]);
  // State for alignment
  const [alignments, setAlignments] = useState({});

  const addField = fieldType => {
    setFields([
      ...fields,
      { type: fieldType, label: '', name: '', options: [] }
    ]);
  };

  const removeField = index => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
    setFormFields(newFields);
  };

  const addOption = index => {
    const newFields = [...fields];
    newFields[index].options = [...newFields[index].options, ''];
    setFields(newFields);
    setFormFields(newFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, value) => {
    const newFields = [...fields];
    newFields[fieldIndex].options[optionIndex] = value;
    setFields(newFields);
    setFormFields(newFields);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData('text/plain');
    const newFields = [...fields];
    const [removed] = newFields.splice(draggedIndex, 1);
    newFields.splice(index, 0, removed);
    setFields(newFields);
    setFormFields(newFields);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const toggleAlignment = index => {
    const newAlignments = { ...alignments };
    newAlignments[index] = newAlignments[index] === 'right' ? 'left' : 'right';
    setAlignments(newAlignments);
  };

  return (
    <div className="form-builder-container">
      <h2>Basic Fields</h2>
      <div className="basic-fields-list">
        {basicFields.map((field, index) => (
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

      {fields.length > 0 && (
        <div className="form-builder-section">
          <h2>Form Builder</h2>
          {fields.map((field, index) => (
            <div
              key={index}
              className={`form-field-preview ${
                alignments[index] === 'right' ? 'align-right' : 'align-left'
              }`}
              draggable
              onDragStart={e => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, index)}
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

              {['dropdown', 'radio'].includes(field.type) && (
                <>
                  <div className="form-group">
                    <label>Options</label>
                    {field.options.map((option, optIndex) => (
                      <div key={optIndex} className="option-group">
                        <input
                          type="text"
                          value={option}
                          onChange={e =>
                            handleOptionChange(index, optIndex, e.target.value)
                          }
                          className="form-control"
                          placeholder={`Option ${optIndex + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="add-option-btn"
                    onClick={() => addOption(index)}
                  >
                    Add Option
                  </button>
                </>
              )}

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
        </div>
      )}
    </div>
  );
};

DynamicForm.propTypes = {
  setFormFields: PropTypes.func.isRequired
};

export default DynamicForm;
