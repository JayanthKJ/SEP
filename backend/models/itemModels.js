import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  category: String,
  date: Date,
  location: {
    lat: Number,
    lng: Number,
    description: String
  },
  contactInfo: String,
  reportedBy: String,
  isResolved: Boolean,
  imageUrl: String
});

export default mongoose.model('Item', ItemSchema);
