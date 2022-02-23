/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
export const modelNames = () => {
  return mongoose.modelNames();
};

export const modelDocumentCount = async () => {
  const count = await mongoose.modelNames().map(async name => {
        await mongoose.model(name).estimatedDocumentCount();
  });
  return count;
};
