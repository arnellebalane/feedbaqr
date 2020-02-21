import React from 'react';
import SubjectInfo from '../components/subject-info';

const SubjectPage = () => {
  const subject = {
    title: 'Test Subject',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem aliquid voluptatibus dignissimos necessitatibus possimus illo dolorum ea, quod nulla ad praesentium aperiam adipisci labore quo consectetur eos quos culpa recusandae.',
  };

  return <SubjectInfo subject={subject} />;
};

export default SubjectPage;
