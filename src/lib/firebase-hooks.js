import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from 'gatsby-plugin-firebase';
import Firebase from 'firebase';
import mapValues from 'lodash/mapValues';

function convertTimestampsToDate(object) {
  return mapValues(object, value => {
    if (value instanceof Firebase.firestore.Timestamp) {
      return value.toDate();
    }
    return value;
  });
}

export const useSubjectCreator = () => {
  const firebase = useContext(FirebaseContext);
  const [loading, setLoading] = useState(false);

  // On first render, the value provided in FirebaseContext is null, and we
  // need to handle this ourselves.
  // https://www.gatsbyjs.org/packages/gatsby-plugin-firebase/#firebasecontext
  if (!firebase) return null;

  const createSubject = async subjectData => {
    setLoading(true);

    const subjectsRef = firebase.firestore().collection('subjects');
    const subjectRef = await subjectsRef.add({
      ...subjectData,
      createdOn: Firebase.firestore.FieldValue.serverTimestamp(),
    });

    setLoading(false);
    return { ...subjectData, id: subjectRef.id };
  };

  return { loading, createSubject };
};

export const useSubjectFetcher = subjectId => {
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

  // On first render, the value provided in FirebaseContext is null, and we
  // need to handle this ourselves.
  // https://www.gatsbyjs.org/packages/gatsby-plugin-firebase/#firebasecontext
  if (!firebase) return null;

  return { exists, subject };
};

export const useFeedbackCreator = subject => {
  const firebase = useContext(FirebaseContext);
  const [loading, setLoading] = useState(false);

  // On first render, the value provided in FirebaseContext is null, and we
  // need to handle this ourselves.
  // https://www.gatsbyjs.org/packages/gatsby-plugin-firebase/#firebasecontext
  if (!firebase) return null;

  const createFeedback = async feedbackData => {
    setLoading(true);

    const feedbacksRef = firebase
      .firestore()
      .doc(`subjects/${subject.id}`)
      .collection('feedbacks');

    const feedbackRef = await feedbacksRef.add({
      text: feedbackData.text,
      createdOn: Firebase.firestore.FieldValue.serverTimestamp(),
    });

    if (feedbackData.image) {
      const fileType = feedbackData.image.type.replace(/^image\//, '');
      const fileName = `${feedbackRef.id}.${fileType}`;
      const fileRef = firebase.storage().ref(fileName);

      await fileRef.put(feedbackData.image);
      feedbackData.image = await fileRef.getDownloadURL();
      await feedbackRef.update({ image: feedbackData.image });
    }

    setLoading(false);
    return { ...feedbackData, id: feedbackRef.id };
  };

  return { loading, createFeedback };
};
