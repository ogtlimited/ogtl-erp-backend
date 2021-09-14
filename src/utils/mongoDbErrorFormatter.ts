//formats the duplicate error message sent by mongoDB.
export const duplicateErrorMessageFormatter = (message): string => {
  const messagePolish = Object.entries(message)[0][0];
  return `${messagePolish} already exists!`;
};
