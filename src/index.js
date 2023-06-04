const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection options with authentication
const uri = 'mongodb+srv://raphael2gb:GWznVTuYs1vPcpLl@devopscluster.vamopoy.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/register.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.css'));
});

// Define the Student model outside of the route handler
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  grade1: { type: Number, required: true },
  grade2: { type: Number, required: true },
  grade3: { type: Number, required: true },
});

const Student = mongoose.model('Student', studentSchema);

app.post('/register', async (req, res) => {
  const { name, grade1, grade2, grade3 } = req.body;
  console.log('Received request:', req.body);
  // Perform validation on the grades here

  const student = new Student({
    name,
    grade1,
    grade2,
    grade3
  });

  try {
    await student.save();
    console.log('Student saved successfully!');
    res.send('Student registered successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while saving student data: ' + error.message);
  }
});

app.listen(port, () => {
  console.log('Server is up and running on port', port);
});
