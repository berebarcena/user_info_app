const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs');

//get the css files
app.use(express.static(__dirname + '/public'));

let userData = null;
//read the json and parse it
fs.readFile('users.json', (err, data) => {
  if (err) 
    throw err;
  userData = JSON.parse(data);
})

app.get('/users', (req, res) => {
  res.render('all-users', {users: userData})
})

app.get('/search', (req, res) => {
  res.render('search');
})

app.post('/matches', urlencodedParser, (req, res) => {
  const data = req.body;
  const user = {};
  for (let u of userData) {
    if (data.search === u.firstname || data.search === u.lastname) {
      user.fullname = `${u.firstname} ${u.lastname}`
      user.email = u.email;
    }
  }
  res.render('matches', {user: user});
})

app.get('/add-user', (req, res) => {
  res.render('add-user');
})
app.post('/users', urlencodedParser, (req, res) => {
  userData.push(req.body);
  fs.writeFile('users.json', JSON.stringify(userData), (err) => {
    if (err) 
      throw err;
    console.log('The file has been saved!');
  });
  res.render('all-users', {users: userData});
})

app.listen(3000);