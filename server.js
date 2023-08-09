import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// morgan is a middleware which is used to log requests and info about them
import morgan from "morgan";
import "express-async-errors";
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js"
import authRoute from "./routes/authRoute.js"
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoute.js"

dotenv.config();

connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// endpoints
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);


app.use(errorMiddleware);


const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}!`);
})
