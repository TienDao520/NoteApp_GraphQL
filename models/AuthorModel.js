import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  //2 fields: createdAt and updatedAt will be create after adding timestamps
  { timestamps: true }
);

//Name of model, model's schema
const AuthorModel = mongoose.model('Author', authorSchema);
export default AuthorModel;
