const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
  name: { type: String, required: true }
});

const studentSchema = new Schema({
  name: { type: String, required: true },
  mentor: { type: Schema.Types.ObjectId, ref: 'Mentor', default: null }
});

const Mentor = mongoose.model('Mentor', mentorSchema);
const Student = mongoose.model('Student', studentSchema);

module.exports = { Mentor, Student };
