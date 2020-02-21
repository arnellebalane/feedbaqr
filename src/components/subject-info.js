import React from 'react';

const SubjectInfo = ({ subject }) => {
  return (
    <header>
      <h1>{subject.title}</h1>
      <p>{subject.description}</p>
    </header>
  );
};

export default SubjectInfo;
