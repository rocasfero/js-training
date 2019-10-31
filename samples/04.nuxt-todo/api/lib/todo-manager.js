import fs from 'fs';

export default class TodoManager {
  constructor(filename) {
    this.filename = filename;

    this.storeFile();
  }

  storeFile() {
    try {
      const data = fs.readFileSync(this.filename, 'utf-8');
      this.todos = JSON.parse(data);
      this.index = this.todos.reduce((acc, crr) => {
        return acc >= crr.id ? acc : crr.id;
      }, 0);
    } catch (error) {
      this.todos = [];
      this.index = 0;
    };
  }

  saveFile() {
    try {
      const data = JSON.stringify(this.todos);
      fs.writeFileSync(this.filename, data, 'utf-8');
    } catch (error) {
      // 後で考える
    };
  }

  findAll() {
    return this.todos;
  }

  findById(id) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo === undefined) return null;

    return todo;
  }

  updateById(id, title) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo === undefined) return null;

    todo.title = title;

    this.saveFile();
    return todo;
  }

  deleteById(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;

    this.todos.splice(index, 1);

    this.saveFile();
    return true;
  }

  create(title) {
    const todo = {
      id: ++this.index,
      title: title
    };
    this.todos.push(todo);

    this.saveFile();
    return todo;
  }
};
