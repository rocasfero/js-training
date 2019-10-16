import express from 'express';

const app = express();

const COMMENTS = [];

// use body-parser
app.use(express.urlencoded());

// set template engine
app.set('views', 'templates');
app.set('view engine', 'pug');

// routing
app.get('/', (req, res) => {
  console.log('get /, comments: ', COMMENTS);
  res.render('index', { comments: COMMENTS });
});

app.post('/', (req, res) => {
  console.log('post /, body: ', req.body);
  COMMENTS.push({
    name: req.body.name,
    comment: req.body.comment,
    postedAt: new Date()
  });

  res.redirect('/');
});

// start
app.listen(3000, () => {
  console.log(`Server start at http://localhost:3000/`);
});