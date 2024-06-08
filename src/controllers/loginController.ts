import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../types/user';
// import db from '../db/Db';
// import { Low } from 'lowdb/lib';

const SECRET_KEY = 'abcde';

// Try replacing with db
let users: User[] = []

const UserController = {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const user: User = {
      id: Math.random().toString(),
      email: email,
      password: hashedPassword,
    };
    // db.writeUserDataToDb(user);
    users.push(user);
    const token = jwt.sign({ id: user.id }, SECRET_KEY);
    return res.json({ user, token });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    // Retrieve user from the database (simulate)
    // Replace with your actual database logic
    
    // const dbData = db.getDataFromDb();

    const currUser = users.filter((user: User) => user.email === email)[0];
    if (!currUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, currUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    // Generate a JWT
    // { expiresIn: '1h' }. need logic to routinely purge expired logins
    const token = jwt.sign({ id: currUser}, SECRET_KEY);
    return res.json({ currUser, token });
  },
};
export default UserController;