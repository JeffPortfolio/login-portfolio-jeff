import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import makeCallback from './express-callback';
import { registerApplication, allApplications, registerUser, userLoggedIn, allUsers, loginUser, refreshToken, logoutUser } from './controllers';

const app = express();
dotenv.config();
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
let testCors = process.env.CORS_URL as string;
let urlList = testCors.split(',');

app.use(
    cors({
        origin: urlList,
        credentials: true
    })
);

// AAAS APIs
app.post('/api/registerUser', makeCallback(registerUser));
app.post('/api/login', makeCallback(loginUser));
app.get('/api/logout', makeCallback(logoutUser));
app.post('/api/refreshToken', makeCallback(refreshToken));

// Application APIs
app.get('/api/loggedIn', makeCallback(userLoggedIn));
app.post('/api/addApplication', makeCallback(registerApplication));
app.get('/api/allApplications', makeCallback(allApplications));
// app.get('/api/allUsers', makeCallback(allUsers));
// // app.post('/api/addRole', makeCallback(registerRole));
app.get('/', (req, res) => {
    res.json(`Host id running on ${PORT}`);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
