import React from 'react';

const FeedbackList = ({ feedbacks }) => {
  if (feedbacks) {
    return (
      <ul>
        {feedbacks.map((feedback, i) => (
          <li key={i}>
            {feedback.text && <p>{feedback.text}</p>}
            {feedback.image && <img src={feedback.image} />}
          </li>
        ))}
      </ul>
    );
  }

  return <p>Loading feedbacks...</p>;
};

export default FeedbackList;
