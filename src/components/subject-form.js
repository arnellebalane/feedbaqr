import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSubjectCreator } from '../lib/firebase-hooks';
import logo from '../images/logo.png';
import '../styles/index.css';

const SubjectForm = ({ onSubmit }) => {
  const [data, setData] = useState({ title: '', description: '' });
  const subjectCreator = useSubjectCreator();

  if (!subjectCreator) return null;
  const { loading, createSubject } = subjectCreator;

  const enableSubmit = data.title.trim() && !loading;

  const handleChange = event => {
    const key = event.target.name;
    if (data.hasOwnProperty(key)) {
      setData({ ...data, [key]: event.target.value.trim() });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const subject = await createSubject(data);
    if (typeof onSubmit === 'function') {
      onSubmit(subject);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <img id="logo" src={logo} alt="FeedbaQR Logo  " />

      <div className="input-container">
        <label htmlFor="title">Title</label>
        <br />
        <input
          id="title"
          name="title"
          type="text"
          value={data.title}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          id="description"
          name="description"
          value={data.description}
          onChange={handleChange}
          disabled={loading}
        ></textarea>
      </div>

      <button disabled={!enableSubmit} className="generate-button">
        Create FeedbaQR
      </button>
    </form>
  );
};

SubjectForm.propTypes = {
  onSubmit: PropTypes.instanceOf(Function),
};

export default SubjectForm;
