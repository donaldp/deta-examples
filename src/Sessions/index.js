const session = require('express-session');
const express = require('express');
const { Deta } = require('../Config/Deta');

const DetaStore = require('./store')(session);
const app = express();

app.use(
  session({
    store: new DetaStore({
      client: Deta
    }),
    secret: 'a random secret',
    cookie: {
      maxAge: 60000
    },
    resave: true,
    saveUninitialized: false,
  })
);

app.get('/', (req, res) => {
  res.send(req.session.name ? `Hello ${req.session.name}` : 'Visit "/test" page');
});

app.get('/test', (req, res) => {
  req.session.name = 'Donald';

  res.send('Now visit "/" root page');
});

const port = process.env.PORT || 3000

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`);
});
