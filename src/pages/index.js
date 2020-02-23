import React from 'react';
import { navigate } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import SubjectForm from '../components/subject-form';

const IndexPage = () => {
  const handleSubmit = subject => {
    navigate(`/subject/?id=${subject.id}`);
  };

  return (
    <Layout>
      <SEO title="Home" />
      <SubjectForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default IndexPage;
