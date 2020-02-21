import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { firestore } from '../lib/firebase';

const IndexPage = () => {
  const [data, setData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
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
    <form onSubmit={handleSubmit}>
      <div>
        <label for="title">Title</label>
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

      <div>
        <label for="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={data.description}
          onChange={handleChange}
          disabled={loading}
        ></textarea>
      </div>

      <button disabled={!enableSubmit}>Generate</button>
    </form>
  );
};

export default IndexPage;
