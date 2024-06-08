import express, {Request, Response} from 'express'
import UserController from "../controllers/loginController";
import { authenticateJWT } from "../middlewares/authController";
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import lodash from 'lodash'
import User from '../types/user';
import Todo from '../types/todo';

type Data = {
  users: User[],
  todos: Todo[]
};

let todos: Todo[] = [
  {
    "id": "1",
    "text": "a title"
  },
  {
    "id": "2",
    "text": "title 2"
  },
  {
    "id": "95",
    "text": "title 3"
  }
]

// const adapter = new JSONFile<Data>('./db/db.json')
// const db = new Low<Data>(adapter, {users: [], todos: []});

const router = express.Router();
// const db = Db;
router.use(express.json());


router.post('/register', UserController.register);
router.post('/login', UserController.login);
// Protected route
router.get('/profile', authenticateJWT, (req, res) => {
  return res.json({ message: 'Authenticated route', user: req.body.user });
});

router.get('/todos', authenticateJWT, (req: Request, res: Response) => {
    // const dbData = Db.getDataFromDb()
    // Db.ge
    // const todos = dbData.todos;
    // console.log(todos);

    res.status(200).json(todos);
})

router.post("/todos", (req, res) => {
  // id should be server side generation.
  try {
    const newTodo = { id: req.body.id, text: req.body.text };
    todos.push(newTodo);
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

router.patch("/todos/:id", (req, res) => {
  try {
    const currId = req.params.id;
    const updatedTodos: Todo[]= todos.map((todo) => {
      if (todo.id === currId) {
        todo.text = req.body.text;
      }
      return todo;
    });
    todos = updatedTodos;
    const newTodo = { id: req.body.id, text: req.body.text };
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

router.delete("/todos/:id", (req, res) => {
  try {
    const todoId = req.params.id;
    todos = todos.filter((todo) => todo.id !== todoId);
    const newTodo = { id: req.body.id, text: req.body.text };
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

export default router;