import { useState, useEffect, useContext } from 'react';
import firebase from 'firebase';
import { FirebaseContext } from 'gatsby-plugin-firebase';
import mapValues from 'lodash/mapValues';

function convertTimestampsToDate(object) {
  return mapValues(object, value => {
    if (value instanceof firebase.firestore.Timestamp) {
      return value.toDate();
    }
    return value;
  });
}

export default function useSubject(subjectId) {
  const firebase = useContext(FirebaseContext);
  const [subject, setSubject] = useState(null);
  const [exists, setExists] = useState(null);

  useEffect(() => {
    (async () => {
      if (!firebase) return null;

      const subjectRef = firebase.firestore().doc(`subjects/${subjectId}`);
      const subjectSnapshot = await subjectRef.get();

      const subjectExists = subjectSnapshot.exists;
      setExists(subjectExists);
      if (!subjectExists) return null;

      const subjectData = convertTimestampsToDate({
        ...subjectSnapshot.data(),
        id: subjectId,
      });
      setSubject(subjectData);

      const feedbacksRef = subjectRef
        .collection('feedbacks')
        .orderBy('createdOn', 'desc');
      feedbacksRef.onSnapshot(feedbackSnapshot => {
        const feedbacks = feedbackSnapshot.docs.map(docSnapshot =>
          convertTimestampsToDate(docSnapshot.data())
        );
        setSubject({ ...subjectData, feedbacks });
      });
    })();
  }, [firebase, subjectId]);

  return { exists, subject };
}
