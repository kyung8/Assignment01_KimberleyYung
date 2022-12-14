// Third-Party Modules
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';

// ES Modules fix for __dirname
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Auth Step 1 - import modules
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

// modules for JWT Support 
import cors from 'cors'; 
import passportJWT from 'passport-jwt';

// define JWT Aliases
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// Auth Step 2 - define our auth strategy
let localStrategy = passportLocal.Strategy;

// Auth Step 3 - import the user model
import User from './models/users.js';

// Import Mongoose Module
import mongoose from 'mongoose';

// Configuration Module
import { MongoURI, Secret } from '../config/config.js';

// Import Routes
import indexRouter from './routes/index.route.server.js'
import bizcontactsRouter from './routes/bizcontacts.route.server.js';
import authRouter from './routes/auth.route.server.js';

// Import Api Routes

import authApiRouter from './routes/api/auth-api.route.server.js';
import bizcontactsApiRouter from './routes/api/bizcontacts-api.route.server.js';

// Instantiate Express Application
const app = express();

// Complete the DB Configuration
mongoose.connect(MongoURI);
const db = mongoose.connection;

//Listen for connection success or error
db.on('open', () => console.log("Connected to MongoDB"));
db.on('error', () => console.log("Mongo Connection Error"));

// Set Up Middlewares

// Setup ViewEngine EJS
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname,'/client')));
app.use(express.static(path.join(__dirname,'../public')));

app.use(cors());

// Auth Step 4 - Setup Express Session
app.use(session({
    secret: Secret,
    saveUninitialized: false, 
    resave: false
}));

// Auth Step5 - Setup Flash
app.use(flash());

// Auth Step 6 - Initialize Passport and Session
app.use(passport.initialize());
app.use(passport.session());

// Auth Step 7 - Implement the Auth Strategy
passport.use(User.createStrategy());

// Auth Step 8 - Setup serialization and deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// setup JWT Options
let jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: Secret
}
// set JWT Strategy
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err, false);
        });
});

passport.use(strategy);

// Use Routes
app.use('/', indexRouter);
app.use('/', bizcontactsRouter);
app.use('/', authRouter);

// Use API Routes
app.use('/api/auth', authApiRouter);
app.use('/api/bizcontacts', passport.authenticate('jwt', {session: false}), bizcontactsApiRouter);

export default app;