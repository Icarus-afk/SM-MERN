import express from 'express';
import bodyParser from 'body-parser';
import mongoose  from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';

const allowedOrigins = [
    'http://localhost:3000',
]

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
 

const app = express(); //initialize express instance

// setting up body parser
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

//setting up cors
app.use(cors(corsOptions))

app.use('/posts', postRoutes)

const  MONGO_STRING = "mongodb://127.0.0.1:27017/SM?&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1"
const PORT = process.env.PORT || 8000;

//connecting to Mongodb
mongoose.connect(String(MONGO_STRING))
    .then(() => app.listen(PORT, () => console.log(`Server running on port = ${PORT}`)))
    .catch((error) => console.log (`Error Occured ---> ${error.message}`))

