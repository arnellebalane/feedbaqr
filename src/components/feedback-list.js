import React from 'react';
import { Image } from 'cloudinary-react';
import logo from '../images/logo.png';

const FeedbackList = ({ feedbacks }) => {
  if (feedbacks) {
    return (
      <>
        <p>Feedbacks</p>
        <ul className="feedback-list">
          {feedbacks.map((feedback, i) => (
            <li className="feedback-item" key={i}>
              {feedback.text && <p>{feedback.text}</p>}
              {feedback.image && (
                <Image
                  cloudName="feedbaqr"
                  publicId={feedback.image}
                  width="100"
                  crop="scale"
                />
              )}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return <p>Loading feedbacks...</p>;
};

export default FeedbackList;
