const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Project = mongoose.model('project', ProjectSchema);
module.exports = Project;
