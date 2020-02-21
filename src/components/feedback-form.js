import React, { useState, useRef } from 'react';
import { firestore, storage } from '../lib/firebase';

import logo from '../images/logo.png';
import '../styles/index.css';

const FeedbackForm = ({ subject }) => {
  const [data, setData] = useState({ text: '', image: null });
  const [loading, setLoading] = useState(false);
  const fileElementRef = useRef(null);
  const enableSubmit = (data.text || data.image) && !loading;

  const handleChange = event => {
    let { type, name, value, files } = event.target;
    value = type === 'file' ? files[0] : value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    setLoading(true);

    const feedbacksRef = firestore
      .doc(`subjects/${subject.id}`)
      .collection('feedbacks');

    const ref = await feedbacksRef.add({
      text: data.text,
      createdOn: new Date(),
    });

    if (data.image) {
      const fileRef = storage.ref(ref.id);
      await fileRef.put(data.image);
      const url = await fileRef.getDownloadURL();
      await ref.update({ image: url });
    }

    fileElementRef.current.value = null;
    setData({ text: '', image: null });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label>Text</label>
        <br />
        <input
          id="text"
          type="text"
          name="text"
          value={data.text}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className="input-container">
        <label>Image</label>
        <br />
        <div className="upload-btn-wrapper">
          <button className="btn">Upload a file</button>
          <input
            id="image"
            type="file"
            name="image"
            ref={fileElementRef}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

      </div>
      <button disabled={!enableSubmit} className="submit-button">Submit</button>
    </form>
  );
};

export default FeedbackForm;
