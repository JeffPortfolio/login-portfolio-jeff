import express from 'express';
// import helmet from 'helmet';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import makeCallback from './express-callback';
// import { registerApplication, allApplications, registerUser, userLoggedIn } from './controllers';
// import { loginUser, userLoggedIn, registerUser, logoutUser, registerProject, registerRole, refreshToken } from './controllers';

const app = express();
// app.use(helmet());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(
//     cors({
//         origin: ['http://localhost:3000'],
//         credentials: true
//     })
// );

// app.post('/api/register', makeCallback(registerUser));
// app.get('/api/loggedIn', makeCallback(userLoggedIn));
// // app.get('/api/logout', makeCallback(logoutUser));
// app.post('/api/addApplication', makeCallback(registerApplication));
// app.get('/api/allApplications', makeCallback(allApplications));
// // app.post('/api/addRole', makeCallback(registerRole));
// // app.post('/api/refreshToken', makeCallback(refreshToken));
// // app.post('/api/login', makeCallback(loginUser));
app.get('/', (req, res) => {
    res.json('Host id running');
});

// dotenv.config();

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
