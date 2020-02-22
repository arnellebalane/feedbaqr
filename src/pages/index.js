import React from 'react';
import { navigate } from 'gatsby';
import SubjectForm from '../components/subject-form';

const IndexPage = () => {
  const handleSubmit = subject => {
    navigate(`/subject/?id=${subject.id}`);
  };

  return <SubjectForm onSubmit={handleSubmit} />;
};

export default IndexPage;
