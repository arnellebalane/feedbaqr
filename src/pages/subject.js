import React, { useState, useEffect } from 'react';
import { firestore } from '../lib/firebase';
import SubjectInfo from '../components/subject-info';
import FeedbackList from '../components/feedback-list';
import FeedbackForm from '../components/feedback-form';

const SubjectPage = ({ location }) => {
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    (async () => {
      const subjectId = location.search.substring(4);
      const subjectRef = firestore.doc(`subjects/${subjectId}`);
      const subjectSnapshot = await subjectRef.get();
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
  }, []);

  if (subject) {
    return (
      <>
        <SubjectInfo subject={subject} />
        <FeedbackList feedbacks={subject.feedbacks} />
        <FeedbackForm subject={subject} />
      </>
    );
  }

  return <p>Loading...</p>;
};

export default SubjectPage;
