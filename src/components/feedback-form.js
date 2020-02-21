import React, { useState, useRef } from 'react';
import { firestore, storage } from '../lib/firebase';

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
      <div>
        <label htmlFor="text">Text</label>
        <input
          id="text"
          type="text"
          name="text"
          value={data.text}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          name="image"
          ref={fileElementRef}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <button disabled={!enableSubmit}>Submit</button>
    </form>
  );
};

export default FeedbackForm;
