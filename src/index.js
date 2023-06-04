const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const uri = 'mongodb+srv://raphael2gb:GWznVTuYs1vPcpLl@devopscluster.vamopoy.mongodb.net/?retryWrites=true&w=majority';

function connectToDB() {
  try {
    mongoose.connect(uri);
    console.log('Connected to DB');
  } catch (error) {
    console.log('Error connecting to DB'); 
  }
}
connectToDB();
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

app.get('/test', (req, res) => {
    res.send('Test');
});

module.exports = app;


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
