const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

console.log(process.env.GOOGLE_CLIENT_ID);

// Use CORS to allow requests from the frontend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'your_secret_key', // Replace with your generated secret key
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Placeholder for users
const users = [];

// Configure Passport to use Google OAuth 2.0
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: ['profile', 'email'],
}, (token, tokenSecret, profile, done) => {
    // Find or create user
    let user = users.find(u => u.id === profile.id);
    if (!user) {
        user = {
            id: profile.id,
            displayName: profile.displayName,
            emails: profile.emails
        };
        users.push(user);
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// Authentication Middleware
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Additional route to fetch user data
app.get('/user', isAuthenticated, (req, res) => {
    res.json(req.user);
});

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve the home page
app.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
    (req, res) => {
        // Successful authentication, redirect to the frontend home.
        res.redirect('http://localhost:5173');
    });

// Remove the following POST route, it's unnecessary
// app.post('/auth/google/callback', async (req, res) => {
//     const { code } = req.body;
//     ...
// });

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
