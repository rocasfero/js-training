import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import createError from 'http-errors';

const app = express();
const todos = [];
let todoIndex = 0;

// 好きなミドルウェアなど
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ルーティング定義など
app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const name = req.body.name;
  if (!name) throw createError(403, 'name was not found');

  const todo = {
    id: ++todoIndex,
    name: name
  };
  todos.push(todo);

  res.json(todo);
});

app.get('/todos/:id', (req, res) => {
  const index = todos.findIndex((todo) => todo.id === parseInt(req.params.id));
  if (index === -1) throw createError(404);

  res.json(todos[index]);
});

app.put('/todos/:id', (req, res) => {
  const index = todos.findIndex((todo) => todo.id === parseInt(req.params.id));
  if (index === -1) throw createError(404);

  const name = req.body.name;
  if (!name) throw createError(403, 'name was not found');

  todos[index].name = name;

  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex((todo) => todo.id === parseInt(req.params.id));
  if (index === -1) throw createError(404);

  todos.splice(index, 1);

  res.status(201).end();
});

// 404用の処理
app.use((req, res, next) => {
  next(createError(404));
});

// エラーレスポンス用
app.use((err, req, res, next) => {
  if (!(err instanceof createError.HttpError)) {
    err = createError(500, err.message);
  }

  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    name: err.name,
    message: err.message
  });
});

app.listen(3000, () => {
  console.log('start');
});