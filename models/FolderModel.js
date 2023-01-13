import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
  },
  //2 fields: createdAt and updatedAt will be create after adding timestamps
  { timestamps: true }
);

//Name of model, model's schema
const FolderModel = mongoose.model('Folder', folderSchema);
export default FolderModel;
