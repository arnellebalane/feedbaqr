import React, { useState } from 'react';
import { firestore } from '../lib/firebase';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Text</label>
        <input
          type="text"
          name="text"
          value={data.text}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Image</label>
        <input type="file" name="image" onChange={handleChange} />
      </div>

      <button>Submit</button>
    </form>
  );
};

export default FeedbackForm;
