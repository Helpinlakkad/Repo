const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: Number,
  department: String,
});

const subject = mongoose.model("Subject", subjectSchema);

// Routes
app.get("/subjects", async (req, res) => {
  try {
    const subjects = await subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/subjects", async (req, res) => {
  const subject = new subject({
    name: req.body.name,
    rollNumber: req.body.rollNumber,
    department: req.body.department,
  });

  try {
    const newStudent = await subject.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/subjects/:id", async (req, res) => {
  try {
    const subject = await subject.findById(req.params.id);
    if (subject) {
      subject.name = req.body.name || subject.name;
      subject.rollNumber = req.body.rollNumber || subject.rollNumber;
      subject.department = req.body.department || subject.department;

      const updatedStudent = await subject.save();
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: "subject not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/subjects/:id", async (req, res) => {
  try {
    const deletedStudent = await subject.findByIdAndDelete(req.params.id);
    if (deletedStudent) {
      res.json({ message: "subject deleted" });
    } else {
      res.status(404).json({ message: "subject not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});