import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from 'gatsby-plugin-firebase';

import logo from '../images/logo.png';
import '../styles/index.css';

const SubjectForm = ({ onSubmit }) => {
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  // On first render, the value provided in FirebaseContext is null, and we
  // need to handle this ourselves.
  // https://www.gatsbyjs.org/packages/gatsby-plugin-firebase/#firebasecontext
  if (!firebase) return null;

  const enableSubmit = data.title.trim() && !loading;

  const handleChange = event => {
    const key = event.target.name;
    if (data.hasOwnProperty(key)) {
      setData({ ...data, [key]: event.target.value.trim() });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);

    const subjectData = { ...data, createdOn: new Date() };
    const subjectsRef = firebase.firestore().collection('subjects');
    const subjectRef = await subjectsRef.add(subjectData);

    setLoading(false);
    if (typeof onSubmit === 'function') {
      onSubmit({ ...subjectData, id: subjectRef.id });
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
