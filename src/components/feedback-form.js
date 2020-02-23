import React, { useState, useRef } from 'react';

import { useFeedbackCreator } from '../lib/firebase-hooks';
import { SubjectPropType } from '../lib/custom-prop-types';
import '../styles/index.css';

const FeedbackForm = ({ subject }) => {
  const [data, setData] = useState({ text: '', image: null });
  const fileElementRef = useRef(null);
  const feedbackCreator = useFeedbackCreator(subject);

  if (!feedbackCreator) return null;
  const { loading, createFeedback } = feedbackCreator;

  const enableSubmit = (data.text || data.image) && !loading;

  const handleChange = event => {
    let { type, name, value, files } = event.target;
    if (data.hasOwnProperty(name)) {
      value = type === 'file' ? files[0] : value;
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await createFeedback(data);

    fileElementRef.current.value = null;
    setData({ text: '', image: null });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="text">Text</label>
        <br />
        <textarea
          id="text"
          type="text"
          name="text"
          value={data.text}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className="input-container">
        <label htmlFor="image">Image</label>
        <br />
        <div className="upload-btn-wrapper">
          <button className="btn">Upload a file</button>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            ref={fileElementRef}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
      </div>

      <button disabled={!enableSubmit} className="generate-button submit">
        Submit
      </button>
    </form>
  );
};

FeedbackForm.propTypes = {
  subject: SubjectPropType.isRequired,
};

export default FeedbackForm;
