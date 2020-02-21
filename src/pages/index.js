import React, { useState } from 'react';

const IndexPage = () => {
  const [data, setData] = useState({ title: '', description: '' });

  const handleChange = event => {
    const key = event.target.name;
    setData({ ...data, [key]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(data);
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
