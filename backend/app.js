// // // modules 
// // let name="prasad"
// // console.log(`Hello there ${name}`)

const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/')
  .then(() => console.log('Connected!'))
  .catch(() => {
    console.log('Not connected');
  });

app.listen(3000, () => {
  console.log('Server is running');
});

app.get('/', (req, res) => {
  res.send('Prasad');
});