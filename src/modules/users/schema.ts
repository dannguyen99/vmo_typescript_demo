import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  email: String,
  phone_number: String,
  gender: String,
  is_deleted: {
    type: Boolean,
    default: false
  },
  modification_notes: [{
    modified_on: Date,
    modified_by: String,
    modification_note: String
  }]
});

export default mongoose.model('users', schema);