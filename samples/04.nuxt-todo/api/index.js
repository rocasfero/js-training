import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import createError from 'http-errors';

import TodoManager from './lib/todo-manager';
import idChecker from './middleware/id-checker';
import titleChecker from './middleware/title-checker';
import notFound from './middleware/not-found';
import errorHandler from './middleware/error-handler';

const app = express();
const todoManager = new TodoManager('./todo.json');

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/todos', (req, res) => {
  try {
    const todos = todoManager.findAll();

    res.json(todos);
  } catch (error) {
    throw error;
  }
});

app.post('/todos', [titleChecker()], (req, res) => {
  try {
    const todo = todoManager.create(req.body.title);

    res.json(todo);
  } catch (error) {
    throw error;
  }
});

app.get('/todos/:id', [idChecker()], (req, res) => {
  try {
    const todo = todoManager.findById(req.params.id);
    if (todo === null) throw createError(404);

    res.json(todo);
  } catch (error) {
    throw error;
  }
});

app.put('/todos/:id', [titleChecker(), idChecker()], (req, res) => {
  try {
    const todo = todoManager.updateById(req.params.id, req.body.title);
    if (todo === null) throw createError(404);

    res.json(todo);
  } catch (error) {
    throw error;
  }
});

app.delete('/todos/:id', [idChecker()], (req, res) => {
  try {
    const result = todoManager.deleteById(req.params.id);
    if (result === null) throw createError(404);

    res.status(201).end();
  } catch (error) {
    throw error;
  }
});

app.use(notFound());
app.use(errorHandler());

export default app;