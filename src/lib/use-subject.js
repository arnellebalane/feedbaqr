import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from 'gatsby-plugin-firebase';

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

      const subjectData = { ...subjectSnapshot.data(), id: subjectId };
      setSubject(subjectData);

      const feedbacksRef = subjectRef
        .collection('feedbacks')
        .orderBy('createdOn', 'desc');
      feedbacksRef.onSnapshot(feedbackSnapshot => {
        const feedbacks = feedbackSnapshot.docs.map(docSnapshot =>
          docSnapshot.data()
        );
        setSubject({ ...subjectData, feedbacks });
      });
    })();
  }, [firebase, subjectId]);

  return { exists, subject };
}
