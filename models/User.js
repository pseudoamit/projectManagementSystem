const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  projects: [{ type: mongoose.Types.ObjectId, ref: 'project' }],
});

mongoose.model('users', UserSchema);
// module.exports = User = mongoose.model("users", UserSchema);
