export const checkUserType = userType => {
  switch (userType) {
    case 'HE':
      return 'Evaluator';

    case 'HH':
      return 'Host';

    case 'HP':
      return 'Participant';

    default:
      return 'User';
  }
};
