const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/user.model');


app.use(cors()); // Use the cors middleware
app.use(express.json());

mongoose.connect('mongodb+srv://ganeshnandhipati161999:Ganesh123%40%23%24@cluster1ganesh.n9trq4x.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
 
 


app.post('/api/register', async (req, res) => {
  console.log(req.body);
  try {
      await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
      });
      res.json({ status: 'ok' });
  } catch (err) {
      console.log(err); // Log the actual error for debugging
      res.json({ status: 'error', error: err.message }); // Send the actual error message as the response
  }
});


app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    return res.json({ status: 'ok', user: true });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

app.listen(1337, () => {
  console.log('Server started on 1337');
});
