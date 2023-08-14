import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// morgan is a middleware which is used to log requests and info about them
import morgan from "morgan";
import "express-async-errors";
// security package - to protect the header files
import helmet from "helmet"
// to protect from cross site scripting attacks
import xss from "xss-clean"
// to protect our database
import mongoSanitize from "express-mongo-sanitize"
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js"
import authRoute from "./routes/authRoute.js"
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoute.js"
import jobRoute from "./routes/jobRoute.js"

dotenv.config();

connectDB();

// swagger api config
const options = {
    definition: {
        openapi: "3.0.3",
    info: {
        title: "Job Portal",
        description: "Job Portal using Nodejs and Express"
    },
    servers: [
        {
            // url: "http://localhost:3000/"
            url: "https://job-portal-6jfl.onrender.com"
        }
    ]
    },
    apis: ["./routes/*.js"],

}

const spec = swaggerDoc(options);

const app = express();

// middlewares
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// endpoints
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/jobs', jobRoute);

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

app.use(errorMiddleware);


const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}!`);
})
