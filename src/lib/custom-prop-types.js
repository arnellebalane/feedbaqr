import PropTypes from 'prop-types';

export const FeedbackPropType = PropTypes.shape({
  text: PropTypes.string,
  image: PropTypes.string,
  createdOn: PropTypes.instanceOf(Date),
});

export const SubjectPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  createdOn: PropTypes.instanceOf(Date),
  feedbacks: PropTypes.arrayOf(FeedbackPropType),
});
