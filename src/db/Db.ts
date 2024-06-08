import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import User from '../types/user';
import Todo from '../types/todo';

const adapter = new JSONFileSync<{ users: User[]; todos: Todo[] }>('db.json');

// Initialize the database with the adapter
const db = new LowSync(adapter, { users: [], todos: [] });
db.read();

db.data ||= {
  users: [],
  todos: []
};

db.write();

export default db;