const express = require('express');
const router = express.Router();
const { Mentor, Student } = require('./models');

// Create Mentor
router.post('/mentors', async (req, res) => {
  const { name } = req.body;
  const mentor = new Mentor({ name });
  await mentor.save();
  res.status(201).send(mentor);
});

// Create Student
router.post('/students', async (req, res) => {
  const { name } = req.body;
  const student = new Student({ name });
  await student.save();
  res.status(201).send(student);
});

// Assign a student to a mentor
router.post('/assign', async (req, res) => {
  const { studentId, mentorId } = req.body;
  const student = await Student.findById(studentId);
  student.mentor = mentorId;
  await student.save();
  res.status(200).send(student);
});

// Get all students without a mentor
router.get('/students/unassigned', async (req, res) => {
  const students = await Student.find({ mentor: null });
  res.status(200).send(students);
});

// Change mentor for a particular student
router.put('/students/:studentId/mentor', async (req, res) => {
  const { studentId } = req.params;
  const { mentorId } = req.body;
  const student = await Student.findById(studentId);
  student.mentor = mentorId;
  await student.save();
  res.status(200).send(student);
});

// Get all students for a particular mentor
router.get('/mentors/:mentorId/students', async (req, res) => {
  const { mentorId } = req.params;
  const students = await Student.find({ mentor: mentorId });
  res.status(200).send(students);
});

// Get previously assigned mentors for a particular student (maintain a history)
router.get('/students/:studentId/mentor-history', async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId).populate('mentor');
  // Assuming we have a history array in student schema to maintain the history of mentors
  res.status(200).send(student.mentor);
});

module.exports = router;
