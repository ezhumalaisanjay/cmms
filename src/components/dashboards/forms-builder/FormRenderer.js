import React from 'react';
import PropTypes from 'prop-types';
import './FormBuilder.css';

const FormRenderer = ({ fields }) => {
  return (
    <form className="form-preview">
      {fields.map((field, index) => (
        <div key={index} className="form-group">
          <label>{field.label}</label>
          {field.type === 'text' && (
            <input
              type="text"
              name={field.name}
              placeholder={field.label}
              className="form-control"
            />
          )}
          {field.type === 'textarea' && (
            <textarea
              name={field.name}
              placeholder={field.label}
              className="form-control"
            ></textarea>
          )}
          {field.type === 'checkbox' && (
            <input type="checkbox" name={field.name} />
          )}
          {field.type === 'dropdown' && (
            <select name={field.name} className="form-control">
              <option value="">Select an option</option>
              {field.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {field.type === 'radio' && (
            <div className="form-radio-group">
              {field.options.map((option, idx) => (
                <label key={idx}>
                  <input type="radio" name={field.name} value={option} />
                  {option}
                </label>
              ))}
            </div>
          )}
          {field.type === 'file' && (
            <input type="file" name={field.name} className="form-control" />
          )}
          {field.type === 'date' && (
            <input type="date" name={field.name} className="form-control" />
          )}
        </div>
      ))}
    </form>
  );
};

FormRenderer.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      name: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export default FormRenderer;
