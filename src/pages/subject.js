import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { firestore } from '../lib/firebase';
import SubjectInfo from '../components/subject-info';
import FeedbackList from '../components/feedback-list';
import FeedbackForm from '../components/feedback-form';

import '../styles/index.css';

const SubjectPage = ({ location }) => {
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    (async () => {
      const subjectId = location.search.substring(4);
      const subjectRef = firestore.doc(`subjects/${subjectId}`);
      const subjectSnapshot = await subjectRef.get();

      if (!subjectSnapshot.exists) {
        return navigate('/');
      }

      const data = { ...subjectSnapshot.data(), id: subjectId };
      setSubject(data);

      const feedbackRef = subjectRef
        .collection('feedbacks')
        .orderBy('createdOn', 'desc');
      feedbackRef.onSnapshot(feedbackSnapshot => {
        const feedbacks = feedbackSnapshot.docs.map(docSnapshot =>
          docSnapshot.data()
        );
        setSubject({ ...data, feedbacks });
      });
    })();
  }, [location.search]);

  if (subject) {
    return (
      <div className="subjects-wrapper">
        <SubjectInfo subject={subject} />
        <FeedbackForm subject={subject} />
        <FeedbackList feedbacks={subject.feedbacks} />
      </div>
    );
  }

  return <p>Loading...</p>;
};

export default SubjectPage;
