import React, { useState, useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { FirebaseContext } from 'gatsby-plugin-firebase';
import logo from '../images/logo.png';
import '../styles/index.css';

const IndexPage = () => {
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  if (!firebase) {
    return null;
  }

  const firestore = firebase.firestore();
  const enableSubmit = data.title.trim() && !loading;

  const handleChange = event => {
    const key = event.target.name;
    setData({ ...data, [key]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const subjectsRef = firestore.collection('subjects');
    const ref = await subjectsRef.add({
      ...data,
      createdOn: new Date(),
    });
    navigate(`/subject/?id=${ref.id}`);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <img id="logo" src={logo} />
      <div className="input-container">
        <label>Title</label>
        <br />
        <input
          id="title"
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="input-container">
        <label>Description</label>
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

export default IndexPage;
