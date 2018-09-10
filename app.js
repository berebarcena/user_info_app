const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

//get the css files
app.use(express.static(__dirname + '/public'));

//read the json and parse it
let userData = fs.readFile('users.json', (err, data) => {
  if (err) throw err;
  userData = JSON.parse(data);
});

app.get('/users', (req, res) => {
  res.render('all-users', { users: userData });
});

app.get('/search', (req, res) => {
  res.render('search');
});

app.post('/matches', (req, res) => {
  const data = req.body;
  const user = {};
  userData.forEach(u => {
    if (
      data.search === u.firstname ||
      data.search === u.lastname ||
      data.search === `${u.firstname} ${u.lastname}`
    ) {
      user.fullname = `${u.firstname} ${u.lastname}`;
      user.email = u.email;
    }
  });

  res.render('matches', { user: user });
});

app.get('/add-user', (req, res) => {
  const error = req.query.error || '';
  const message = error === 'no-empty-fields' ? 'All fields are required' : '';
  res.render('add-user', { error: message });
});

app.post('/users', (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.email) {
    res.redirect('/add-user?error=no-empty-fields');
  } else {
    userData.push(req.body);
    fs.writeFile('users.json', JSON.stringify(userData), err => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    res.render('all-users', { users: userData });
  }
});

app.get('/api/users/all', (req, res) => {
  res.json(userData);
});

app.listen(3000, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('app listening on port 3000!');
});
