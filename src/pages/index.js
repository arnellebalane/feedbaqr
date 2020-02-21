import React, { useState } from 'react';
import { navigate } from 'gatsby';
import firebase, { firestore } from '../lib/firebase';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <button>Generate</button>
    </form>
  );
};

export default IndexPage;
