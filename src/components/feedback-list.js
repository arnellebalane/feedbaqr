import React from 'react';
import { Image } from 'cloudinary-react';

const FeedbackList = ({ feedbacks }) => {
  if (feedbacks) {
    return (
      <ul>
        {feedbacks.map((feedback, i) => (
          <li key={i}>
            {feedback.text && <p>{feedback.text}</p>}
            {feedback.image && (
              <Image
                cloudName="feedbaqr"
                publicId={feedback.image}
                width="300"
                crop="scale"
              />
            )}
          </li>
        ))}
      </ul>
    );
  }

  return <p>Loading feedbacks...</p>;
};

export default FeedbackList;
