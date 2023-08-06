import express from 'express';
import userrouter from './routes/user.js';
import taskRouter from './routes/task.js'
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error.js';
import cors from 'cors';

export const app = express();
config({
    path: "./data/config.env"
});
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials : true,
})
);
// routs
app.use("/api/v1/users", userrouter);
app.use("/api/v1/task", taskRouter);



app.get("/", (req, res) => {
    res.send("Working");
});

app.use(errorMiddleware);
