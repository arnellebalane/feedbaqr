import React from 'react';
import { navigate } from 'gatsby';

import useSubject from '../lib/use-subject';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SubjectDetails from '../components/subject-details';
import FeedbackList from '../components/feedback-list';
import FeedbackForm from '../components/feedback-form';
import '../styles/index.css';

const SubjectPage = ({ location }) => {
  const subjectId = location.search.substring(4);
  const { exists, subject } = useSubject(subjectId);

  if (exists === false) {
    // `exists` defaults to `null` while subject existence is not yet determined.
    navigate('/');
    return null;
  }

  if (!subject) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <SEO title={subject.title} description={subject.description} />

      <div className="subjects-wrapper">
        <SubjectDetails subject={subject} />
        <FeedbackForm subject={subject} />
        <FeedbackList feedbacks={subject.feedbacks} />
      </div>
    </Layout>
  );
};

export default SubjectPage;
