import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';

import { FeedbackPropType } from '../lib/custom-prop-types';

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

FeedbackList.propTypes = {
  feedbacks: PropTypes.arrayOf(FeedbackPropType),
};

export default FeedbackList;
