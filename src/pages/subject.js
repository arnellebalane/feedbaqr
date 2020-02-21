import React from 'react';
import SubjectInfo from '../components/subject-info';
import FeedbackList from '../components/feedback-list';
import FeedbackForm from '../components/feedback-form';

const SubjectPage = () => {
  const subject = {
    title: 'Test Subject',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem aliquid voluptatibus dignissimos necessitatibus possimus illo dolorum ea, quod nulla ad praesentium aperiam adipisci labore quo consectetur eos quos culpa recusandae.',

    feedbacks: [
      {
        text: 'Hello world',
      },
      {
        text: 'Lorem ipsum',
      },
    ],
  };

  return (
    <>
      <SubjectInfo subject={subject} />
      <FeedbackList feedbacks={subject.feedbacks} />
      <FeedbackForm />
    </>
  );
};

export default SubjectPage;
