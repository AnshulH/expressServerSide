import express, {Request, Response} from 'express'
import router from './router/router';

// console.log(db.data);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 9000;

app.use('/', router);

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

export default app;