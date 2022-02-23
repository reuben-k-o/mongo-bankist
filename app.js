const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const bankRoutes = require('./routes/bank');
const authRoutes = require('./routes/auth');
const rootDir = require('./util/path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));
app.use(flash());

app.use(bankRoutes);
app.use(authRoutes);

mongoose
  .connect('mongodb+srv://Reubenk:Reuben11*@cluster0.vnlvk.mongodb.net/bankist')
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
