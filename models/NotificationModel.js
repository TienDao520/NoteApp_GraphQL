import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
  },

  //2 fields: createdAt and updatedAt will be create after adding timestamps
  { timestamps: true }
);

//Name of model, model's schema
const NotificationModel = mongoose.model('Notification', notificationSchema);
export default NotificationModel;
