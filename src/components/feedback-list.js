import React from 'react';

const FeedbackList = ({ feedbacks }) => {
  return (
    <ul>
      {feedbacks.map((feedback, i) => (
        <li key={i}>{feedback.text}</li>
      ))}
    </ul>
  );
};

export default FeedbackList;
