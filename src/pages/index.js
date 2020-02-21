import React, { useState } from 'react';
import { navigate } from 'gatsby';
import firebase, { firestore } from '../lib/firebase';
import logo from '../images/logo.png';
import '../styles/index.css';

const IndexPage = () => {
  const [data, setData] = useState({ title: '', description: '' });

  const handleChange = event => {
    const key = event.target.name;
    setData({ ...data, [key]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const subjectsRef = firestore.collection('subjects');
    const ref = await subjectsRef.add({
      ...data,
      createdOn: new Date(),
    });
    navigate(`/subject/?id=${ref.id}`);
  };

  return (
    <form class="form" onSubmit={handleSubmit}>
      <img id="logo" src={logo} />
      <div class="input-container">
        <label>Title</label>
        <br />
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          required
        />
      </div>

      <div class="input-container">
        <label>Description</label>
        <br />
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <button class="submit-button">Create FeedbaQR</button>
    </form >
  );
};

export default IndexPage;
