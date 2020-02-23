import React, { useState, useRef, useContext } from 'react';
import { FirebaseContext } from 'gatsby-plugin-firebase';
import '../styles/index.css';

const FeedbackForm = ({ subject }) => {
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState({ text: '', image: null });
  const [loading, setLoading] = useState(false);
  const fileElementRef = useRef(null);

  // On first render, the value provided in FirebaseContext is null, and we
  // need to handle this ourselves.
  // https://www.gatsbyjs.org/packages/gatsby-plugin-firebase/#firebasecontext
  if (!firebase) return null;

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
    setLoading(true);

    const feedbacksRef = firebase
      .firestore()
      .doc(`subjects/${subject.id}`)
      .collection('feedbacks');

    const feedbackRef = await feedbacksRef.add({
      text: data.text,
      createdOn: new Date(),
    });

    if (data.image) {
      const fileType = data.image.type.replace(/^image\//, '');
      const fileName = `${feedbackRef.id}.${fileType}`;
      const fileRef = firebase.storage().ref(fileName);

      await fileRef.put(data.image);
      const fileUrl = await fileRef.getDownloadURL();
      await feedbackRef.update({ image: fileUrl });
    }

    fileElementRef.current.value = null;
    setData({ text: '', image: null });
    setLoading(false);
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

export default FeedbackForm;
