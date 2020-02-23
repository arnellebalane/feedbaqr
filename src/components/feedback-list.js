import React from 'react';
import { Image } from 'cloudinary-react';

const FeedbackItem = ({ feedback }) => (
  <Image
    cloudName="feedbaqr"
    publicId={feedback.image}
    width="100"
    crop="scale"
  />
);

const FeedbackList = ({ feedbacks }) => {
  if (!feedbacks) {
    return <p>Loading feedbacks...</p>;
  }

  return (
    <>
      <p>Feedbacks</p>
      <ul className="feedback-list">
        {feedbacks.map((feedback, i) => (
          <li className="feedback-item" key={i}>
            {feedback.text && <p>{feedback.text}</p>}
            {feedback.image && <FeedbackItem feedback={feedback} />}
          </li>
        ))}
      </ul>
    </>
  );
};

export default FeedbackList;
