import React, { useState } from 'react';
import { firestore } from '../lib/firebase';

import logo from '../images/logo.png';
import '../styles/index.css';

const FeedbackForm = ({ subject }) => {
  const [data, setData] = useState({ text: '', image: null });

  const handleChange = event => {
    let { type, name, value, files } = event.target;
    value = type === 'file' ? files[0] : value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const feedbacksRef = firestore
      .doc(`subjects/${subject.id}`)
      .collection('feedbacks');
    await feedbacksRef.add({
      ...data,
      createdOn: new Date(),
    });

    setData({ text: '', image: null });
  };

  return (
    <form class="form" onSubmit={handleSubmit}>
      <img id="logo" src={logo} />
      <div class="input-container">
        <label>Text</label>
        <br />
        <input
          type="text"
          name="text"
          value={data.text}
          onChange={handleChange}
        />
      </div>

      <div class="input-container">
        <label>Image</label>
        <br />
        <div class="upload-btn-wrapper">
          <button class="btn">Upload a file</button>
          <input type="file" name="image" onChange={handleChange} />
        </div>

      </div>
      <button class="submit-button">Submit</button>
    </form>
  );
};

export default FeedbackForm;
