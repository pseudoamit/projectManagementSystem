const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = mongoose.model('users');
const Project = mongoose.model('project');

router.post('/add-project', (req, res) => {
  console.log(req.body);
  const { title, description, userId } = req.body;

  User.findById(userId).then((user) => {
    if (!user) {
      return res
        .status(422)
        .json({ message: 'Can not add project for this ID' });
    } else {
      const project = new Project({ title, description });
      user.projects.push(project);
      Promise.all([user.save(), project.save()])
        .then(() => User.findById(userId).populate({ path: 'projects' }))
        .then((user) =>
          res.status(200).send({
            message: 'Project succssfully added',
            projects: user.projects,
          })
        )
        .catch((err) => {
          console.log(err);
          res.status(422).send({ message: "can't add project for this user" });
        });
    }
  });
});

router.post('/display-project', (req, res) => {
  const { userId } = req.body;
  User.findById(userId)
    .populate({ path: 'projects' })
    .then((user) => {
      res.send({
        projects: user.projects,
      });
    });
});

module.exports = router;
