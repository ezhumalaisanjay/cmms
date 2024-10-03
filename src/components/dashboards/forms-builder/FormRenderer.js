import React from 'react';
import PropTypes from 'prop-types';
import './FormBuilder.css';

const FormRenderer = ({ fields }) => {
  return (
    <form className="form-preview">
      {fields.length > 0 ? (
        fields.map((field, index) => (
          <div key={index} className="form-group">
            <label>{field.label}</label>

            {/* Text Field */}
            {field.type === 'text' && (
              <input
                type="text"
                name={field.name}
                placeholder={field.label}
                className="form-control"
              />
            )}

            {/* Textarea Field */}
            {field.type === 'textarea' && (
              <textarea
                name={field.name}
                placeholder={field.label}
                className="form-control"
              ></textarea>
            )}

            {/* Checkbox Field */}
            {field.type === 'checkbox' && (
              <input type="checkbox" name={field.name} />
            )}

            {/* Dropdown Field */}
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

            {/* Radio Button Field */}
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

            {/* File Upload Field */}
            {field.type === 'file' && (
              <input type="file" name={field.name} className="form-control" />
            )}

            {/* Date Field */}
            {field.type === 'date' && (
              <input type="date" name={field.name} className="form-control" />
            )}

            {/* Number Field */}
            {field.type === 'number' && (
              <input
                type="number"
                name={field.name}
                placeholder={field.label}
                className="form-control"
              />
            )}

            {/* Slider Field */}
            {field.type === 'slider' && (
              <input
                type="range"
                name={field.name}
                min="0"
                max="100"
                className="form-control"
              />
            )}

            {/* Rating Field */}
            {field.type === 'rating' && (
              <div className="rating-group">
                {[1, 2, 3, 4, 5].map(rating => (
                  <label key={rating}>
                    <input type="radio" name={field.name} value={rating} />
                    {rating}⭐
                  </label>
                ))}
              </div>
            )}

            {/* Email Field */}
            {field.type === 'email' && (
              <input
                type="email"
                name={field.name}
                placeholder="Enter your email"
                className="form-control"
              />
            )}

            {/* Phone Field */}
            {field.type === 'phone' && (
              <input
                type="tel"
                name={field.name}
                placeholder="Enter your phone"
                className="form-control"
              />
            )}

            {/* Date-Time Field */}
            {field.type === 'datetime' && (
              <input
                type="datetime-local"
                name={field.name}
                className="form-control"
              />
            )}

            {/* Embed URL Field */}
            {field.type === 'embed' && (
              <input
                type="url"
                name={field.name}
                placeholder="Embed URL"
                className="form-control"
              />
            )}

            {/* Currency Field */}
            {field.type === 'currency' && (
              <input
                type="text"
                name={field.name}
                placeholder="Enter currency amount"
                className="form-control"
              />
            )}

            {/* Address Field */}
            {field.type === 'address' && (
              <textarea
                name={field.name}
                placeholder="Enter your address"
                className="form-control"
              ></textarea>
            )}

            {/* Decimal Field */}
            {field.type === 'decimal' && (
              <input
                type="number"
                step="0.01"
                name={field.name}
                placeholder="Enter decimal value"
                className="form-control"
              />
            )}

            {/* Audio/Video Upload Field */}
            {field.type === 'audio-video' && (
              <input
                type="file"
                accept="audio/*, video/*"
                name={field.name}
                className="form-control"
              />
            )}

            {/* Unique ID Field */}
            {field.type === 'unique-id' && (
              <input
                type="text"
                name={field.name}
                placeholder="Unique ID"
                className="form-control"
              />
            )}

            {/* Description Field */}
            {field.type === 'description' && (
              <textarea
                name={field.name}
                placeholder="Enter description"
                className="form-control"
              ></textarea>
            )}

            {/* Month-Year Field */}
            {field.type === 'month-year' && (
              <input type="month" name={field.name} className="form-control" />
            )}

            {/* Decision Box (Checkbox) Field */}
            {field.type === 'decision-box' && (
              <input
                type="checkbox"
                name={field.name}
                className="form-control"
              />
            )}

            {/* Image Upload Field */}
            {field.type === 'image-upload' && (
              <input
                type="file"
                accept="image/*"
                name={field.name}
                className="form-control"
              />
            )}

            {/* Page Break Field */}
            {field.type === 'page-break' && <hr />}
          </div>
        ))
      ) : (
        <p>No fields to render</p>
      )}
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
